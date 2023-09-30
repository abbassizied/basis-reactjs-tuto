import * as React from "react"; 
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
 
export function UserForm() {
  return (
    <>
      <h1>User Form</h1>

      <TextField id="firstName" label="First Name" variant="standard" />

      <TextField id="lastName" label="Last Name" variant="standard" />

      <TextField id="username" label="User Name" variant="standard" />

      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="role">Role</InputLabel>
        <Select id="role" value="" autoWidth label="Role">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="User">User</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
        </Select>
      </FormControl>

      <TextField id="password" label="Password" variant="standard" />
    </>
  );
}
