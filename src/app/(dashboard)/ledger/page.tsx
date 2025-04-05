import MessageModal from '@/app/(dashboard)/ledger/_component/messageModal';

export default async function LedgerPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    let decodedMessage = null;
    const base64 = (await searchParams).message as string;

    if (base64) {
        decodedMessage = Buffer.from(base64, 'base64').toString('utf-8');
    }

    return (
        <>
            {decodedMessage ? <MessageModal message={decodedMessage} /> : null}
            <div className={'h-[10000px]'}>home</div>
        </>
    );
}
