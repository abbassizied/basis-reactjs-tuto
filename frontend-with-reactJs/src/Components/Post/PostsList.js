import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import PostService from "../../Services/PostService";





export function PostsList() {
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //Runs on the first render
    //And any time any dependency value changes
    console.log('Something happened');
    console.log('Post Array have changed');
    loadPosts();
  },[]); // <------ problem here must be redenred

  

  const deletePost = async (id) => {
    await PostService.remove(id);
    loadPosts();
  };

  const loadPosts = async () => {
    await PostService.getAll()
      .then(function (response) {
        // handle success
        console.log(response);
        setPosts(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  return (
    <>
      <h2>All Posts 📫</h2>

      <table className="table" style={{ height: "100%", width: "100%" }}>
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">title</th>
            <th scope="col">author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.id}>
              <th scope="row">{index + 1}</th>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/posts/view-post/" + post.id)}
                  >
                    View
                  </Button>
                  {/* <Link className="btn btn-outline-primary mr-2" to={`./edituser/${user.id}`}>Edit</Link> */}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate("/posts/edit-post/" + post.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deletePost(post.id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
