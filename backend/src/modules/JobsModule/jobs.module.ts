import { Module } from "@nestjs/common";
import { JobsStore } from "../../services/JobsStore/jobs-store.service";
import { UrlCheckerService } from "../../services/UrlCheckerService/url-checker.service";

@Module({
    controllers: [],
    providers: [JobsStore, UrlCheckerService],
})
export class JobsModule {}
