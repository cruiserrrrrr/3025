import { useState } from "react";
import { useDispatch, useSelector } from "@/shared/store/store";
import { createJob, fetchJobs } from "@/shared/store/slices/jobs/thunks";
import { selectJobsError, selectSubmitting } from "@/shared/store/slices/jobs";
import Button from "@/components/Button";
import styles from "./index.module.scss";

const JobForm = () => {
    const dispatch = useDispatch();
    const submitting = useSelector(selectSubmitting);
    const error = useSelector(selectJobsError);
    const [value, setValue] = useState("");

    const handleSubmit = async () => {
        const urls = value
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.length > 0);

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
            <textarea
                className={styles.textarea}
                placeholder="Один URL на строку"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={6}
            />
            {error ? <p className={styles.error}>{error}</p> : null}
            <Button onClick={handleSubmit} disabled={submitting}>
                Запустить проверку
            </Button>
        </div>
    );
};

export default JobForm;
