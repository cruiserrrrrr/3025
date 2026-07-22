import { useState } from "react";
import { useDispatch, useSelector } from "@/shared/store/store";
import { createJob, fetchJobs } from "@/shared/store/slices/jobs/thunks";
import { selectJobsError, selectSubmitting } from "@/shared/store/slices/jobs";
import Button from "@/components/Button";
import styles from "./index.module.scss";

const parseUrls = (value: string) =>
    value
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

const JobForm = () => {
    const dispatch = useDispatch();
    const submitting = useSelector(selectSubmitting);
    const error = useSelector(selectJobsError);
    const [value, setValue] = useState("");

    const count = parseUrls(value).length;

    const handleSubmit = async () => {
        const urls = parseUrls(value);
        if (urls.length === 0) {
            return;
        }

        const result = await dispatch(createJob(urls));
        if (createJob.fulfilled.match(result)) {
            setValue("");
            dispatch(fetchJobs());
        }
    };

    return (
        <div className={styles.form}>
            <div className={styles.head}>
                <span className={styles.label}>Ссылки для проверки</span>
                <span className={styles.counter}>{count}</span>
            </div>
            <textarea
                className={styles.textarea}
                placeholder="Вставьте ссылки, по одной на строку"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={6}
            />
            {error ? <p className={styles.error}>{error}</p> : null}
            <Button
                className={styles.submit}
                onClick={handleSubmit}
                disabled={count === 0}
                loading={submitting}
            >
                Запустить проверку
            </Button>
        </div>
    );
};

export default JobForm;
