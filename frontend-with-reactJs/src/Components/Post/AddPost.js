import * as React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { Formik } from "formik"; 
import { useState } from "react";

import PostService from "../../Services/PostService";

export function AddPost() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState("");

  if (isSuccess) {
    return (
      <>
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
      </>
    );
  }

  if (isError) {
    return (
      <>
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
      </>
    );
  }

  return (
    <>
      <h1>Add Post</h1>
      <Formik
        const
        initialValues={{ title: "", author: "" }}
        onSubmit={(values) => {
          PostService.create({ title, author })
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
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              fullWidth
              id="author"
              name="author"
              label="author"
              type="author"
              onChange={(e) => setAuthor(e.target.value)}
            />

            <Button color="primary" variant="contained" fullWidth type="submit">
              New Post
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
}
