import clsx from "clsx";
import styles from "./index.module.scss";

interface ISpinner {
    size?: number;
    light?: boolean;
    className?: string;
}

const Spinner = (props: ISpinner) => {
    const { size = 20, light, className } = props;
    return (
        <span
            className={clsx(styles.spinner, light && styles.light, className)}
            style={{ width: size, height: size }}
        />
    );
};

export default Spinner;
