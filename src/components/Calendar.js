import { Box, Typography } from "@mui/material";

const CalendarEvent = () => {
  return (
    <Box
      display="flex"
      width={50}
      height={50}
      sx={{ flexDirection: "column", border: "1px solid black" }}
    >
      <Typography textAlign={"center"}>28</Typography>
      <Typography
        textAlign={"center"}
        color="white"
        sx={{ backgroundColor: "#F90932" }}
      >
        Apr
      </Typography>
    </Box>
  );
};

export default CalendarEvent;
