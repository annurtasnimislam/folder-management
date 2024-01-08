import classes from "./Folder.module.css";
import { FaFolderOpen } from "react-icons/fa6";

export default function Folder({
  folder,
  onFolderClick,
  deleteClick,
  onColorClick,
}) {
  return (
    <div className={classes.flex}>
      <p onClick={() => deleteClick(folder)}>X</p>
      <p onClick={() => onColorClick(folder, "blue")}>blue</p>
      <p onClick={() => onColorClick(folder, "green")}>green</p>
      <p onClick={() => onColorClick(folder, "brown")}>brown</p>
      <p onClick={() => onColorClick(folder, "gray")}>gray</p>
      <div className={classes.wrapper} onClick={() => onFolderClick(folder)}>
        <FaFolderOpen style={{ color: `var(--${folder.color})` }} />
        {folder.name}
      </div>
    </div>
  );
}
