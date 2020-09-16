export type Roles = 'ADMIN' | 'USER';

export class User {
    name: String;
    nit: String;
    email: String;
    password: String;
    image?: String;
    points?: Number;
    departments: String;
    city: String;
    role: String;
}

export class UserData {
    name: string;
    departmentId: number;
    departmentName: string;
    municipioCode: number;
    municipioName: string;
}

export interface UserLogin {
    username: string;
    password: string;
}

export class PasswordData {
    password: string;
}

export interface UserResponse {
    message: string;
    token: string;
    role: Roles;
}