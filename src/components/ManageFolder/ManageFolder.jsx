import { useState } from "react";
import FolderList from "./FolderList/FolderList";
import classes from "./ManageFolder.module.css";
import { Header, SearchBar } from "../Resource";
import redo from "../../assets/redo.png";
import Path from "./Path/Path";

export default function ManageFolder() {
  const [folders, setFolders] = useState([]);
  const [showFolder, setShowFolder] = useState([]);
  const [active, setActive] = useState({});

  const [create, setCreate] = useState("");
  const [path, setPath] = useState([{ id: "0000", name: "root" }]);

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

  const deleteFolder = (array, object) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === object.id) {
        let parent = array[i].parentId;
        array.splice(i, 1);
        resetOnDelete(folders, parent, array);
        // return finalArray;
      } else {
        deleteFolder(array[i].subfolders, object);
        // if (result) {
        //   return array;
        // }
      }
    }
  };

  const resetOnDelete = (array, parentId, subArray) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === parentId) {
        array[i].subfolders = subArray;
        return array;
      } else {
        const result = folderReplace(array[i].subfolders, parentId, subArray);
        if (result) {
          array[i].subfolders = result;
          return array;
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

  const handlePathClick = (folder) => {
    for (let i = 0; i < path.length; i++) {
      if (path[i].id === folder.id) {
        const slicedPath = path.slice(0, i + 1);
        setPath(slicedPath);
      }
    }
    if (folder.id === "0000" && folder.name === "root") {
      setShowFolder(folders);
    } else {
      setShowFolder(findFolder(folders, folder));
      setActive(folder);
    }
  };

  const handleFolderClick = (folder) => {
    setShowFolder(findFolder(folders, folder));
    setPath([...path, folder]);
    setActive(folder);
  };

  const handleCreateFolder = () => {
    if (create !== "" && Object.keys(active).length > 0) {
      const newFolder = {
        id: generateShortId(),
        parentId: active.id,
        name: create,
        subfolders: [],
      };
      setCreate("");
      let tempObj = { ...active };
      tempObj.subfolders.push(newFolder);
      let tempArray = folderReplace(folders, tempObj);
      setFolders(tempArray);
      setShowFolder(findFolder(tempArray, tempObj));
    } else if (create !== "") {
      const newFolder = {
        id: generateShortId(),
        parentId: "0000",
        name: create,
        subfolders: [],
      };
      setCreate("");
      setFolders([...folders, newFolder]);
      setShowFolder([...showFolder, newFolder]);
    }
  };

  const handleDelete = (folder) => {
    deleteFolder(folders, folder);
    setStatus((prev) => !prev);
  };

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
        onChange={(e) => setCreate(e.target.value)}
        onClick={handleCreateFolder}
      />
      <FolderList
        showFolder={showFolder}
        onFolderClick={handleFolderClick}
        deleteClick={handleDelete}
      />
    </div>
  );
}
