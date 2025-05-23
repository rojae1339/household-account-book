import { ModalDefault } from '@/_component/Modal';
import { baseProps } from '@/_constants/props';

type props = baseProps & {
    message: string;
};
export default function MessageModal({ children, message }: props) {
    return (
        <ModalDefault>
            <p>{message}</p>
            {children}
        </ModalDefault>
    );
}
