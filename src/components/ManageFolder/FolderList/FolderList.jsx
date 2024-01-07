import Folder from "../Folder/Folder";
import classes from "./FolderList.module.css";

export default function FolderList({
  showArray,
  onFolderClick,
  deleteClick,
  folders,
  setFolders,
}) {
  let order = "des";

  return (
    <div className={classes.list}>
      {showArray
        .sort((a, b) =>
          order === "asc"
            ? a.name > b.name
              ? 1
              : b.name > a.name
              ? -1
              : 0
            : order === "des"
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
            folders={folders}
            setFolders={setFolders}
          />
        ))}
    </div>
  );
}
