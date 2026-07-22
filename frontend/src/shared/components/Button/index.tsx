import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import Spinner from "@/components/Spinner";
import styles from "./index.module.scss";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger";
    loading?: boolean;
}

const Button = (props: IButton) => {
    const {
        children,
        className,
        variant = "primary",
        loading,
        disabled,
        ...rest
    } = props;
    return (
        <button
            className={clsx(styles.button, styles[variant], className)}
            disabled={disabled || loading}
            {...rest}
        >
            {loading ? (
                <Spinner size={16} light={variant === "primary"} />
            ) : null}
            {children}
        </button>
    );
};

export default Button;
