export interface Foundation {
    id: number;
    name: string;
    nit: string;
    email: string;
    description: string;
    image: string;
    points: number;
    cs: string;
    ods: string;
    departments: {
        code: number,
        name: string
    };
    municipios: {
        code: number,
        name: string,
    };
}
