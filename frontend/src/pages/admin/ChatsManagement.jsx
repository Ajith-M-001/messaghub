import AdminLayout from "../../components/layout/AdminLayout";
import { useEffect, useState } from "react";
import Table from "../../components/shared/Table";
import { dashboardTableData } from "../../components/constants/SampleData";
import { Avatar, Stack } from "@mui/material";
import { transformImage } from "../../lib/features";
import AvatarCard from "../../components/shared/AvatarCard";

const ChatsManagement = () => {
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
        (<AvatarCard max={100} avatar={params.row.avatar} />)
      ),
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "table-header",
      flex: 1,
    },
    {
      field: "totalmembers",
      headerName: "Total Members",
      headerClassName: "table-header",
      flex: 1,
    },
    {
      field: "members",
      headerName: "Members",
      headerClassName: "table-header",
      flex: 1,
      renderCell: (params) => (
        console.log(params),
        (<AvatarCard max={100} avatar={params.row.members} />)
      ),
    },
    {
      field: "totalmessages",
      headerName: "Total Messages",
      headerClassName: "table-header",
      flex: 1,
    },
    {
      field: "creator",
      headerName: "Created By",
      headerClassName: "table-header",
      flex: 1,
      renderCell: (params) => (
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Avatar
            alt={params.row.creator.name}
            src={params.row.creator.avatar}
          />
          <span>{params.row.creator.name}</span>
        </Stack>
      ),
    },
  ];

  useEffect(() => {
    const rowData = dashboardTableData.chats.map((chat) => ({
      ...chat,
      id: chat._id,
      avatar: chat.avatar.map((avatar) => transformImage(avatar, 50)),
      members: chat.members.map((member) => transformImage(member.avatar, 50)),
      creator: {
        name: chat.creator.name,
        avatar: transformImage(chat.creator.avatar, 50),
      }
    }));
    setRows(rowData);
  }, []);
  return (
    <AdminLayout>
      <Table heading={"All Chats"} rows={rows} columns={columns} />
    </AdminLayout>
  );
};

export default ChatsManagement;
