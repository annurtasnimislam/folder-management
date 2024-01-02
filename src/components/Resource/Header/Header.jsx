import classes from "./Header.module.css";
import { MdEditNote } from "react-icons/md";

export default function Header() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.iconWrapper}>
        <MdEditNote className={classes.icon} />
      </div>
      <p>Folder Manager</p>
    </div>
  );
}
