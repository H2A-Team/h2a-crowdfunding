export interface CreateProjectDTO {
    name: string;
    slug: string;
    shortDescription: string;
    description: string;
    logoUrl: string;
    coverBackgroundUrl: string;
    maxAllocation: number;
    totalRaise: number;
    tokenSymbol: string;
    tokenSwapRaito: string;
    opensAt: number;
    endsAt: number;
    idoStartsAt: number;
    idoEndsAt: number;
}
