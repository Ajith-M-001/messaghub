import AdminLayout from "../../components/layout/AdminLayout";
import { useEffect, useState } from "react";
import Table from "../../components/shared/Table";
import { dashboardTableData } from "../../components/constants/SampleData";
import { Avatar, Box, Stack } from "@mui/material";
import { fileFormat, transformImage } from "../../lib/features";
import AvatarCard from "../../components/shared/AvatarCard";
import moment from "moment";
import RenderAttachment from "../../components/shared/RenderAttachment";

const columns = [
  {
    field: "_id",
    headerName: "ID",
    headerClassName: "table-header",
    flex: 1,
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    flex: 1,
    renderCell: (params) => {
      const { attachments } = params.row;
      console.log(attachments);

      return attachments.length > 0
        ? attachments.map((attachment) => {
            const url = attachment.url;
            const file = fileFormat(url);

            return (
              <Box key={attachment._id}>
                <a
                  href={url}
                  target="_blank"
                  download
                  style={{ color: "black" }}
                >
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })
        : "No Attachments";
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    flex: 1,
  },
  {
    field: "sender",
    headerName: "Send By",
    headerClassName: "table-header",
    flex: 1,
    renderCell: (params) => (
      console.log(params),
      (
        <Stack>
          <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
          <span>{params.row.sender.name}</span>
        </Stack>
      )
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    flex: 1,
  },
  {
    field: "groupschats",
    headerName: "Groups Chat",
    headerClassName: "table-header",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    headerClassName: "table-header",
    flex: 1,
  },
];
const MessageManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const rowData = dashboardTableData.messages.map((message) => ({
      ...message,
      id: message._id,
      sender: {
        name: message.sender.name,
        avatar: transformImage(message.sender.avatar, 50),
      },
      createdAt: moment(message.createdAt).format("YYYY-MM-DD"),
    }));

    setRows(rowData);
  }, []);
  return (
    <AdminLayout>
      <Table heading={"All Messages"} rowHeight={100} rows={rows} columns={columns} />
    </AdminLayout>
  );
};

export default MessageManagement;
