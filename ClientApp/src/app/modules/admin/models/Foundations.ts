export interface Foundation {
    id: number;
    name: string;
    nit: string;
    email: string;
    description: string;
    image: string;
    points: number;
    cs: string;
    csArray: [{
        code: number,
        name: string
    }];
    ods: string;
    odsArray: [{
        code: number,
        name: string
    }];
    ncontacto?: number;
    departments: {
        code: number,
        name: string
    };
    municipios: {
        code: number,
        name: string,
    };
}

export class FoundationX {
    id: number;
    userId: number;
    name: string;
    nit: string;
    email: string;
    ncontacto: number;
    description: string;
    image: string;
    points: string;
    cs: [{
        code: string,
        name: string
    }];
    ods: [{
        code: string,
        name: string
    }];
    departments: {
        code: string,
        name: string
    };
    municipios: {
        code: string,
        name: string,
    };
}

export interface FoundationXs {
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
