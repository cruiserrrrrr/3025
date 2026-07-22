import { Module } from "@nestjs/common";
import { JobsModule } from "./modules/JobsModule/jobs.module";

@Module({
    imports: [JobsModule],
})
export class AppModule {}
