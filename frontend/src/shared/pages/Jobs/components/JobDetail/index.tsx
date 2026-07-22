import clsx from "clsx";
import { useDispatch, useSelector } from "@/shared/store/store";
import { selectJobDetail, selectSelectedId } from "@/shared/store/slices/jobs";
import { cancelJob, fetchJobDetail } from "@/shared/store/slices/jobs/thunks";
import { usePolling } from "@/shared/hooks/usePolling";
import StatusBadge from "@/components/StatusBadge";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import styles from "./index.module.scss";

const FINAL_STATUSES = ["completed", "cancelled", "failed"];
const PROCESSED_STATUSES = ["success", "error", "cancelled"];

const JobDetail = () => {
    const dispatch = useDispatch();
    const detail = useSelector(selectJobDetail);
    const selectedId = useSelector(selectSelectedId);

    usePolling(
        () => {
            if (selectedId) {
                dispatch(fetchJobDetail(selectedId));
            }
        },
        1000,
        Boolean(selectedId) &&
            (!detail || !FINAL_STATUSES.includes(detail.status)),
    );

    if (!selectedId) {
        return (
            <div className={styles.placeholder}>
                <p className={styles.placeholderTitle}>Задача не выбрана</p>
                <p className={styles.placeholderText}>
                    Выберите задачу из списка слева
                </p>
            </div>
        );
    }

    if (!detail) {
        return (
            <div className={styles.placeholder}>
                <Spinner size={28} />
            </div>
        );
    }

    const total = detail.urls.length;
    const processed = detail.urls.filter((item) =>
        PROCESSED_STATUSES.includes(item.status),
    ).length;
    const percent = total === 0 ? 0 : Math.round((processed / total) * 100);
    const isActive = !FINAL_STATUSES.includes(detail.status);

    const handleCancel = () => {
        dispatch(cancelJob(detail.id));
    };

    return (
        <div className={styles.detail}>
            <div className={styles.header}>
                <div className={styles.headMain}>
                    <StatusBadge status={detail.status} />
                    <span className={styles.id}>#{detail.id.slice(0, 8)}</span>
                    {isActive ? (
                        <span className={styles.live}>
                            <Spinner size={14} />
                            обновляется
                        </span>
                    ) : null}
                </div>
                {isActive ? (
                    <Button variant="danger" onClick={handleCancel}>
                        Отменить задание
                    </Button>
                ) : null}
            </div>

            <div className={styles.progress}>
                <div className={styles.progressHead}>
                    <span className={styles.progressLabel}>
                        {processed} из {total} обработано
                    </span>
                    <span className={styles.progressPercent}>{percent}%</span>
                </div>
                <div className={styles.track}>
                    <div
                        className={styles.fill}
                        style={{ width: `${percent}%` }}
                    />
                </div>
            </div>

            <div className={styles.tableWrap}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>URL</th>
                            <th>Статус</th>
                            <th>HTTP</th>
                            <th>Ошибка</th>
                            <th className={styles.num}>Время, мс</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detail.urls.map((item, index) => (
                            <tr key={`${item.url}-${index}`}>
                                <td className={styles.url}>{item.url}</td>
                                <td>
                                    <StatusBadge status={item.status} />
                                </td>
                                <td className={styles.mono}>
                                    {item.statusCode ?? "—"}
                                </td>
                                <td className={styles.errorCell}>
                                    {item.error ?? "—"}
                                </td>
                                <td className={clsx(styles.num, styles.mono)}>
                                    {item.duration ?? "—"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JobDetail;
