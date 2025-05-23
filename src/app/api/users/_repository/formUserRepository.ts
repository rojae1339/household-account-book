import { IFormUser } from '@/_schema/userSchema';
import { getDbConnection } from '@/_lib/db';
import { IFormUserResponse } from '@/app/api/users/_dto/userDtos';
import { QueryResult } from 'mysql2';

export interface IFormUserRepository {
    getUserByEmail(email: string): Promise<IFormUserResponse[]>;

    getUserByToken(token: string): Promise<IFormUserResponse[]>;

    addFormUser(req: IFormUser): Promise<QueryResult>;

    updateFormUserVerified(userId: number): Promise<void>;

    updatePassword(userId: number, password: string): Promise<void>;

    changeVerificationTokenCode(userId: number, token: string): Promise<void>;

    deleteUserById(id: number): Promise<void>;
}

const db = getDbConnection();

export const formUserRepository: IFormUserRepository = {
    getUserByEmail: async (email) => {
        const con = await db;
        const [rows] = await con.execute('SELECT * FROM form_users WHERE email = ?', [email]);
        return rows as IFormUserResponse[];
    },

    getUserByToken: async (token) => {
        const con = await db;
        const [rows] = await con.execute('SELECT * FROM form_users WHERE verificationToken = ?', [
            token,
        ]);
        return rows as IFormUserResponse[];
    },

    addFormUser: async (req) => {
        const con = await db;

        const nickname = req.nickname;
        const pw = req.password;
        const email = req.email;
        const token = req.verificationToken;
        const isVerified = req.isVerified;
        const createdAt = req.createdAt;

        const [userRes] = await con.execute('INSERT INTO users (dtype) VALUES (?)', ['form_users']);

        // @ts-ignore
        const id = userRes.insertId;

        const [result] = await con.execute(
            'INSERT INTO form_users (userId, email, nickname, createdAt,  password, isVerified, verificationToken) VALUES (?,?,?,?,?,?,?)',
            [id, email, nickname, createdAt, pw, isVerified, token],
        );

        return result;
    },

    updateFormUserVerified: async (userId) => {
        const con = await db;
        await con.execute('UPDATE form_users SET isVerified = TRUE WHERE userId = ?', [userId]);
    },

    updatePassword: async (userId, password) => {
        const con = await db;
        await con.execute('UPDATE form_users SET password = ? WHERE userId = ?', [
            password,
            userId,
        ]);
    },

    changeVerificationTokenCode: async (userId, token) => {
        const con = await db;
        await con.execute('UPDATE form_users SET verificationToken = ? WHERE userId = ?', [
            token,
            userId,
        ]);
    },

    deleteUserById: async (userId) => {
        const con = await db;
        await con.execute('DELETE FROM users WHERE id=?', [userId]);
        await con.execute('DELETE FROM form_users WHERE userId = ?', [userId]);
    },
};
