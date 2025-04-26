'use server';

import { cookies } from 'next/headers';
import { JwtPayload, verify } from '@/_utils/jwtUtils';
import { transactionRepository } from '@/app/api/(ledger)/_repository/transactionRepository';

export const getAllTransactionsByUserId = async () => {
    try {
        // 쿠키에서 토큰 가져오기
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return Error('토큰이 존재하지 않습니다.');
        }

        const payload = await verify(token);

        const { id: userId } = payload as unknown as JwtPayload;

        if (!userId) {
            return Error('존재하지 않는 유저입니다.');
        }

        return await transactionRepository.findAllTransactionWithUserId(userId);
    } catch (e) {
        console.log('트랜잭션 가져오기 에러발생!: ', e);
        throw new Error('트랜잭션 가져오기 에러발생!');
    }
};
