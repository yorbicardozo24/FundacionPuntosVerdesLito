export interface User {
    id: number;
    name: string;
    nit: string;
    email: string;
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
}
