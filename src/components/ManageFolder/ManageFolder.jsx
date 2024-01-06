import { useState } from "react";
import FolderList from "./FolderList/FolderList";
import classes from "./ManageFolder.module.css";
import { Header, SearchBar } from "../Resource";
import redo from "../../assets/redo.png";
import Path from "./Path/Path";

export default function ManageFolder() {
  let root = {
    id: "0000",
    name: "root",
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

  const findFolder = (array, object) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === object.id) {
        return array[i].subfolders;
      } else {
        const result = findFolder(array[i].subfolders, object);
        if (result) {
          return result;
        }
      }
    }
  };

  const folderReplace = (array, object) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === object.id) {
        array[i] = object;
        return array;
      } else {
        const result = folderReplace(array[i].subfolders, object);
        if (result) {
          array[i].subfolders = result;
          return array;
        }
      }
    }
  };

  const deleteFolder = (array, object) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === object.id) {
        array.splice(i, 1);
      } else {
        deleteFolder(array[i].subfolders, object);
      }
    }
  };

  const handleDelete = (folder) => {
    deleteFolder(folders, folder);
    setStatus((prev) => !prev);
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
      />
    </div>
  );
}
