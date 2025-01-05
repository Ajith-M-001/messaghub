import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import AvatarCard from "../../components/shared/AvatarCard";
import { dashboardTableData } from "../../components/constants/SampleData";
import { Avatar } from "@mui/material";
import { transformImage } from "../../lib/features";

const UserManagement = () => {
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
    const rowData = dashboardTableData.users.map((user) => ({
      ...user,
      id: user._id,
      avatar: transformImage(user.avatar, 50),
    }));
    setRows(rowData);
  }, []);
  return (
    <AdminLayout>
      <Table heading={"user management"} rows={rows} columns={columns} />
    </AdminLayout>
  );
};

export default UserManagement;
