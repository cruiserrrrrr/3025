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

const STATUS_TONE: Record<string, string> = {
    pending: "amber",
    in_progress: "amber",
    completed: "green",
    success: "green",
    error: "red",
    failed: "red",
    cancelled: "neutral",
};

const PULSING = ["pending", "in_progress"];

const StatusBadge = (props: IStatusBadge) => {
    const { status } = props;
    const tone = STATUS_TONE[status] ?? "neutral";
    return (
        <span className={clsx(styles.badge, styles[tone])}>
            <span
                className={clsx(
                    styles.dot,
                    PULSING.includes(status) && styles.pulse,
                )}
            />
            {STATUS_LABELS[status] ?? status}
        </span>
    );
};

export default StatusBadge;
