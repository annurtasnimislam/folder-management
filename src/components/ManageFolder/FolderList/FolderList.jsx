import Folder from "../Folder/Folder";
import classes from "./FolderList.module.css";

export default function FolderList({ showArray, onFolderClick, deleteClick }) {
  let order = true;

  return (
    <div className={classes.list}>
      {showArray
        .sort((a, b) =>
          order
            ? a.name > b.name
              ? 1
              : b.name > a.name
              ? -1
              : 0
            : a.name < b.name
            ? 1
            : b.name < a.name
            ? -1
            : 0
        )
        .map((folder, i) => (
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
