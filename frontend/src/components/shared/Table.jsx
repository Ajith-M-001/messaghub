/* eslint-disable react/prop-types */
import { Container, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <Container
      sx={{
        height: "100vh",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          padding: "1rem 4rem",
          borderRadius: "1rem",
          margin: "auto",
          width: "100%",
          overflow: "hidden",
          height: "100%",
          boxShadow: "none",
        }}
      >
        <Typography
          variant="h4"
          textAlign={"center"}
          sx={{
            margin: "2rem",
            textTransform: "capitalize",
          }}
        >
          {heading}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          checkboxSelection
          disableSelectionOnClick
          disableHorizontalScroll={true}
          experimentalFeatures={{ newEditingApi: true }}
          style={{
            height: "80%",
          }}
          sx={{
            border: "none",
            ".table-header": {
              bgcolor: "rgba(0,0,0,0.7)",
              color: "rgba(254, 254, 254, 1)",
            },
          }}
        />
      </Paper>
    </Container>
  );
};

export default Table;
