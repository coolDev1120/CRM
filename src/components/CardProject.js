import {
  Box,
  Card,
  CardContent,
  CardHeader,
  styled,
  Typography,
} from "@mui/material";

import ZoomOutMapSharpIcon from "@mui/icons-material/ZoomOutMapSharp";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import ControlCameraOutlinedIcon from "@mui/icons-material/ControlCameraOutlined";
import { ReactNode } from "react";

const ActionWrapper = styled(Box) (({ theme }) => ({
  display: "flex",
  "& svg": {
    marginRight: "10px",
    cursor: "pointer",
  },
  "& svg:last-child": {
    marginRight: 0,
  },
}));

const CardProject = ({ title, children, full }) => {
  return (
    <Card sx={{ minWidth: 520, width: `${full ? 100 : 100}%` }}>
      <Box
        sx={{
          padding: "10px 20px",
          backgroundColor: "#E6F1F3",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        display="flex"
      >
        <Typography variant="h6" fontWeight={"bold"}>
          {title}
        </Typography>
        <ActionWrapper>
          <ControlCameraOutlinedIcon />
          <RemoveOutlinedIcon />
          <ZoomOutMapSharpIcon />
        </ActionWrapper>
      </Box>
      <CardContent sx={{ minHeight: 300 }}>{children}</CardContent>
    </Card>
  );
};

export default CardProject;
