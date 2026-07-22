import clsx from "clsx";
import { useDispatch, useSelector } from "@/shared/store/store";
import {
    selectJob,
    selectJobsList,
    selectSelectedId,
} from "@/shared/store/slices/jobs";
import { fetchJobDetail } from "@/shared/store/slices/jobs/thunks";
import StatusBadge from "@/components/StatusBadge";
import styles from "./index.module.scss";

const JobList = () => {
    const dispatch = useDispatch();
    const jobs = useSelector(selectJobsList);
    const selectedId = useSelector(selectSelectedId);

    const handleSelect = (id: string) => {
        dispatch(selectJob(id));
        dispatch(fetchJobDetail(id));
    };

    if (jobs.length === 0) {
        return <p className={styles.empty}>Задач пока нет</p>;
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
                        <span className={styles.id}>{job.id.slice(0, 8)}</span>
                        <StatusBadge status={job.status} />
                    </div>
                    <div className={styles.stats}>
                        <span>Всего: {job.total}</span>
                        <span className={styles.success}>
                            Успех: {job.success}
                        </span>
                        <span className={styles.error}>
                            Ошибки: {job.error}
                        </span>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default JobList;
