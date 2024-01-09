import { useState } from "react";
import classes from "./Folder.module.css";
import { FaFolderOpen } from "react-icons/fa6";

export default function Folder({
  folder,
  onFolderClick,
  deleteClick,
  onColorClick,
}) {
  const [option, setOption] = useState(false);

  return (
    <div className={classes.flex}>
      <div className={classes.wrapper} onClick={() => setOption(true)}>
        <FaFolderOpen style={{ color: `var(--${folder.color})` }} />
        {folder.name}
      </div>
      {option && (
        <div className={classes.options}>
          <p onClick={() => onFolderClick(folder)}>Open Folder</p>
          <p onClick={() => deleteClick(folder)}>X</p>
          <p
            onClick={() => {
              onColorClick(folder, "blue");
              setOption(false);
            }}
          >
            blue
          </p>
          <p
            onClick={() => {
              onColorClick(folder, "green");
              setOption(false);
            }}
          >
            green
          </p>
          <p
            onClick={() => {
              onColorClick(folder, "brown");
              setOption(false);
            }}
          >
            brown
          </p>
          <p
            onClick={() => {
              onColorClick(folder, "gray");
              setOption(false);
            }}
          >
            gray
          </p>
          <p onClick={() => setOption(false)}>close</p>
        </div>
      )}
    </div>
  );
}
