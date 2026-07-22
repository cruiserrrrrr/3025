import { useDispatch, useSelector } from "@/shared/store/store";
import { selectJobDetail, selectSelectedId } from "@/shared/store/slices/jobs";
import { cancelJob, fetchJobDetail } from "@/shared/store/slices/jobs/thunks";
import { usePolling } from "@/shared/hooks/usePolling";
import StatusBadge from "@/components/StatusBadge";
import Button from "@/components/Button";
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
        return <p className={styles.empty}>Выберите задачу</p>;
    }

    if (!detail) {
        return <p className={styles.empty}>Загрузка…</p>;
    }

    const processed = detail.urls.filter((u) =>
        PROCESSED_STATUSES.includes(u.status),
    ).length;

    const handleCancel = () => {
        dispatch(cancelJob(detail.id));
    };

    return (
        <div className={styles.detail}>
            <div className={styles.header}>
                <StatusBadge status={detail.status} />
                <span className={styles.progress}>
                    {processed} из {detail.urls.length} обработано
                </span>
                {!FINAL_STATUSES.includes(detail.status) ? (
                    <Button variant="danger" onClick={handleCancel}>
                        Отменить задание
                    </Button>
                ) : null}
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Статус</th>
                        <th>HTTP</th>
                        <th>Ошибка</th>
                        <th>Время, мс</th>
                    </tr>
                </thead>
                <tbody>
                    {detail.urls.map((item, index) => (
                        <tr key={`${item.url}-${index}`}>
                            <td className={styles.url}>{item.url}</td>
                            <td>
                                <StatusBadge status={item.status} />
                            </td>
                            <td>{item.statusCode ?? "—"}</td>
                            <td className={styles.errorCell}>
                                {item.error ?? "—"}
                            </td>
                            <td>{item.duration ?? "—"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JobDetail;
