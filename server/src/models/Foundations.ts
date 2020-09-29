export class Foundation {
    name: string;
    description: string;
    image: string;
    nit: string;
    email: string;
    points: number;
    cs: string;
    ods: string;
    dpto: number;
    municipio: number;
}

export class FoundationEdit {
    name: string;
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