import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Employee } from "../models/employee";
import { LoginModel, UserModel } from "../models/userModel";
import { WaitingNumber } from "../models/waitingNumber";
import { router } from "../router/Routes";
// import { Activity, ActivityFormValues } from '../models/employee';
// import { PaginatedResult } from '../models/pagination';
// import { Photo, Profile, UserActivity } from '../models/profile';
// import { User, UserFormValues } from '../models/user';
// import { router } from '../router/Routes';
import { store } from "../stores/store";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "https://localhost:7236/api";
// axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) {
    // works only with axios 1.2.0 so I locked it
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    // if (process.env.NODE_ENV === "development") await sleep(1000);
    // const pagination = response.headers["pagination"];
    // if (pagination) {
    //   response.data = new PaginatedResult(
    //     response.data,
    //     JSON.parse(pagination)
    //   );
    //   return response as AxiosResponse<PaginatedResult<any>>;
    // }
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        // toast.error("bad-request");
        // if (config.method === "get" && data.errors.hasOwnProperty("id")) {
        //   // router.navigate("/not-found");
        // }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        // toast.error("unauthorised");
        // router.navigate("/unauthorized");
        break;
      case 403:
        toast.error("forbidden");
        router.navigate("/forbidden");
        break;
      case 404:
        toast.error("not-found");
        router.navigate("/not-found");
        break;
      case 500:
        toast.error("server-error");
        router.navigate("/server-error");

        // store.commonStore.setServerError(data);
        // router.navigate("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const WaitingNumbers = {
  list: () => requests.get<WaitingNumber[]>(`/WaitingNumbers`),
  todaysList: () =>
    requests.get<WaitingNumber[]>(`/WaitingNumbers/GetForToday`),
  details: (id: string | undefined) =>
    requests.get<WaitingNumber>(`/WaitingNumbers/${id}`),
  create: (model: WaitingNumber) =>
    requests.post<WaitingNumber>(`/WaitingNumbers`, model),
  update: (model: WaitingNumber) =>
    requests.put<WaitingNumber>(`/WaitingNumbers/${model.id}`, model),
  delete: (id: number) => requests.del<void>(`/WaitingNumbers/${id}`),
  getItemByUserIdForToday: (userId: string) =>
    requests.get<WaitingNumber>(
      `/WaitingNumbers/GetForTodayAndUserId/${userId}`
    ),
  getLast: () => requests.get<WaitingNumber>(`/WaitingNumbers/getlast`),
};

const Employees = {
  list: () => requests.get<Employee[]>(`/employees`),
  details: (id: string | undefined) =>
    requests.get<Employee>(`/employees/${id}`),
  create: (model: Employee) => requests.post<Employee>(`/employees`, model),
  update: (model: Employee) =>
    requests.put<Employee>(`/employees/${model.id}`, model),
  delete: (id: string) => requests.del<void>(`/employees/${id}`),
};

// const Employees = {
//   list: (params: URLSearchParams) =>
//     axios
//       .get<PaginatedResult<Activity[]>>("/activities", { params })
//       .then(responseBody),
//   details: (id: string) => requests.get<Activity>(`/activities/${id}`),
//   create: (activity: ActivityFormValues) =>
//     requests.post<void>(`/activities`, activity),
//   update: (activity: ActivityFormValues) =>
//     requests.put<void>(`/activities/${activity.id}`, activity),
//   delete: (id: string) => requests.del<void>(`/activities/${id}`),
//   attend: (id: string) => requests.post<void>(`/activities/${id}/attend`, {}),
// };

const Account = {
  current: () => requests.get<UserModel>("/account"),
  login: (user: LoginModel) => requests.post<UserModel>("/account/login", user),
  register: (user: LoginModel) =>
    requests.post<UserModel>("/account/register", user),
};

const agent = {
  Employees,
  Account,
  WaitingNumbers,
};

export default agent;
