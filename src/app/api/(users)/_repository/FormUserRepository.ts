import { IFormUser, IFormUserResponse } from '@/_schema/userSchema';
import { getDbConnection } from '@/_lib/db';

export interface IFormUserRepository {
    getUserByEmail: (email: string) => Promise<IFormUserResponse[]>;
    getUserByToken: (verifyToken: string) => Promise<IFormUserResponse[]>;
    addFormUser: (req: IFormUser) => Promise<IFormUserResponse[]>;
    updateFormUserVerified: (userId: number) => Promise<IFormUserResponse[]>;
    updatePassword: (userId: number, password: string) => Promise<IFormUserResponse[]>;
    changeVerificationTokenCode: (userId: number, token: string) => Promise<string>;
    deleteUserById: (id: number) => Promise<string>;
}

const db = getDbConnection();

export const formUserRepository: IFormUserRepository = {
    getUserByEmail: async (email: string): Promise<IFormUserResponse[]> => {
        try {
            const con = await db;
            const [rows] = await con.execute('SELECT * FROM form_users WHERE email=?', [email]);

            return rows as IFormUserResponse[]; // 명확하게 타입 지정
        } catch (e) {
            throw new Error(`에러 발생: ${e}`);
        }
    },

    getUserByToken: async (verifyToken: string): Promise<IFormUserResponse[]> => {
        try {
            const con = await db;
            const [rows] = await con.execute(
                'SELECT * FROM form_users WHERE verificationToken = ?',
                [verifyToken],
            );

            return rows as IFormUserResponse[];
        } catch (e) {
            throw new Error(`에러 발생: ${e}`);
        }
    },

    addFormUser: async (req: IFormUser): Promise<IFormUserResponse[]> => {
        try {
            const con = await db;
            const [rows] = await con.execute(
                `INSERT INTO form_users (email, password, isVerified, verificationToken, nickname, createdAt) VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    req.email,
                    req.password,
                    req.isVerified,
                    req.verificationToken,
                    req.nickname,
                    req.createdAt,
                ],
            );

            return rows as IFormUserResponse[];
        } catch (e) {
            throw new Error(`에러 발생: ${e}`);
        }
    },

    updateFormUserVerified: async (userId: number) => {
        try {
            const con = await db;

            const [rows] = await con.execute(
                'UPDATE form_users SET isVerified = TRUE WHERE id = ?',
                [userId],
            );

            return rows as IFormUserResponse[];
        } catch (e) {
            throw new Error(`에러 발생: ${e}`);
        }
    },

    updatePassword: async (userId: number, password: string): Promise<IFormUserResponse[]> => {
        try {
            const con = await db;
            const [rows] = await con.execute(`UPDATE form_users SET password = ? WHERE id = ?`, [
                password,
                userId,
            ]);

            return rows as IFormUserResponse[];
        } catch (e) {
            throw new Error(`에러 발생: ${e}`);
        }
    },

    changeVerificationTokenCode: async (userId, token) => {
        try {
            const con = await db;

            const [rows] = await con.execute(
                'UPDATE form_users SET verificationToken = ? WHERE id = ?',
                [token, userId],
            );

            return token;
        } catch (e) {
            throw new Error(`에러 발생: ${e}`);
        }
    },

    deleteUserById: async (id: number): Promise<string> => {
        try {
            const con = await db;

            await con.execute('DELETE FROM form_users WHERE id = ?', [id]);

            return 'Deleted successfully';
        } catch (e) {
            throw new Error(`에러 발생: ${e}`);
        }
    },
};
