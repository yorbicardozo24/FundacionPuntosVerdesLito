export type Roles = 'ADMIN' | 'USER';

export interface User {
    name: string;
    nit: string;
    email: string;
    password: string;
    image?: string;
    points?: number;
    departments: string;
    city: string;
    role: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserResponse {
    message: string;
    token: string;
    userId: string;
    userName: string;
    userPoints: string;
    role: Roles;
}
