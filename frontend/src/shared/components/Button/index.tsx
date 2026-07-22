import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./index.module.scss";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "danger";
}

const Button = (props: IButton) => {
    const { children, className, variant = "primary", ...rest } = props;
    return (
        <button
            className={clsx(styles.button, styles[variant], className)}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
