import { IBaseUser } from '@/_schema/userSchema';
import { ETransactionType } from '@/_schema/transactionSchema';

export interface ITransactionResponse {
    id: number;
    userId: IBaseUser['id'];
    title: string;
    date: string;
    price: string; // 금액 추가
    memo: string;
    categoryId: number;
    categoryName: string; // 카테고리 이름 추가
    displayName: string; // 표시 이름 추가
    transactionType: 'INCOME' | 'EXPENDITURE'; // 수입/지출 구분 추가
}
