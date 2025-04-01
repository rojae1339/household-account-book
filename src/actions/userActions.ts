import { getDbConnection } from '@/_lib/db';
import { IFormUser } from '@/_API/userSchema';
import { generateShortNickname, hashPassword } from '@/_constants/dbFunctions';

const db = getDbConnection();

// get user by Email
export const getUserByEmail: (email: string) => Promise<IFormUser[]> = async (
    email: string,
): Promise<IFormUser[]> => {
    try {
        const con = await db;
        const [rows] = await con.execute('SELECT * FROM form_users WHERE email=?', [email]);

        return rows as IFormUser[]; // 명확하게 타입 지정
    } catch (e) {
        throw new Error(`에러 발생: ${e}`);
    }
};

// add user
export const addFormUser = async (formUser: IFormUser) => {
    try {
        const existingUser = await getUserByEmail(formUser.email);

        if (existingUser.length > 0) {
            throw new Error('이미 존재하는 유저입니다.');
        }

        const con = await db;
        const pw = await hashPassword(formUser.password);
        const nickname = generateShortNickname();

        const [result] = await con.execute(
            `INSERT INTO form_users (email, password, nickname, created_at) VALUES (?, ?, ?, ?)`,
            [formUser.email, pw, nickname, new Date()],
        );

        return result; // 추가된 유저 정보 반환
    } catch (e) {
        throw new Error(`에러 발생: ${e}`);
    }
};
