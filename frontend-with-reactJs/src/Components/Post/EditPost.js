import { useImmer } from "use-immer";
import { Formik } from "formik";

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import PostService from "../../Services/PostService";

export function EditPost() {
  const navigate = useNavigate();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState("");

  const { id } = useParams();
  const [post, updatePost] = useImmer({
    title: "",
    author: "",
  });

  function handleTitleChange(e) {
    updatePost((draft) => {
      draft.title = e.target.value;
    });
  }

  function handleAuthorChange(e) {
    updatePost((draft) => {
      draft.author = e.target.value;
    });
  }

  const loadUser = async () => {
    const result = await PostService.getOneById(id);
    updatePost(result.data);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          endIcon={<ArrowBackIcon />}
          onClick={() => navigate("/posts")}
        >
          back
        </Button>
      </Stack>

      <h1>Edit Post</h1>

      {isSuccess ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert
            variant="filled"
            onClose={() => {
              setIsSuccess(false);
            }}
          >
            This is a success alert — check it out!
          </Alert>
        </Stack>
      ) : (
        <></>
      )}

      {isError ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert
            severity="error"
            onClose={() => {
              setIsError(false);
            }}
          >
            {ErrorMsg}
          </Alert>
        </Stack>
      ) : (
        <></>
      )}

      <Formik
        const
        initialValues={{ title: "", author: "" }}
        onSubmit={(values) => {
          PostService.update(id, post)
            .then(function (response) {
              console.log(response);
              setIsSuccess(true);
            })
            .catch(function (error) {
              console.log(error);
              setIsError(true);
              setErrorMsg(error);
            });
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="title"
              value={post.title}
              onChange={handleTitleChange}
            />
            <TextField
              fullWidth
              id="author"
              name="author"
              label="author"
              type="author"
              value={post.author}
              onChange={handleAuthorChange}
            />

            <Button color="primary" variant="contained" fullWidth type="submit">
              Update Post
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
}
