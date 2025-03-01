import { AxiosRequestConfig } from "axios";
import { getToken } from "../utils/getToken";

export const requestConfigWithMultipartFormDataAndAuthToken: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "multipart/form-data",
  },
};


export const requestConfigWithAuthToken:AxiosRequestConfig = {
  headers:{
    Authorization:`Bearer ${getToken()}`,
    "Content-Type":"application/json"
  }
}
