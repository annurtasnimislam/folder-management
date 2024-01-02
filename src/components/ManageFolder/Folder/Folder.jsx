import classes from "./Folder.module.css";
import icon from "../../../assets/folder.png";

export default function Folder({ folder, onFolderClick }) {
  return (
    <div className={classes.wrapper} onClick={() => onFolderClick(folder)}>
      <img src={icon} alt="folder" />
      {folder.name}
    </div>
  );
}
