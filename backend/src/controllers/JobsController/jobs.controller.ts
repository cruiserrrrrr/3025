import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
} from "@nestjs/common";
import { CreateJobDto } from "../../dto/create-job.dto";
import { JobsService } from "../../services/JobsService/jobs.service";

@Controller("jobs")
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @Post()
    createJob(@Body() dto: CreateJobDto) {
        return this.jobsService.createJob(dto);
    }

    @Get()
    getJobs() {
        return this.jobsService.getJobs();
    }

    @Get(":id")
    getJob(@Param("id") id: string) {
        return this.jobsService.getJob(id);
    }

    @Delete(":id")
    cancelJob(@Param("id") id: string) {
        return this.jobsService.cancelJob(id);
    }
}
