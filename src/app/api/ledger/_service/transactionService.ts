'use server';

import { cookies } from 'next/headers';
import { JwtPayload, verify } from '@/_utils/jwtUtils';
import { transactionRepository } from '@/app/api/ledger/_repository/transactionRepository';
import { IUpdateTransactionRequest } from '@/app/api/ledger/_dto/transactionDtos';

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

        return await transactionRepository.findAllTransactionsWithUserId(userId);
    } catch (e) {
        console.log('트랜잭션 가져오기 에러발생!: ', e);
        throw new Error('트랜잭션 가져오기 에러발생!');
    }
};

export const getTransactionWithId = async (id: number) => {
    const transactionWithId = await transactionRepository.findTransactionWithId(id);

    return transactionWithId[0];
};

export const updateTransactionWithId = async (id: number, form: FormData) => {
    try {
        const date = form.get('date') as string;
        const title = form.get('title') as string;
        const price = form.get('price') as string;
        const memo = (form.get('memo') as string) || '';
        const transactionType = form.get('transactionType') as 'INCOME' | 'EXPENDITURE';
        const classification = form.get('classification') as string;
        const categoryName = form.get('categoryName') as string; // categoryName도 필요합니다

        // 필수 필드 검증
        if (!date || !title || !price || !transactionType || !classification || !categoryName) {
            throw new Error('update transaction field error');
        }

        const transaction: IUpdateTransactionRequest = {
            title,
            date: new Date(date), // Date 객체로 변환
            price,
            memo,
            displayName: classification,
            transactionType,
        };

        return await transactionRepository.updateTransactionWithId(id, transaction);
    } catch (error) {
        console.error('트랜잭션 업데이트 중 오류 발생:', error);
        throw error;
    }
};
