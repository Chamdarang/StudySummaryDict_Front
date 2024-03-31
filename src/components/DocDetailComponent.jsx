import { useEffect, useState } from "react";
import "../scss/InfoItem.scss";
import ReactMarkdown from "react-markdown";
import { docViewApi } from "../api/DocApiService";
import { Link, useParams } from "react-router-dom";
import rehypeRaw from "rehype-raw";
import { useAuth } from "../security/AuthContext";
import remarkGfm from "remark-gfm";
export default function DocDetailComponent() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const authContext=useAuth()
  const isAuth=authContext.isAuth
  useEffect(() => initDocDetail(), [id]);
  function initDocDetail() {
    docViewApi(id)
      .then((response) => {
        console.log(response.data.data);
        setTitle(response.data.data.doc.title);
        setContent(response.data.data.doc.content);
      })
      .catch((error) => {
        console.log("?");
      })
      .finally(
        console.log(content) 
      );
  }
  return (
    <div className="mx-auto custom-w-50"> 
        <div className="h-100 bg-white border p-2 text-pre">
            <div className="fs-4 fw-bold mb-4 border-bottom">{title}{isAuth&&<Link to={`/d/e/${id}`} className="btn btn-sm btn-outline-primary ms-3 mb-2" style={{textDecoration: "none"}}>수정</Link>}</div>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
        </div>
    </div>
  );
}
