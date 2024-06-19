import React, { useEffect } from "react";
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
import { Alert, Box, Button, CircularProgress } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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
          Error while deleting the user
        </Alert>
      );
    } else if (deletestatus.message) {
      return <Alert severity="success">{deletestatus.message}</Alert>;
    }
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const handleUpdateUser = async (updatedRow) => {
    const { id, field, value } = updatedRow;
    const user = users.find((user) => user._id === id);
    const updatedUser = { ...user, [field]: value };

    try {
       dispatch(updateUser(id, updatedUser));
      return updatedUser;
    } catch (error) {
      console.error("Failed to update user:", error);
      throw error;
    }
  };

  const columns = [
    { field: "name", headerName: "Name", width: 150, editable: true },
    { field: "email", headerName: "Email", width: 250, editable: true },
    { field: "regId", headerName: "Registration ID", width: 200 },
    { field: "department", headerName: "Department", width: 150, editable: true },
    { field: "qualifications", headerName: "Qualifications", width: 200, editable: true },
    { field: "CurrentlyTeaching", headerName: "Currently Teaching", width: 350, valueGetter: (params) => params.row.classesTeaching.map(cls => cls.name).join(', ') },
    { field: "AdditionalClassesTeaching", headerName: "Additional Classes Teaching", width: 350, valueGetter: (params) => params.row.additionalclassesTeaching.map(cls => cls.name).join(', ') },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button variant="outlined" size="small" startIcon={<Delete />} onClick={() => {
            handleDeleteUser(params.row.id);
            toast("User successfully deleted");
          }}>Delete</Button>
        </Box>
      ),
    },
  ];

  const rows = users && users.map((user) => ({
    id: user._id, // Ensure you have a unique identifier here
    name: user.name,
    email: user.email,
    regId: user.regId,
    department: user.department,
    qualifications: user.qualifications,
    classesTeaching: user.classesTeaching,
    additionalclassesTeaching: user.additionalclassesTeaching,
  })) || [];

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
      {deletestatus.message && <ToastContainer />}
      <DataGrid
        density="comfortable"
        getRowId={(row) => row.id}
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        processRowUpdate={handleUpdateUser}
        onProcessRowUpdateError={(error) => {
          console.error("Update error:", error);
          toast.error("Failed to update user");
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
        }}
      />
    </div>
  );
};

export default UserTable;


