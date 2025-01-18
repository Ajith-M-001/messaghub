import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { transformImage } from "../../lib/features";
import { useUserManagementQuery } from "../../redux/api/adminApi/adminapi";

const UserManagement = () => {
  const { data } = useUserManagementQuery();
  const [rows, setRows] = useState([]);
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      headerClassName: "table-header",
      flex: 1,
    },
    {
      field: "avatar",
      headerName: "Avatar",
      headerClassName: "table-header",
      flex: 1,
      renderCell: (params) => (
        console.log(params),
        (<Avatar alt={params.row.name} src={params.row.avatar} />)
      ),
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "table-header",
      flex: 1,
    },
    {
      field: "username",
      headerName: "Username",
      headerClassName: "table-header",
      flex: 1,
    },
    {
      field: "friends",
      headerName: "Friends",
      headerClassName: "table-header",
      flex: 1,
    },
    {
      field: "groups",
      headerName: "Groups",
      headerClassName: "table-header",
      flex: 1,
    },
  ];

  useEffect(() => {
    const rowData = data?.users.map((user) => ({
      ...user,
      id: user._id,
      avatar: transformImage(user.avatar, 50),
    }));
    setRows(rowData);
  }, [data]);
  return (
    <AdminLayout>
      <Table heading={"user management"} rows={rows} columns={columns} />
    </AdminLayout>
  );
};

export default UserManagement;
