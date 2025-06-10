"use client";
import { useEffect } from "react";
import { useModal } from "./modalContext";
import styles from "./modal.module.sass";

export const AutoCloseModal = () => {
  const { modalType, modalMessage, hideModal } = useModal();

  useEffect(() => {
    if (modalType) {
      const timer = setTimeout(hideModal, 2000);
      return () => clearTimeout(timer);
    }
  }, [modalType, hideModal]);

  if (!modalType) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.content}>
          <h2>{modalMessage}</h2>
        </div>
      </div>
    </div>
  );
};
