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

export interface FoundationX {
    id: number;
    name: string;
    nit: string;
    email: string;
    description: string;
    image: string;
    points: string;
    cs: string;
    ods: {
        code: string,
        name: string
    };
    departments: {
        code: string,
        name: string
    };
    municipios: {
        code: string,
        name: string,
    };
}
