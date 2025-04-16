import ModalDefault from '@/_component/Modal';

export default function MessageModal({ message }: { message: string }) {
    return <ModalDefault>{message}</ModalDefault>;
}
