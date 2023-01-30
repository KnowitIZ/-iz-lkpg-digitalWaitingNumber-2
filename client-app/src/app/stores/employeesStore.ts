import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Employee } from "../models/employee";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";

export default class EmployeesStore {
  list: Employee[] = [];
  selectedItem: Employee | undefined = undefined;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  load = async () => {
    this.setLoading(true);

    const list = await agent.Employees.list();

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

  get sorted() {
    return Array.from(this.list).sort(
      (a, b) => a.lastName.length - b.lastName.length
    );
    // return Array.from(this.list.values()).sort((a,b) => Date.parse(a.date) - Date.parse(b.date));
  }

  createEdit = async (model: Employee) => {
    this.setLoading(true);
    // model.id = uuid();

    try {
      if (model.id > 0) {
        const result = await agent.Employees.update(model);
        runInAction(() => {
          this.list = [
            ...this.list.map((x) => (x.id === result.id ? result : x)),
          ];
        });

        toast.success("edit succeeded");
      } else {
        const result = await agent.Employees.create(model);
        runInAction(() => {
          this.list = [...this.list, result];
        });
        toast.success("create succeeded");
      }
    } catch (error) {
      console.log(error);
    }

    this.setLoading(false);
  };

  delete = async (id) => {
    this.setLoading(true);

    try {
      if (id > 0) {
        await agent.Employees.delete(id.toString());

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
