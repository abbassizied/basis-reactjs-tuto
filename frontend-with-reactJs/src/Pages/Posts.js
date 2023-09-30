import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { AddPost } from "../Components/Post/AddPost";
 import { PostsList } from "../Components/Post/PostsList";

export function Posts() {
  return (
    <>
      <h2>List Of Posts</h2>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={4}>
            <AddPost />
          </Grid>
          <Grid xs={8}>
              <PostsList />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
