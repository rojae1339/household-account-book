import { IOAuthUser, IOauthUserResponse } from '@/_schema/userSchema';
import { getDbConnection } from '@/_lib/db';

export interface IOauthUserRepository {
    getOauthUserByProviderAndProviderId: (
        provider: string,
        providerId: string,
    ) => Promise<IOauthUserResponse[]>;
    addOauthUser: (oauthUser: IOAuthUser) => Promise<IOauthUserResponse[]>;
}

const db = getDbConnection();

export const oauthUserRepository: IOauthUserRepository = {
    getOauthUserByProviderAndProviderId: async (
        provider: string,
        providerId: string,
    ): Promise<IOauthUserResponse[]> => {
        try {
            const con = await db;
            const [rows] = await con.execute(
                'SELECT * FROM oauth_users WHERE provider = ? AND providerId = ?',
                [provider, providerId],
            );

            return rows as IOauthUserResponse[];
        } catch (e) {
            throw new Error(`에러 발생: ${e}`);
        }
    },

    addOauthUser: async (oauthUser: IOAuthUser): Promise<IOauthUserResponse[]> => {
        try {
            const con = await db;
            const [rows] = await con.execute(
                'INSERT INTO oauth_users (provider, providerId, nickname, createdAt) VALUES (?,?,?,?)',
                [oauthUser.provider, oauthUser.providerId, oauthUser.nickname, oauthUser.createdAt],
            );

            return rows as IOauthUserResponse[];
        } catch (e) {
            throw new Error(`에러 발생: ${e}`);
        }
    },
};
