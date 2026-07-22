import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { JobStatus } from "../../enums/job-status.enum";
import { UrlStatus } from "../../enums/url-status.enum";
import { IJob, IJobSummary, IJobUrl } from "./types";

@Injectable()
export class JobsStore {
    private readonly jobs = new Map<string, IJob>();

    create(urls: string[]): IJob {
        const jobUrls: IJobUrl[] = urls.map((url) => ({
            url,
            status: UrlStatus.PENDING,
            statusCode: null,
            error: null,
            startedAt: null,
            finishedAt: null,
            duration: null,
        }));

        const job: IJob = {
            id: randomUUID(),
            createdAt: new Date().toISOString(),
            status: JobStatus.PENDING,
            urls: jobUrls,
            cancelled: false,
        };

        this.jobs.set(job.id, job);
        return job;
    }

    findOne(id: string): IJob | undefined {
        return this.jobs.get(id);
    }

    findAllSummaries(): IJobSummary[] {
        return Array.from(this.jobs.values()).map((job) => ({
            id: job.id,
            createdAt: job.createdAt,
            status: job.status,
            total: job.urls.length,
            success: job.urls.filter((u) => u.status === UrlStatus.SUCCESS)
                .length,
            error: job.urls.filter((u) => u.status === UrlStatus.ERROR).length,
        }));
    }
}
