import axios from "axios";

export const apiClient= axios.create(
    {
        //baseURL:"http://localhost:2230"
        baseURL:"http://52.78.211.134:2230"
    }
)