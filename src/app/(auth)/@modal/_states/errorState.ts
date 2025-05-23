import { create } from 'zustand';

interface IFormErrorState {
    email?: string;
    password?: string;
}

export interface IUseFormErrorStore {
    errors: IFormErrorState;
    setEmailError: (email?: string) => void;
    setPasswordError: (password?: string) => void;
    resetError: () => void;
}

export const useFormErrorStore = create<IUseFormErrorStore>((set) => ({
    errors: { email: undefined, password: undefined },
    setEmailError: (email?: string) => set((state) => ({ errors: { ...state.errors, email } })),
    setPasswordError: (password?: string) =>
        set((state) => ({ errors: { ...state.errors, password } })),
    resetError: () => set(() => ({ errors: {} })),
}));
