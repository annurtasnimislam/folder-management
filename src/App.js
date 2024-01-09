import { ManageFolder } from "./components";
import { Active, Crumb, Folder, Order } from "./contexts/contexts";
import { folderReducer, folderState } from "./contexts/reducers/folderReducer";
import { orderReducer, orderState } from "./contexts/reducers/orderReducer";
import { crumbReducer, crumbState } from "./contexts/reducers/crumbReducer";
import { activeReducer, activeState } from "./contexts/reducers/activeReducer";
import { useReducer } from "react";

function App() {
  const [stateFolder, dispatchFolder] = useReducer(folderReducer, folderState);
  const [stateOrder, dispatchOrder] = useReducer(orderReducer, orderState);
  const [stateCrumb, dispatchCrumb] = useReducer(crumbReducer, crumbState);
  const [stateActive, dispatchActive] = useReducer(activeReducer, activeState);

  return (
    <Folder.Provider value={{ stateFolder, dispatchFolder }}>
      <Order.Provider value={{ stateOrder, dispatchOrder }}>
        <Crumb.Provider value={{ stateCrumb, dispatchCrumb }}>
          <Active.Provider value={{ stateActive, dispatchActive }}>
            <ManageFolder />
          </Active.Provider>
        </Crumb.Provider>
      </Order.Provider>
    </Folder.Provider>
  );
}

export default App;
