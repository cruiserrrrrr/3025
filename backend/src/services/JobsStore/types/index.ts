import { JobStatus } from "../../../enums/job-status.enum";
import { UrlStatus } from "../../../enums/url-status.enum";

export interface IJobUrl {
    url: string;
    status: UrlStatus;
    statusCode: number | null;
    error: string | null;
    startedAt: string | null;
    finishedAt: string | null;
    duration: number | null;
}

export interface IJob {
    id: string;
    createdAt: string;
    status: JobStatus;
    urls: IJobUrl[];
    cancelled: boolean;
}

export interface IJobSummary {
    id: string;
    createdAt: string;
    status: JobStatus;
    total: number;
    success: number;
    error: number;
}
