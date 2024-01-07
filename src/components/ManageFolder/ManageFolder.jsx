import { useState } from "react";
import FolderList from "./FolderList/FolderList";
import classes from "./ManageFolder.module.css";
import { Header, SearchBar } from "../Resource";
import redo from "../../assets/redo.png";
import Path from "./Path/Path";
import { findFolder, folderReplace, deleteFolder } from "../../utils/recursive";

export default function ManageFolder() {
  let root = {
    id: "0000",
    name: "root",
    color: "",
    subfolders: [],
  };
  const [folders, setFolders] = useState([root]);
  const [active, setActive] = useState(root);

  let showArray = [];
  const [create, setCreate] = useState("");
  const [path, setPath] = useState([root]);
  const [status, setStatus] = useState(false);

  const generateShortId = () => {
    const randomShortNumber = Math.floor(Math.random() * 10000);
    return String(randomShortNumber).padStart(4, "0");
  };

  const handleDelete = (folder) => {
    deleteFolder(folders, folder);
    setStatus((prev) => !prev);
    console.log(folders);
  };

  const handlePathClick = (folder) => {
    setActive(folder);
    for (let i = 0; i < path.length; i++) {
      if (path[i].id === folder.id) {
        const slicedPath = path.slice(0, i + 1);
        setPath(slicedPath);
      }
    }
  };

  const handleFolderClick = (folder) => {
    setPath([...path, folder]);
    setActive(folder);
  };

  const handleCreateFolder = () => {
    if (create !== "") {
      const newFolder = {
        id: generateShortId(),
        parentId: active.id,
        name: create,
        color: "",
        subfolders: [],
      };
      setCreate("");
      let tempObj = { ...active };
      tempObj.subfolders.push(newFolder);
      setFolders(folderReplace(folders, tempObj));
    }
  };

  showArray = findFolder(folders, active);

  return (
    <div className={classes.container}>
      <Header />
      {path.length > 0 && (
        <div className={classes.pathHolder}>
          <img src={redo} alt="redo" />
          {path.map((p) => (
            <Path key={p.id} p={p} onClick={handlePathClick} />
          ))}
        </div>
      )}
      <SearchBar
        value={create}
        onChange={(e) => setCreate(e.target.value.trim())}
        onClick={handleCreateFolder}
      />
      <FolderList
        showArray={showArray}
        onFolderClick={handleFolderClick}
        deleteClick={handleDelete}
        setFolders={setFolders}
      />
    </div>
  );
}
