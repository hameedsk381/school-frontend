import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { deleteUser, getAllUsers, updateUser } from "../actions/userActions";
import {
  Alert,
  Box,
  Button,
  CircularProgress,

  TextField,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const EditCell = ({ value: initialValue, rowId, field, onSubmit }) => {
  const [value, setValue] = useState(initialValue);
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(rowId, field, value);
  };
  const handleInputChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField value={value} onChange={handleInputChange} autoFocus />
    </form>
  );
};

const UserTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
   
  }, [dispatch]);

  const allusers = useSelector((state) => state.getAllUsersReducer);
  const { loading, error, users } = allusers;
  const deletestatus = useSelector((state) => state.deleteUserReducer);

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
   
    if (deletestatus.loading) {
      return <CircularProgress />;
    } else if (deletestatus.error) {
      return (
        <Alert variant="filled" severity="error">
          Error while deleting the user"
        </Alert>
      );
    } else if (deletestatus.message) {
      return <Alert severity="success">{deletestatus.message}</Alert>;
    }
    setInterval(() => {
      window.location.reload();
    }, 3000);
  };

  const handleUpdateUser = (id, field, value) => {
    const user = users.find((user) => user.regId === id);
    const updatedUser = { ...user, [field]: value };
    dispatch(updateUser(id, updatedUser));
  };

  const columns = [
    { field: "name", headerName: "Name", width: 150, editable: true },
    { field: "email", headerName: "Email", width: 250, editable: true },
    { field: "regId", headerName: "Registration ID", width: 200 },
    { field: "expertise", headerName: "Expertise", width: 400,editable:true },
    { field: "CurrentlyTeaching", headerName: "Currently teaching", width: 350,editable:true },
    {
      field: "department",
      headerName: "Department",
      width: 150,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
       
          <Button variant="outlined" size="small" startIcon={<Delete/>} onClick={() => {
            handleDeleteUser(params.row.regId);
            toast("User succesfully deleted");
          }}>Delete</Button>
         
        </Box>
      ),
    },
  ];

  const rows = users.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    regId: user.regId,
    department: user.department,
    expertise:user.expertise,
    CurrentlyTeaching:user.currentlyTeaching
  }));

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Alert variant="outlined" severity="error">
        {error}
      </Alert>
    );
  }

  return (
    <div style={{ height: 500, width: "100%" }}>
    {deletestatus.message && <ToastContainer/>}
      <DataGrid density="comfortable"
        getRowId={(row) => row.regId}
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        editMode="cell"
        onEditCellChangeCommitted={(params, event) => {
          handleUpdateUser(params.row.regId, params.field, params.props.value);
        }}
        components={{
          Toolbar: () => (
            <GridToolbarContainer>
              <GridToolbarColumnsButton />
              <GridToolbarFilterButton />
              <GridToolbarDensitySelector />
              <GridToolbarExport />
              <Link to="/register">
                <Button variant="outlined" color="primary" size="small">
                  Add User
                </Button>
              </Link>
            </GridToolbarContainer>
          ),
          EditCell,
        }}
      />
    </div>
  );
};

export default UserTable;
