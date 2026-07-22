import { IJobDetail, IJobSummary } from "../types/jobs";
import ServiceBase from "./ServiceBase";

class JobsService extends ServiceBase {
    public static createJob(urls: string[]): Promise<{ jobId: string }> {
        return this.post("/jobs", { urls });
    }

    public static getJobs(): Promise<IJobSummary[]> {
        return this.get("/jobs");
    }

    public static getJob(id: string): Promise<IJobDetail> {
        return this.get(`/jobs/${id}`);
    }

    public static cancelJob(id: string): Promise<IJobDetail> {
        return this.delete(`/jobs/${id}`);
    }
}

export default JobsService;
