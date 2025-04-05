import Link from 'next/link';

export default async function TokenErrorPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = (await searchParams).message as string;
    let decodedMessage = null;
    // Base64 디코딩
    if (params) {
        decodedMessage = Buffer.from(params, 'base64').toString('utf-8');
    }

    return (
        <div>
            <div>{decodedMessage}</div>
            <Link
                href={'/'}
                className={'text-blue-500 hover:cursor-pointer'}
            >
                메인으로
            </Link>
        </div>
    );
}
