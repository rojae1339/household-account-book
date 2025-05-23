//todo

import { IBaseUser } from '@/_schema/userSchema';
import {
    ITransactionResponse,
    IUpdateTransactionRequest,
} from '@/app/api/(ledger)/_dto/transactionDtos';
import { getDbConnection } from '@/_lib/db';
import { ITransactionBase } from '@/_schema/transactionSchema';

interface ITransactionRepository {
    findAllTransactionsWithUserId: (userId: IBaseUser['id']) => Promise<ITransactionResponse[]>;
    findTransactionWithId: (id: ITransactionBase['id']) => Promise<ITransactionResponse[]>;
    updateTransactionWithId: (
        id: ITransactionResponse['id'],
        req: IUpdateTransactionRequest,
    ) => Promise<ITransactionResponse[]>;
}

const db = getDbConnection();

export const transactionRepository: ITransactionRepository = {
    findAllTransactionsWithUserId: async (userId) => {
        const con = await db;

        const [transactions] = await con.execute(
            `
                SELECT t.id,
                       t.userId,
                       t.date,
                       t.title,
                       t.price,
                       t.memo,
                       t.categoryId,
                       tc.categoryName,
                       tc.displayName,
                       tc.transactionType
                FROM transactions t
                         JOIN transaction_categories tc
                              ON t.categoryId = tc.id
                WHERE t.userId = ?
                ORDER BY t.date DESC
            `,
            [userId],
        );

        return transactions as ITransactionResponse[];
    },

    findTransactionWithId: async (id) => {
        const con = await db;

        const [res] = await con.execute(
            `SELECT *
             FROM transactions
             WHERE id = ?`,
            [id],
        );

        return res as ITransactionResponse[];
    },

    updateTransactionWithId: async (id, req) => {
        const con = await db;

        const [transactions] = await con.execute(
            `
                UPDATE transactions
                SET title      = ?,
                    price      = ?,
                    date       = ?,
                    memo       = ?,
                    categoryId = (SELECT id
                                  FROM transaction_categories
                                  WHERE displayName = ?
                                    AND transactionType = ?)
                WHERE id = ?;`,
            [req.title, req.price, req.date, req.memo, req.displayName, req.transactionType, id],
        );

        return transactions as ITransactionResponse[];
    },
};
