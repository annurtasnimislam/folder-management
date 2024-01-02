import Folder from "../Folder/Folder";
import classes from "./FolderList.module.css";

export default function FolderList({ folders, onFolderClick }) {
  return (
    <div className={classes.list}>
      {folders.map((folder) => (
        <Folder key={folder.id} folder={folder} onFolderClick={onFolderClick} />
      ))}
    </div>
  );
}
