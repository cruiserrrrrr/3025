import { useEffect } from "react";
import { useDispatch, useSelector } from "@/shared/store/store";
import { fetchJobs } from "@/shared/store/slices/jobs/thunks";
import { selectJobsList } from "@/shared/store/slices/jobs";
import { usePolling } from "@/shared/hooks/usePolling";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import JobDetail from "./components/JobDetail";
import styles from "./index.module.scss";

const ACTIVE_STATUSES = ["pending", "in_progress"];

const Jobs = () => {
    const dispatch = useDispatch();
    const jobs = useSelector(selectJobsList);

    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

    const hasActive = jobs.some((job) => ACTIVE_STATUSES.includes(job.status));

    usePolling(() => dispatch(fetchJobs()), 2000, hasActive);

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h1 className={styles.title}>Проверка ссылок</h1>
                <p className={styles.subtitle}>
                    Асинхронная проверка доступности URL
                </p>
            </header>
            <div className={styles.layout}>
                <aside className={styles.sidebar}>
                    <JobForm />
                    <JobList />
                </aside>
                <main className={styles.main}>
                    <JobDetail />
                </main>
            </div>
        </div>
    );
};

export default Jobs;
