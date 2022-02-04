import { atom } from 'recoil';

export const token = atom({
    key: 'token',
    default: undefined,
});

export const userName = atom({
    key: 'userName',
    default: undefined,
});