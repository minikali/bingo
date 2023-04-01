import React from "react";
import styles from "@/styles/Popup.module.css";
import Button from "./Button";

interface PopupProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup = ({ show, onClose, children }: PopupProps) => {
  return show ? (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <div className={styles.content}>{children}</div>
        <Button color="red" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  ) : null;
};

export default Popup;
