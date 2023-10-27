import { Boards, ToggleSwitch } from "./";
import { useState } from "react";
import styles from "../styles/aside.module.scss";

const Aside = () => {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <>
      {!isHidden && <div className={styles.helper}></div>}
      <aside
        className={`${styles["aside"]} ${!isHidden ? styles.asideActive : ""}`}
      >
        {!isHidden && (
          <div className={styles.asideContent}>
            <Boards />

            <ToggleSwitch />
          </div>
        )}

        <div
          onClick={() => setIsHidden(!isHidden)}
          className={`${styles.hider} ${isHidden ? styles.closed : ""}`}
        >
          <img
            className={styles.eye}
            src="./assets/icon-hide-sidebar.svg"
            alt=""
          />
          {!isHidden && <p>Hide SideBar</p>}
        </div>
      </aside>
    </>
  );
};

export default Aside;
