export interface User {
    id: number;
    userId: number;
    name: string;
    nit: string;
    email: string;
    rut: string;
    ncontacto: string;
    departments: {
        code: number,
        name: string
    };
    municipios: {
        code: number,
        name: string,
    };
    points: number;
    role: string;
    status: boolean;
}
