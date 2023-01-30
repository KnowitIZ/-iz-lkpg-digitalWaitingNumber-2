import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { UserModel, LoginModel } from "../models/userModel";
import { router } from "../router/Routes";
import { store } from "./store";

export default class AccountStore {
  user: UserModel | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  isInRole = (role: string) => {
    if (this.user) {
      return this.user.roles.includes(role);
    }

    return false;
  };

  login = async (creds: LoginModel) => {
    try {
      const user = await agent.Account.login(creds);
      // console.log(user);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      router.navigate("/");
      // store.modalStore.close();
    } catch (error) {
      throw error;
    }
  };

  register = async (creds: LoginModel) => {
    try {
      const user = await agent.Account.register(creds);
      // router.navigate("/login");
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      router.navigate("/");
      // store.modalStore.close();
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
    router.navigate("/");
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };

  //   setImage = (image: string) => {
  //     if (this.user) this.user.image = image;
  //   };

  //   setUserPhoto = (url: string) => {
  //     if (this.user) this.user.image = url;
  //   };

  //   setDisplayName = (name: string) => {
  //     if (this.user) this.user.displayName = name;
  //   };
}
