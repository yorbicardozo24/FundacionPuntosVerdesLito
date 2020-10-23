export class Foundation {
    name: string;
    description: string;
    nit: string;
    email: string;
    ncontacto?: string;
    points: number;
    cs: string;
    ods: string;
    dpto: number;
    municipio: number;
    status: number;
}

export class FoundationEdit {
    name: string;
    email: string;
    ncontacto?: string;
    description: string;
    points: number;
    cs: string;
    ods: string;
    dpto: number;
    municipio: number;
}

export class Donate {
    points: number;
}

export class DonateHistory {
    foundationId: string;
    userId: string;
    points: number;
}