import type { JSX } from "react";
import styles from "@css/Background.module.scss";

export const Background = ({ children }: { children: JSX.Element }) => {
  return <div className={styles.mainContainer}>{children}</div>;
};
