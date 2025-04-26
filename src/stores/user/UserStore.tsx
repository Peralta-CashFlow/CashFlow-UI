import { create } from 'zustand';

type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
    jwt: string;
}

type UserStore = {
    user: User;
    newUser: (id: number, firstName: string, lastName: string, email: string, roles: string[], jwt: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        roles: [],
        jwt: ''
    },
    newUser: (id, firstName, lastName, email, roles, jwt) => set(() => ({ user: { id, firstName, lastName, email, roles, jwt } }))
}));