import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PostService from "../../Services/PostService";

export function ViewPost() {
  let { id } = useParams();
  const [post, setPost] = useState({
    img: { url: "", alt: "" },
    title: "",
    author: "",
  });

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    const res = await PostService.getOneById(id).catch((error) => {
      if (!error.response) {
        // network error
        this.errorStatus = "Error: Network Error";
      } else {
        this.errorStatus = error.response.data.message;
      }
    });
    setPost(res.data);
  };

  return (
    <>
      <Link className="btn btn-primary" to="/posts">
        back
      </Link>
      <h1>User Id: {id}</h1>
      <hr />
      <ul>
        <li>name: {post.title}</li>
        <li>user name: {post.author}</li>
      </ul>
      {console.log("image url : ")}
      {console.log(post.img.url)}
      <img height="200" width="300" src={post.img.url} alt={post.img.alt} />
    </>
  );
}
