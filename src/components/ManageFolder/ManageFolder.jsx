import { useContext, useState } from "react";
import FolderList from "./FolderList/FolderList";
import classes from "./ManageFolder.module.css";
import { Header, SearchBar } from "../Resource";
import redo from "../../assets/redo.png";
import Path from "./Path/Path";
import {
  generateShortId,
  findFolder,
  folderReplace,
  deleteFolder,
} from "../../utils/recursive";
import { Folder } from "../../contexts/contexts";

export default function ManageFolder() {
  let root = {
    id: "00000",
    name: "root",
    color: "gray",
    subfolders: [],
  };
  let showArray = [];

  const [folders, setFolders] = useState([root]);
  const [active, setActive] = useState(root);
  const [create, setCreate] = useState("");
  const [path, setPath] = useState([root]);
  const [status, setStatus] = useState(false);
  const [state, setState] = useState(false);

  const { stateFolder, dispatchFolder } = useContext(Folder);

  // ******Functions******

  const handleCreateFolder = () => {
    if (create !== "") {
      const newFolder = {
        id: generateShortId(),
        parentId: active.id,
        name: create,
        color: "gray",
        subfolders: [],
      };
      setCreate("");
      let tempObj = { ...active };
      tempObj.subfolders.push(newFolder);
      setFolders(folderReplace(folders, tempObj));
      let all = [];
      all = folderReplace(folders, tempObj);
      dispatchFolder({ type: "set", payload: all });
    }
  };

  const handleFolderClick = (folder) => {
    setPath([...path, folder]);
    setActive(folder);
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

  const handleDelete = (folder) => {
    deleteFolder(folders, folder);
    dispatchFolder({ type: "set", payload: folders });
    setStatus((prev) => !prev);
  };

  const handleColor = (folder, color) => {
    let tempObj = {};
    tempObj = { ...folder };
    tempObj.color = color;
    let all = [];
    all = folderReplace(folders, tempObj);
    dispatchFolder({ type: "set", payload: all });
    setFolders(all);
    setState((prev) => !prev);
  };

  // ******Functions******

  showArray = findFolder(stateFolder, active);

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
        onColorClick={handleColor}
      />
    </div>
  );
}
