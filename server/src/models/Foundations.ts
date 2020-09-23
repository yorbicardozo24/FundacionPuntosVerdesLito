export class Foundation {
    name: string;
    description: string;
    image: string;
    nit: string;
    email: string;
    points: number;
}

export class FoundationEdit {
    name: string;
    description: string;
    image: string;
    points: number;
}

export class Donate {
    points: number;
}

export class DonateHistory {
    foundationId: string;
    userId: string;
    points: number;
}