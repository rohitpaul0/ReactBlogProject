import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Select, RTE } from "../index";
import appWriteService from "../../appWrite/config";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPost, updatePost } from "../../Store/postSlice";
import imageCompression from "browser-image-compression";
import { setLoading } from "../../Store/postSlice";

export default function PostForm({ post }) {
  const loading = useSelector((state) => state.posts.loading);
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [imagePreview, setImagePreview] = useState(
    post ? appWriteService.getFilePriview(post.featuredImage) : null
  );

  const submit = async (data) => {
    dispatch(setLoading(true));
    try {
      if (post) {
        const noChange =
          data.title === post.title &&
          data.slug === post.slug &&
          data.content === post.content &&
          data.status === post.status &&
          !data.image?.[0];
        if (noChange) {
          dispatch(setLoading(false));
          navigate("/");
          return;
        }
        const file = data.image?.[0];
        let uploadFile = null;

        if (file) {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          };
          const compressedFile = await imageCompression(file, options);
          const finalFile = new File([compressedFile], file.name, {
            type: compressedFile.type,
          });
          uploadFile = await appWriteService.uploadFile(finalFile);
          if (uploadFile) {
            await appWriteService.deleteFile(post.featuredImage);
          }
        }

        const dbPost = await appWriteService.updatePost(post.$id, {
          ...data,
          featuredImage: uploadFile ? uploadFile.$id : post.featuredImage,
        });
        if (dbPost) {
          dispatch(updatePost(dbPost));
          dispatch(setLoading(false));
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const image = data.image[0];
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(image, options);
        const finalFile = new File([compressedFile], image.name, {
          type: compressedFile.type,
        });
        const file = await appWriteService.uploadFile(finalFile);

        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          const dbPost = await appWriteService.createPost({
            ...data,
            userId: userData.$id,
          });
          if (dbPost) {
            dispatch(addPost(dbPost));
            dispatch(setLoading(false));
            navigate("/");
          }
        }
      }
    } catch (error) {
      // console.error("Submittion Error:", error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [slugTransform, watch, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4 file:mr-4 file:py-0.5 file:px-5 file:rounded-md file:border-1 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", {
            required: !post,
            onChange: (e) => {
              const file = e.target.files[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setImagePreview(url);
              }
            },
          })}
        />
        {imagePreview && (
          <div className="w-full mb-4">
            <img src={imagePreview} className="rounded-lg" />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post
            ? loading
              ? "Updating"
              : "Update"
            : loading
            ? "Submitting"
            : "Submit"}
        </Button>
      </div>
    </form>
  );
}
