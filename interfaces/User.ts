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
}

export interface userState {
    isAuth: boolean;
    user?: User | null;
}