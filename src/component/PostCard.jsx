import React from "react";
import appwriteService from "../appWrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  
  return (
    <Link to={`/post/${$id}`}>
      <div className="h-full bg-gray-500 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePriview(featuredImage)}
            alt={title}
            className="rounded-xl content-center" 
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
