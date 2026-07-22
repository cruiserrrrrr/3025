import clsx from "clsx";
import { useDispatch, useSelector } from "@/shared/store/store";
import {
    selectJob,
    selectJobsList,
    selectJobsListLoading,
    selectSelectedId,
} from "@/shared/store/slices/jobs";
import { fetchJobDetail } from "@/shared/store/slices/jobs/thunks";
import StatusBadge from "@/components/StatusBadge";
import styles from "./index.module.scss";

const JobList = () => {
    const dispatch = useDispatch();
    const jobs = useSelector(selectJobsList);
    const loading = useSelector(selectJobsListLoading);
    const selectedId = useSelector(selectSelectedId);

    const handleSelect = (id: string) => {
        dispatch(selectJob(id));
        dispatch(fetchJobDetail(id));
    };

    if (jobs.length === 0 && loading) {
        return (
            <ul className={styles.list}>
                {[0, 1, 2].map((index) => (
                    <li key={index} className={styles.skeleton} />
                ))}
            </ul>
        );
    }

    if (jobs.length === 0) {
        return (
            <div className={styles.empty}>
                <p className={styles.emptyTitle}>Задач пока нет</p>
                <p className={styles.emptyText}>
                    Добавьте ссылки и запустите проверку
                </p>
            </div>
        );
    }

    return (
        <ul className={styles.list}>
            {jobs.map((job) => (
                <li
                    key={job.id}
                    className={clsx(
                        styles.item,
                        selectedId === job.id && styles.active,
                    )}
                    onClick={() => handleSelect(job.id)}
                >
                    <div className={styles.row}>
                        <span className={styles.id}>#{job.id.slice(0, 8)}</span>
                        <StatusBadge status={job.status} />
                    </div>
                    <div className={styles.stats}>
                        <span className={styles.stat}>
                            <span className={styles.statValue}>
                                {job.total}
                            </span>
                            всего
                        </span>
                        <span className={clsx(styles.stat, styles.ok)}>
                            <span className={styles.statValue}>
                                {job.success}
                            </span>
                            успешно
                        </span>
                        <span className={clsx(styles.stat, styles.bad)}>
                            <span className={styles.statValue}>
                                {job.error}
                            </span>
                            ошибок
                        </span>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default JobList;
