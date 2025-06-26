import React from "react";
import appwriteService from "../appWrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  
  return (
    <Link to={`/post/${$id}`}>
      <div className=" w-full h-full flex flex-col bg-slate-600 rounded-xl overflow-hidden">
        <div className="w-full h-full justify-center mb-2">
          <img
            src={appwriteService.getFilePriview(featuredImage)}
            alt={title}
            className="content-center h-full w-full object-cover rounded-t-xl" 
          />
        </div>
        <h2 className="text-xl text-white font-bold py-3">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
