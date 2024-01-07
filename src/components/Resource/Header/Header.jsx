import { useContext } from "react";
import classes from "./Header.module.css";
import { MdEditNote } from "react-icons/md";
import { Order } from "../../../contexts/contexts";

export default function Header() {
  const { dispatchOrder } = useContext(Order);

  return (
    <div className={classes.wrapper}>
      <div>
        <div className={classes.iconWrapper}>
          <MdEditNote className={classes.icon} />
        </div>
        <p>Folder Manager</p>
      </div>
      <div>
        <button onClick={() => dispatchOrder({ type: "set", payload: "asc" })}>
          ASC
        </button>
        <button onClick={() => dispatchOrder({ type: "set", payload: "dsc" })}>
          DSC
        </button>
      </div>
    </div>
  );
}
