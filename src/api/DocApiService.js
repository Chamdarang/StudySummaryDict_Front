import { apiClient } from "./ApiClient";

export const docSearchApi =
    (query,page,size)=>apiClient.get('/d/s',{params:{query:query,page:page,size:size}})
export const docViewApi =
    (id)=>apiClient.get('/d/v',{params:{id:id}})
export const docEditApi =
    (id)=>apiClient.get('/d/e',{params:{id:id}})
export const docSaveApi =
    (Doc)=>apiClient.post('/d/a',Doc)
export const docDeleteApi =
    (req)=>apiClient.post('/d/d',req)
