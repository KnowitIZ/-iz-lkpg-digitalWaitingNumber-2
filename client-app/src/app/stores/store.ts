import { createContext, useContext } from "react";
import AccountStore from "./accountStore";
import CommonStore from "./CommonStore";
import WaitingNumbersStore from "./waitingNumbersStore";
import EmployeesStore from "./employeesStore";
import ModalStore from "./modalStore";

interface Store {
  employeesStore: EmployeesStore;
  commonStore: CommonStore;
  accountStore: AccountStore;
  modalStore: ModalStore;
  waitingNumbersStore: WaitingNumbersStore;
}

export const store: Store = {
  employeesStore: new EmployeesStore(),
  commonStore: new CommonStore(),
  accountStore: new AccountStore(),
  modalStore: new ModalStore(),
  waitingNumbersStore: new WaitingNumbersStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
