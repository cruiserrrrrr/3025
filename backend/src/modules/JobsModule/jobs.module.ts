import { Module } from "@nestjs/common";
import { JobsController } from "../../controllers/JobsController/jobs.controller";
import { JobsService } from "../../services/JobsService/jobs.service";
import { JobsStore } from "../../services/JobsStore/jobs-store.service";
import { UrlCheckerService } from "../../services/UrlCheckerService/url-checker.service";

@Module({
    controllers: [JobsController],
    providers: [JobsService, JobsStore, UrlCheckerService],
})
export class JobsModule {}
