import { useContext, useState } from "react";
import FolderList from "./FolderList/FolderList";
import classes from "./ManageFolder.module.css";
import { Header, SearchBar } from "../Resource";
import redo from "../../assets/redo.png";
import Path from "./Path/Path";
import {
  generateShortId,
  findObject,
  findFolder,
  folderReplace,
  deleteFolder,
} from "../../utils/recursive";
import { Active, Crumb, Folder } from "../../contexts/contexts";

export default function ManageFolder() {
  let showArray = [];

  const [create, setCreate] = useState("");
  const { stateFolder, dispatchFolder } = useContext(Folder);
  const { stateCrumb, dispatchCrumb } = useContext(Crumb);
  const { stateActive, dispatchActive } = useContext(Active);

  // ******Functions******

  const handleCreateFolder = () => {
    let active = { ...stateActive };

    if (create !== "") {
      const newFolder = {
        id: generateShortId(),
        parentId: active.id,
        name: create,
        color: "gray",
        subfolders: [],
      };
      setCreate("");
      let tempObj = findObject(stateFolder, active);
      tempObj.subfolders.push(newFolder);
      let all = [...stateFolder];
      let replacedArray = folderReplace(all, tempObj);
      dispatchFolder({ type: "set", payload: replacedArray });
    }
  };

  const handleFolderClick = (folder) => {
    let temp = [...stateCrumb, folder];
    dispatchCrumb({ type: "set", payload: temp });
    dispatchActive({ type: "set", payload: folder });
  };

  const handlePathClick = (folder) => {
    dispatchActive({ type: "set", payload: folder });
    let path = [...stateCrumb];
    for (let i = 0; i < path.length; i++) {
      if (path[i].id === folder.id) {
        const slicedPath = path.slice(0, i + 1);
        dispatchCrumb({ type: "set", payload: slicedPath });
      }
    }
  };

  const handleDelete = (folder) => {
    let all = [...stateFolder];
    deleteFolder(all, folder);
    dispatchFolder({ type: "set", payload: all });
  };

  const handleColor = (folder, color) => {
    let tempObj = {};
    tempObj = { ...folder };
    tempObj.color = color;
    let all = [];
    all = folderReplace(stateFolder, tempObj);
    dispatchFolder({ type: "set", payload: all });
  };

  // ******Functions******

  showArray = findFolder(stateFolder, stateActive);

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.pathHolder}>
        <img src={redo} alt="redo" />
        {stateCrumb.map((p) => (
          <Path key={p.id} p={p} onClick={handlePathClick} />
        ))}
      </div>
      <SearchBar
        value={create}
        onChange={(e) => setCreate(e.target.value.trim())}
        onClick={handleCreateFolder}
      />
      <FolderList
        showArray={showArray}
        onFolderClick={handleFolderClick}
        deleteClick={handleDelete}
        onColorClick={handleColor}
      />
    </div>
  );
}
