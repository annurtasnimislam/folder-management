import classes from "./Folder.module.css";
import icon from "../../../assets/folder.png";
import { useState } from "react";
import { folderReplace } from "../../../utils/recursive";

export default function Folder({
  folder,
  onFolderClick,
  deleteClick,
  folders,
  setFolders,
}) {
  const [colorNew, setColorNew] = useState("");

  if (colorNew) {
    let tempObj = { ...folder };
    tempObj.color = colorNew;
    setFolders(folderReplace(folders, tempObj));
  }

  return (
    <div className={classes.flex}>
      <p onClick={() => deleteClick(folder)}>X</p>
      <p onClick={() => setColorNew("blue")}>blue</p>
      <p onClick={() => setColorNew("green")}>green</p>
      <p onClick={() => setColorNew("brown")}>brown</p>
      <p onClick={() => setColorNew("gray")}>gray</p>
      <div className={classes.wrapper} onClick={() => onFolderClick(folder)}>
        <img src={icon} alt="folder" />
        {folder.name}
      </div>
    </div>
  );
}
