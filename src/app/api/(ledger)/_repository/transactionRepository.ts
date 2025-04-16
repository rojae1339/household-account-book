//todo

import { IBaseUser } from '@/_schema/userSchema';
import { ITransactionResponse } from '@/app/api/(ledger)/_dto/transactionDtos';
import { getDbConnection } from '@/_lib/db';

interface ITransactionRepository {
    findAllTransactionWithUserId: (userId: IBaseUser['id']) => Promise<ITransactionResponse[]>;
}

const db = getDbConnection();

export const transactionRepository: ITransactionRepository = {
    findAllTransactionWithUserId: async (userId) => {
        const con = await db;

        const [transactions] = await con.execute(
            `
            SELECT t.id,t.userId,t.date,t.title, t.price, t.memo, t.categoryId, tc.category_name AS categoryName, tc.display_name AS displayName, tc.transaction_type AS transactionType 
            FROM  transactions t 
            JOIN  transaction_categories tc 
            ON t.categoryId = tc.id 
            WHERE  t.userId = ? 
            ORDER BY  t.date DESC
            `,
            [userId],
        );

        return transactions as ITransactionResponse[];
    },
};
