import { useContext } from "react";
import Folder from "../Folder/Folder";
import classes from "./FolderList.module.css";
import { Order } from "../../../contexts/contexts";

export default function FolderList({
  showArray,
  onFolderClick,
  deleteClick,
  folders,
  setFolders,
  colorNew,
  setColorNew,
  setColorObj,
}) {
  const { stateOrder } = useContext(Order);

  return (
    <div className={classes.list}>
      {showArray
        .sort((a, b) =>
          stateOrder.info === "asc"
            ? a.name > b.name
              ? 1
              : b.name > a.name
              ? -1
              : 0
            : stateOrder.info === "dsc"
            ? a.name < b.name
              ? 1
              : b.name < a.name
              ? -1
              : 0
            : ""
        )
        .map((folder, i) => (
          <Folder
            key={i}
            folder={folder}
            onFolderClick={onFolderClick}
            deleteClick={deleteClick}
            showArray={showArray}
            folders={folders}
            setFolders={setFolders}
            colorNew={colorNew}
            setColorNew={setColorNew}
            setColorObj={setColorObj}
          />
        ))}
    </div>
  );
}
