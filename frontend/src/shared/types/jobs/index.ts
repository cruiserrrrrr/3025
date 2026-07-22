export interface IJobUrl {
    url: string;
    status: string;
    statusCode: number | null;
    error: string | null;
    startedAt: string | null;
    finishedAt: string | null;
    duration: number | null;
}

export interface IJobSummary {
    id: string;
    createdAt: string;
    status: string;
    total: number;
    success: number;
    error: number;
}

export interface IJobDetail {
    id: string;
    createdAt: string;
    status: string;
    urls: IJobUrl[];
}
