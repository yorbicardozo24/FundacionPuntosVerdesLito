export class UserRegistration {
    name: string;
    nit: number;
    dv: number;
    email: string;
    tel: number;
    password: string;
    department: {
        code: number;
        name: string;
    };
    municipio: {
        code: number;
        name: string;
    };
}
