import Folder from "../Folder/Folder";
import classes from "./FolderList.module.css";

export default function FolderList({ showFolder, onFolderClick, deleteClick }) {
  return (
    <div className={classes.list}>
      {showFolder &&
        showFolder.map((folder, i) => (
          <Folder
            key={i}
            folder={folder}
            onFolderClick={onFolderClick}
            deleteClick={deleteClick}
            showFolder={showFolder}
          />
        ))}
    </div>
  );
}
