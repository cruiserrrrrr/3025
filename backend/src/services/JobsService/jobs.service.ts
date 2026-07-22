import { Injectable, NotFoundException } from "@nestjs/common";
import { JobStatus } from "../../enums/job-status.enum";
import { UrlStatus } from "../../enums/url-status.enum";
import { CreateJobDto } from "../../dto/create-job.dto";
import { JobsStore } from "../JobsStore/jobs-store.service";
import { UrlCheckerService } from "../UrlCheckerService/url-checker.service";
import { IJob, IJobSummary } from "../JobsStore/types";

@Injectable()
export class JobsService {
    constructor(
        private readonly jobsStore: JobsStore,
        private readonly urlChecker: UrlCheckerService,
    ) {}

    createJob(dto: CreateJobDto): { jobId: string } {
        const job = this.jobsStore.create(dto.urls);
        void this.urlChecker.processJob(job);
        return { jobId: job.id };
    }

    getJobs(): IJobSummary[] {
        return this.jobsStore.findAllSummaries();
    }

    getJob(id: string): IJob {
        const job = this.jobsStore.findOne(id);
        if (!job) {
            throw new NotFoundException("Задача не найдена");
        }
        return job;
    }

    cancelJob(id: string): IJob {
        const job = this.jobsStore.findOne(id);
        if (!job) {
            throw new NotFoundException("Задача не найдена");
        }
        if (
            job.status === JobStatus.COMPLETED ||
            job.status === JobStatus.CANCELLED ||
            job.status === JobStatus.FAILED
        ) {
            return job;
        }
        job.cancelled = true;
        job.urls.forEach((jobUrl) => {
            if (jobUrl.status === UrlStatus.PENDING) {
                jobUrl.status = UrlStatus.CANCELLED;
            }
        });
        job.status = JobStatus.CANCELLED;
        return job;
    }
}
