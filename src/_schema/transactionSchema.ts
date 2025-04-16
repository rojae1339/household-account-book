import { IBaseUser } from '@/_schema/userSchema';

export enum ETransactionType {
    SALARY = '월급',
    BONUS = '상여금',
    INVESTMENT = '펀드, 주식',
    OTHER_INCOME = '기타수익',
    FOOD = '식비',
    TRANSPORTATION = '교통비',
    HOUSING_COMMUNICATION = '주거, 통신',
    DAILY_NECESSITIES = '생활용품',
    CONGRATULATIONS_CONDOLENCES = '경조사비',
    KNOWLEDGE_CULTURE = '지식, 문화',
    CLOTHING_BEAUTY = '의복, 미용',
    MEDICAL_HEALTH = '의료, 건강',
    LEISURE_ENTERTAINMENT = '여가, 유흥',
    TAX_INTEREST = '세금, 이자',
    OTHER_EXPENSES = '기타비용',
}
