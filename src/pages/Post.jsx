import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appWrite/config";
import { Container, Button } from "../component";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { deletepost } from "../Store/postSlice";

export default function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const post = useSelector((state) =>
    state.posts.posts.find((p) => p.$id === slug)
  );

  const [loading, setLoading] = useState(!post);

  const isAuthor = post && userData ? post.userId === userData.$id : false;
  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    if (!post) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [slug, post, navigate]);

  const deletePost = () => {
    setLoading(true)
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
         dispatch(deletepost(post.$id))
        navigate("/");
        setLoading(false)
      }
    });
  };

  if (loading || !post) return null;

  return post ? (
    <div className="py-8 min-h-[80vh]">
      <Container>
        <div className="w-full md:w-[80%] lg:w-[64%] mx-auto flex justify-center mb-4 relative  rounded-xl p-2">
          <img
            src={appwriteService.getFilePriview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl w-full h-full"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3 rounded-lg px-6 hover:bg-green-600">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" className="rounded-lg px-6 hover:bg-red-600" onClick={deletePost}>
                {loading ? "Deleting":"Delete"}
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold text-white">{post.title}</h1>
        </div>
        <div className="browser-css text-white">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
