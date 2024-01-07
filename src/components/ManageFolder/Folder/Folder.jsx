import classes from "./Folder.module.css";
import { FaFolderOpen } from "react-icons/fa6";

export default function Folder({
  folder,
  onFolderClick,
  deleteClick,
  folders,
  setFolders,
  colorNew,
  setColorNew,
  setColorObj,
}) {
  return (
    <div className={classes.flex}>
      <p onClick={() => deleteClick(folder)}>X</p>
      <p
        onClick={() => {
          setColorNew("blue");
          setColorObj(folder);
        }}
      >
        blue
      </p>
      <p
        onClick={() => {
          setColorNew("green");
          setColorObj(folder);
        }}
      >
        green
      </p>
      <p
        onClick={() => {
          setColorNew("brown");
          setColorObj(folder);
        }}
      >
        brown
      </p>
      <p
        onClick={() => {
          setColorNew("gray");
          setColorObj(folder);
        }}
      >
        gray
      </p>
      <div className={classes.wrapper} onClick={() => onFolderClick(folder)}>
        <FaFolderOpen style={{ color: `var(--${folder.color})` }} />
        {folder.name}
      </div>
    </div>
  );
}
