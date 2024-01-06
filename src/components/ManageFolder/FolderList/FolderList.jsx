import Folder from "../Folder/Folder";
import classes from "./FolderList.module.css";

export default function FolderList({ showArray, onFolderClick, deleteClick }) {
  return (
    <div className={classes.list}>
      {showArray.map((folder, i) => (
        <Folder
          key={i}
          folder={folder}
          onFolderClick={onFolderClick}
          deleteClick={deleteClick}
        />
      ))}
    </div>
  );
}
