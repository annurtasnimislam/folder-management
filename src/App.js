import { ManageFolder } from "./components";
import { Folder, Order } from "./contexts/contexts";
import { folderReducer, folderState } from "./contexts/reducers/folderReducer";
import { orderReducer, orderState } from "./contexts/reducers/orderReducer";
import { useReducer } from "react";

function App() {
  const [stateFolder, dispatchFolder] = useReducer(folderReducer, folderState);
  const [stateOrder, dispatchOrder] = useReducer(orderReducer, orderState);
  return (
    <Folder.Provider value={{ stateFolder, dispatchFolder }}>
      <Order.Provider value={{ stateOrder, dispatchOrder }}>
        <ManageFolder />
      </Order.Provider>
    </Folder.Provider>
  );
}

export default App;
