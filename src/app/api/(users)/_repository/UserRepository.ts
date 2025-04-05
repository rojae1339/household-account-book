import { IFormUser, IUserResponse } from '@/_schema/userSchema';
import { getDbConnection } from '@/_lib/db';

export interface IUserRepository {
    getUserByEmail: (email: string) => Promise<IUserResponse[]>;
    getUserByToken: (verifyToken: string) => Promise<IUserResponse[]>;
    addFormUser: (req: IFormUser) => Promise<IUserResponse[]>;
    updateFormUserVerified: (userId: number) => Promise<IUserResponse[]>;
    updatePassword: (userId: number, password: string) => Promise<IUserResponse[]>;
    changeVerificationTokenCode: (userId: number, token: string) => Promise<string>;
    deleteUserById: (id: number) => Promise<string>;
}

const db = getDbConnection();

export const userRepository: IUserRepository = {
    getUserByEmail: async (email: string): Promise<IUserResponse[]> => {
        try {
            const con = await db;
            const [rows] = await con.execute('SELECT * FROM form_users WHERE email=?', [email]);

            return rows as IUserResponse[]; // 명확하게 타입 지정
        } catch (e) {
            throw new Error(`에러 발생: ${e}`);
        }
    },

    getUserByToken: async (verifyToken: string): Promise<IUserResponse[]> => {
        try {
            const con = await db;
            const [rows] = await con.execute(
                'SELECT * FROM form_users WHERE verificationToken = ?',
                [verifyToken],
            );

            return rows as IUserResponse[];
        } catch (e) {
            throw new Error(`에러 발생: ${e}`);
        }
    },

    addFormUser: async (req: IFormUser): Promise<IUserResponse[]> => {
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

            return rows as IUserResponse[];
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

            return rows as IUserResponse[];
        } catch (e) {
            throw new Error(`에러 발생: ${e}`);
        }
    },

    updatePassword: async (userId: number, password: string): Promise<IUserResponse[]> => {
        try {
            const con = await db;
            const [rows] = await con.execute(`UPDATE form_users SET password = ? WHERE id = ?`, [
                password,
                userId,
            ]);

            return rows as IUserResponse[];
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
