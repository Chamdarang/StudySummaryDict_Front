import { apiClient } from "./ApiClient";

export const searchApi =
    (query,page,size)=>apiClient.get('/s',{params:{query:query,page:page,size:size}})
export const infoModifyApi =
    (Info)=>apiClient.post('/a',Info)
export const infoDeleteApi =
    (id)=>apiClient.post('/d',id)
