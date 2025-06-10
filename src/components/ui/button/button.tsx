import React from "react";
import styles from "./button.module.sass";
type ButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  disabled,
  type = "button",
}) => {
  return (
    <button
      className={styles.baseButton}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};
