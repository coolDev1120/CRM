import { Box, Typography } from "@mui/material";

const Description = ({ title, subTitle }) => {
  return (
    <Box>
      <Typography fontWeight={"bold"} fontSize={14}>
        {title}
      </Typography>
      <Typography fontSize={12}>{subTitle}</Typography>
    </Box>
  );
};

export default Description;
