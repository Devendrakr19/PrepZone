import axios from "axios";

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch
};

export default httpService;
