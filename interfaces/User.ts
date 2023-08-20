export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}

export interface UserWithoutPassword {
    id?: number;
    name: string;
    email: string;
    isAdmin?: boolean;
}

export interface userState {
    isAuth: boolean;
    isAdmin?: boolean;
    user?: User | null;
}