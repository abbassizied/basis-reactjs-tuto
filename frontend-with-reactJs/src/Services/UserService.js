// User Data service
  
import api from "../Helper/Api";

const User_API =  "/users";

const getAll = () => {
    return api.get(User_API);
  };
  
  const getOneById = id => {
    return api.get(User_API + '/' + id);
  };
  
  const create = user => {
    return api.post(User_API, user);
  };
  
  const update = (id, user) => {
    return api.put(User_API + '/' + id, user);
  };
  
  const remove = id => {
    return api.delete(User_API + '/' + id);
  };
  
  const removeAll = () => {
    return api.delete(User_API);
  };
 
  const UserService = {
    getAll,
    getOneById,
    create,
    update,
    remove,
    removeAll, 
  };
  
  export default UserService;