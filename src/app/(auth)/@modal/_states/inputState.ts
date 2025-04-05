import { create } from 'zustand';

interface IUseEmailInput {
    emailInput: string;
    setEmailInput: (value: string) => void;
}

export const useEmailInput = create<IUseEmailInput>((set) => ({
    emailInput: '',
    setEmailInput: (value: string) => set(() => ({ emailInput: value })),
}));

interface IUsePasswordInput {
    passwordInput: string;
    setPasswordInput: (value: string) => void;
}

export const usePasswordInput = create<IUsePasswordInput>((set) => ({
    passwordInput: '',
    setPasswordInput: (value: string) => set(() => ({ passwordInput: value })),
}));
