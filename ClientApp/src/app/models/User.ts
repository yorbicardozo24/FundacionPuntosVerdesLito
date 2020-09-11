export type Roles = 'ADMIN' | 'USER';

export interface User {
    name: string;
    last_name: string;
    email: string;
    password: string;
    image?: string;
    rol: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserResponse {
    message: string;
    token: string;
    userId: number;
    role: Roles;
}
