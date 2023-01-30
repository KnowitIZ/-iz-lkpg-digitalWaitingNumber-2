import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { WaitingNumber } from "../models/waitingNumber";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";

export default class WaitingNumbersStore {
  list: WaitingNumber[] = [];
  selectedItem: WaitingNumber | undefined = undefined;
  lastItem: WaitingNumber | undefined = undefined;
  currentItem: WaitingNumber | undefined = undefined;
  itemsBefore: WaitingNumber[];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  load = async () => {
    this.setLoading(true);

    const list = await agent.WaitingNumbers.list();

    runInAction(() => {
      //do something with the list
      // list.map((x) => {
      //   x.firstName = "xxx";
      // });

      this.list = list;
    });

    this.setLoading(false);
  };

  setLoading = (state: boolean) => {
    this.isLoading = state;
  };

  setSelectedItem = (id: string) => {
    this.selectedItem = this.list.find((x) => x.id.toString() === id)!;
  };

  setLastItem = (item: WaitingNumber) => {
    this.lastItem = item;
  };

  setItemsBefore = (id: number) => {
    this.itemsBefore = this.list.filter(
      (x) => x.status === "waiting" && x.id < id
    );
  };

  setItemByUserIdForToday = (userId: string) => {
    agent.WaitingNumbers.getItemByUserIdForToday(userId)
      .then((x) => {
        this.currentItem = x;
      })
      .catch((error) => console.log(error));
  };

  setCurrentItem = (item: WaitingNumber) => {
    this.selectedItem = item;
  };
  // get sorted() {
  //   return Array.from(this.list.values()).sort(
  //     (a, b) => Date.parse(a.createdOn) - Date.parse(b.createdOn)
  //     // Date.parse(b.createdOn.toISOString())
  //   );
  //   // return Array.from(this.list.values()).sort((a,b) => Date.parse(a.date) - Date.parse(b.date));
  // }

  createEdit = async (model: WaitingNumber) => {
    this.setLoading(true);
    // model.id = uuid();

    try {
      if (model.id > 0) {
        const result = await agent.WaitingNumbers.update(model);
        runInAction(() => {
          this.list = [
            ...this.list.map((x) => (x.id === result.id ? result : x)),
          ];
        });

        toast.success("edit succeeded");
      } else {
        const result = await agent.WaitingNumbers.create(model);
        runInAction(() => {
          this.list = [...this.list, result];
          this.currentItem = result;
        });

        this.setItemsBefore(result.id);

        toast.success("create succeeded ");
      }
    } catch (error) {
      console.log(error);
    }

    this.setLoading(false);
  };

  rejectedByCustomer = async () => {
    this.setLoading(true);

    try {
      this.currentItem.status = "rejected by customer";
      const result = await agent.WaitingNumbers.update(this.currentItem);
      runInAction(() => {
        this.currentItem = result;
        this.list = [
          ...this.list.map((x) => (x.id === result.id ? result : x)),
        ];
      });

      toast.success("rejected by customer succeeded");
      // this.setItemsBefore(result.id);
    } catch (error) {
      console.log(error);
    }

    this.setLoading(false);
  };

  delete = async (id: number) => {
    this.setLoading(true);

    try {
      if (id > 0) {
        await agent.WaitingNumbers.delete(id);

        runInAction(() => {
          this.list = [...this.list.filter((x) => x.id != id)];
        });

        toast.success("delete succeeded");
      } else {
        toast.error("nothing to delete");
      }
    } catch (error) {
      console.log(error);
    }

    this.setLoading(false);
  };
}
