import React,{useState,useEffect} from 'react'
import { Container, PostForm } from '../component'
import appwriteService from "../appWrite/config";
import { useParams, useNavigate } from 'react-router-dom';
import { addPost } from '../Store/postSlice';
import { useDispatch, useSelector } from 'react-redux';

function EditPost() {
    const [post, setPost]= useState(null)
    const {slug}= useParams()
    const navigate= useNavigate()
    const dispatch= useDispatch();
    // useEffect(()=>{
    //     if(slug){
    //         appwriteService.getPost(slug).then((post)=>{
    //             if(post){
    //                 setPost(post)
    //             }
    //         })
    //     }else{
    //         navigate('/')
    //     }
    // },[slug,navigate])
    //  const post = useSelector((state) =>
    //     state.posts.posts.find((p) => p.$id === slug)
    //   );

  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    
    const existingPost = posts.find((p) => p.$id === slug);

    if (existingPost) {
      setPost(existingPost);
    } else if (slug) {

      appwriteService.getPost(slug).then((fetchedPost) => {
        if (fetchedPost) {
          dispatch(addPost(fetchedPost));   // Save to Redux
          setPost(fetchedPost);             // Save to local state
        } else {
          navigate('/'); // Redirect if not found
        }
      });
    } else {
      navigate('/'); // Invalid slug
    }
  }, [slug, posts, dispatch, navigate]);


  return post? (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : null;
}

export default EditPost
