import { Injectable } from "@nestjs/common";
import axios from "axios";
import { JobStatus } from "../../enums/job-status.enum";
import { UrlStatus } from "../../enums/url-status.enum";
import { runWithConcurrency } from "../../helpers/concurrencyPool";
import { randomDelay } from "../../helpers/randomDelay";
import { IJob, IJobUrl } from "../JobsStore/types";

const CONCURRENCY_LIMIT = 5;

@Injectable()
export class UrlCheckerService {
    async processJob(job: IJob): Promise<void> {
        try {
            job.status = JobStatus.IN_PROGRESS;
            await runWithConcurrency(
                job.urls,
                CONCURRENCY_LIMIT,
                (jobUrl) => this.checkUrl(job, jobUrl),
            );
            job.status = job.cancelled
                ? JobStatus.CANCELLED
                : JobStatus.COMPLETED;
        } catch {
            job.status = JobStatus.FAILED;
        }
    }

    private async checkUrl(job: IJob, jobUrl: IJobUrl): Promise<void> {
        if (job.cancelled) {
            jobUrl.status = UrlStatus.CANCELLED;
            return;
        }

        jobUrl.status = UrlStatus.IN_PROGRESS;
        jobUrl.startedAt = new Date().toISOString();
        const start = Date.now();

        try {
            await randomDelay(0, 10000);
            const response = await axios.head(jobUrl.url, {
                validateStatus: () => true,
                timeout: 15000,
            });
            jobUrl.status = UrlStatus.SUCCESS;
            jobUrl.statusCode = response.status;
        } catch (error: any) {
            jobUrl.status = UrlStatus.ERROR;
            jobUrl.error = error?.message ?? "Request failed";
            jobUrl.statusCode = error?.response?.status ?? null;
        } finally {
            jobUrl.finishedAt = new Date().toISOString();
            jobUrl.duration = Date.now() - start;
        }
    }
}
