import { Grid2, Skeleton, Stack } from "@mui/material";

export const MUILayoutCircularLoader = () => {
  return (
    <Grid2 container spacing={"1rem"} sx={{ height: "calc(100vh - 4rem)" }}>
      <Grid2
        size={{ sm: 4, md: 3 }}
        sx={{ display: { xs: "none", sm: "block" } }}
        height={"100%"}
      >
        <Skeleton variant="rectangular" height="100vh" />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 8, md: 5, lg: 6 }} height={"100%"}>
        <Stack spacing={1}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={"5rem"} />
          ))}
        </Stack>
      </Grid2>
      <Grid2
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
        size={{ md: 4, lg: 3 }}
        height={"100%"}
      >
        <Skeleton variant="rectangular" height="100vh" />
      </Grid2>
    </Grid2>
  );
};