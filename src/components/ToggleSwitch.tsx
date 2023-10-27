import styles from "../styles/toggleSwitch.module.scss";
import { useAppDispatch, useAppSelector } from "../store";
import { toggleTheme } from "../store/themeSlice";

const ToggleSwitch = () => {
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const themeHandler = () => {
    dispatch(toggleTheme());
  };
  return (
    <div className={styles.toggleContainer}>
      <img src="./assets/icon-light-theme.svg" alt="" />
      <label className={styles.toggleSwitch}>
        <input
          onChange={() => themeHandler()}
          checked={theme === "dark-theme" ? true : false}
          type="checkbox"
        />
        <span className={styles.switch} />
      </label>
      <img src="./assets/icon-dark-theme.svg" alt="" />
    </div>
  );
};

export { ToggleSwitch };
