import { apiClient } from "./ApiClient";

export const infoSearchApi =
    (query,page,size)=>apiClient.get('/i/s',{params:{query:query,page:page,size:size}})
export const infoModifyApi =
    (Info)=>apiClient.post('/i/a',Info)
export const infoDeleteApi =
    (id)=>apiClient.post('/i/d',id)
export const quizApi=
    ()=>apiClient.get('/i/r')