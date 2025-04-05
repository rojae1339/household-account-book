import React, { Ref } from 'react';

type formInputTypes = {
    ref?: Ref<HTMLInputElement>;
    errors: { email?: string; password?: string };
    placeholder: 'email' | 'password';
    type: 'email' | 'password' | 'text';
    value: string;
    name: 'email' | 'password';
    onChangeAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputModal({
    ref = null,
    errors,
    placeholder,
    type = 'email',
    value,
    name,
    onChangeAction,
}: formInputTypes) {
    return (
        <input
            ref={ref}
            className={`oauth-nav border focus:outline-0 focus:ring ring-blue-100 w-full ${errors?.[placeholder] ? 'border-red-500' : 'border-gray-100'}`}
            placeholder={placeholder}
            type={type}
            value={value}
            name={name}
            onChange={onChangeAction}
        />
    );
}
