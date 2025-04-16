import { getDbConnection } from '@/_lib/db';

export interface IUserResponse {
    id: number;
    nickname: string;
    dtype: 'form_user' | 'oauth_user';
    createdAt: Date;
}

export interface IUserRepository {
    addUser: (nickname: string, dtype: 'form_user' | 'oauth_user') => Promise<number>; // userId 반환
    getUserById: (id: number) => Promise<IUserResponse | null>;
    deleteUserById: (id: number) => Promise<void>;
}

const db = getDbConnection();

export const userRepository: IUserRepository = {
    addUser: async (dtype) => {
        const con = await db;
        const [result] = await con.execute('INSERT INTO users (dtype) VALUES (?)', [dtype]);

        return result.insertId;
    },

    getUserById: async (id) => {
        const con = await db;
        const [rows] = await con.execute('SELECT * FROM users WHERE id = ?', [id]);
        const users = rows as IUserResponse[];
        return users[0] ?? null;
    },

    deleteUserById: async (id) => {
        const con = await db;
        await con.execute('DELETE FROM users WHERE id = ?', [id]);
    },
};
