import axios from "axios";

const API_URL =
  "https://magiclab-twitter-interview.herokuapp.com/daniele-bolla";

const apiService = axios.create({
  baseURL: API_URL
});

const isHandlerEnabled = (config = {}) => {
  return config.handlerEnabled && !config.handlerEnabled ? false : true;
};

const errorHandler = error => {
  if (isHandlerEnabled(error.config)) {
    // Handle errors
  }
  return Promise.reject({ ...error });
};

const successHandler = response => {
  if (isHandlerEnabled(response.config)) {
    // Handle responses
  }
  return response;
};

apiService.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
);

export default apiService;
