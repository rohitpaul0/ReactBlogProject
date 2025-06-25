import React from "react";
import appwriteService from "../appWrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  
  return (
    <Link to={`/post/${$id}`}>
      <div className="h-full bg-slate-600 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePriview(featuredImage)}
            alt={title}
            className="rounded-xl content-center h-[38vh] w-full" 
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
