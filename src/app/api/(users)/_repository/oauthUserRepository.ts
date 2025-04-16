// src/app/api/(users)/_repository/oauthUserRepository.ts
import { IOAuthUser } from '@/_schema/userSchema';
import { getDbConnection } from '@/_lib/db';
import { IOauthUserResponse } from '@/app/api/(users)/_dto/userDtos';
import { QueryResult } from 'mysql2';

export interface IOauthUserRepository {
    getOauthUserByProviderAndProviderId(
        provider: string,
        providerId: string,
    ): Promise<IOauthUserResponse[]>;
    addOauthUser(oauthUser: IOAuthUser): Promise<QueryResult>;
}

const db = getDbConnection();

export const oauthUserRepository: IOauthUserRepository = {
    getOauthUserByProviderAndProviderId: async (provider, providerId) => {
        const con = await db;
        const [rows] = await con.execute(
            'SELECT * FROM oauth_users WHERE provider = ? AND providerId = ?',
            [provider, providerId],
        );
        return rows as IOauthUserResponse[];
    },

    addOauthUser: async (req) => {
        const con = await db;

        const [userRes] = await con.execute('INSERT INTO users (dtype) VALUES (?)', [
            'oauth_users',
        ]);

        const id = userRes.insertId;

        const [result] = await con.execute(
            'INSERT INTO oauth_users (userId, provider, providerId, nickname, createdAt) VALUES (?,?, ?, ?, ?)',
            [id, req.provider, req.providerId, req.nickname, req.createdAt],
        );
        return result;
    },
};
