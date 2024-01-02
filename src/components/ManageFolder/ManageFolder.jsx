import { useState } from "react";
import FolderList from "./FolderList/FolderList";
import classes from "./ManageFolder.module.css";
import { Header, SearchBar } from "../Resource";
import redo from "../../assets/redo.png";

export default function ManageFolder() {
  const [folders, setFolders] = useState([]);

  const [create, setCreate] = useState("");

  const [name, setName] = useState("");

  const handleFolderClick = (folder) => {
    setName(name + "/" + folder.name);
    setFolders([]);
  };

  const handleCreateFolder = () => {
    if (create !== "") {
      const newFolder = {
        id: folders.length + 1,
        name: create,
        subfolders: [],
      };
      setFolders([...folders, newFolder]);
      setCreate("");
    }
  };

  return (
    <div className={classes.container}>
      <Header />
      {name && (
        <div className={classes.path}>
          <img src={redo} alt="redo" />
          <p>Path {name}</p>
        </div>
      )}
      <SearchBar
        value={create}
        onChange={(e) => setCreate(e.target.value)}
        onClick={handleCreateFolder}
      />
      <FolderList folders={folders} onFolderClick={handleFolderClick} />
    </div>
  );
}
