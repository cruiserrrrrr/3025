import clsx from "clsx";
import styles from "./index.module.scss";

interface IStatusBadge {
    status: string;
}

const STATUS_LABELS: Record<string, string> = {
    pending: "Ожидает",
    in_progress: "В процессе",
    completed: "Завершено",
    cancelled: "Отменено",
    failed: "Сбой",
    success: "Успех",
    error: "Ошибка",
};

const StatusBadge = (props: IStatusBadge) => {
    const { status } = props;
    return (
        <span className={clsx(styles.badge, styles[status])}>
            {STATUS_LABELS[status] ?? status}
        </span>
    );
};

export default StatusBadge;
