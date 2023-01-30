import { makeAutoObservable } from "mobx";

interface Modal {
  open: boolean;
  body: JSX.Element | null;
  title: string | null;
}

export default class ModalStore {
  modal: Modal = {
    open: false,
    body: null,
    title: null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  open = (content: JSX.Element, title: string = "") => {
    this.modal.open = true;
    this.modal.body = content;
    this.modal.title = title;
  };

  close = () => {
    this.modal.open = false;
    this.modal.body = null;
    this.modal.title = null;
  };
}
