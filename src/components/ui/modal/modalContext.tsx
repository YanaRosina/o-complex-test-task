"use client";
import React, { createContext, useContext, useState } from "react";

type ModalType = "order" | "product" | null;

interface ModalContextType {
  modalType: ModalType;
  modalMessage: string;
  showModal: (type: ModalType, message: string) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  modalType: null,
  modalMessage: "",
  showModal: () => {},
  hideModal: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (type: ModalType, message: string) => {
    setModalType(type);
    setModalMessage(message);
  };

  const hideModal = () => {
    setModalType(null);
    setModalMessage("");
  };

  return (
    <ModalContext.Provider
      value={{ modalType, modalMessage, showModal, hideModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
