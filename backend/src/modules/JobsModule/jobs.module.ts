import { Module } from "@nestjs/common";
import { JobsStore } from "../../services/JobsStore/jobs-store.service";

@Module({
    controllers: [],
    providers: [JobsStore],
})
export class JobsModule {}
