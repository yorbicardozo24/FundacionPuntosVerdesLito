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

export interface UserData {
    name: string;
    nit: string;
    email: string;
    departments: {
        code: number;
        name: string;
    };
    municipios: {
        code: number;
        name: string;
    };
    points: number;
}

export interface Status {
    status: boolean;
}

export interface PasswordData {
    oldpassword: string;
    newPassword: string;
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
    userImage: string;
    userPoints: string;
    role: Roles;
}
