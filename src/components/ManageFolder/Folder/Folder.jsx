import classes from "./Folder.module.css";
import { useEffect, useState } from "react";
import { folderReplace } from "../../../utils/recursive";
import { FaFolderOpen } from "react-icons/fa6";

export default function Folder({
  folder,
  onFolderClick,
  deleteClick,
  setFolders,
}) {
  const [colorNew, setColorNew] = useState("gray");

  useEffect(() => {
    let tempObj = { ...folder };
    tempObj.color = colorNew;
    setFolders((prevFolders) => folderReplace(prevFolders, tempObj));
  }, [colorNew]);

  return (
    <div className={classes.flex}>
      <p onClick={() => deleteClick(folder)}>X</p>
      <p onClick={() => setColorNew("blue")}>blue</p>
      <p onClick={() => setColorNew("green")}>green</p>
      <p onClick={() => setColorNew("brown")}>brown</p>
      <p onClick={() => setColorNew("gray")}>gray</p>
      <div className={classes.wrapper} onClick={() => onFolderClick(folder)}>
        <FaFolderOpen style={{ color: `var(--${colorNew})` }} />
        {folder.name}
      </div>
    </div>
  );
}
