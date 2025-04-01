import { BUILD_ID_FILE } from 'next/constants';
import Button from '@/_component/Button';
import { addFormUser, getUserByEmail } from '@/actions/userActions';
import { IFormUser } from '@/_API/userSchema';
import { getDbConnection } from '@/_lib/db';
import { generateShortNickname, hashPassword } from '@/_constants/dbFunctions';

const testUser: IFormUser = {
    email: 'ex@example.com',
    password: '123456',
    nickname: '',
    created_at: new Date(),
};

export default async function page() {
    return (
        <div>
            <Button
                action={async () => {
                    'use server';
                    await addFormUser(testUser);
                }}
                type={'button'}
                className={''}
            >
                add
            </Button>

            <Button
                action={async () => {
                    'use server';
                    await getUserByEmail(testUser.email);
                }}
                type={'button'}
                className={''}
            >
                get
            </Button>
        </div>
    );
}
