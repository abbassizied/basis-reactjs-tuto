// import axios from 'axios';
import api from "../Helper/Api";

const POST_API = "/posts";

const getAll = () => {
  console.log("calling posts endpoint ...");
  return api.get(POST_API /* { headers: authHeader() } */).catch((error) => {
    console.log(error.response);
  });
};

const getOneById = (id) => {
  console.log("calling posts endpoint ...");
  return api
    .get(POST_API + "/" + id /* { headers: authHeader() }*/)
    .catch((error) => {
      console.log(error.response);
    });
};

const create = (post) => {
  return api
    .post(POST_API, post /* { headers: authHeader() }*/)
    .catch((error) => {
      console.log(error.response);
    });
};

const update = (id, post) => {
  return api
    .put(POST_API + "/" + id, post /*{ headers: authHeader() }*/)
    .catch((error) => {
      console.log(error.response);
    });
};

const remove = (id) => {
  return api
    .delete(POST_API + "/" + id /* { headers: authHeader() }*/)
    .catch((error) => {
      console.log(error.response);
    });
};

const removeAll = () => {
  return api.delete(POST_API /*{ headers: authHeader() }*/);
};

const findByTitle = (title) => {
  return api.get(POST_API + "/" + title, title /* { headers: authHeader() }*/);
};

const PostService = {
  getAll,
  getOneById,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default PostService;
