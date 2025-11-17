import { create } from 'zustand';

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
    jwt: string;
    avatar: string;
}

type UserStore = {
    user: User;
    newUser: (id: number, firstName: string, lastName: string, email: string, roles: string[], jwt: string, avatar: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        roles: [],
        jwt: '',
        avatar: ''
    },
    newUser: (id, firstName, lastName, email, roles, jwt, avatar) => set(() => ({ user: { id, firstName, lastName, email, roles, jwt, avatar } }))
}));