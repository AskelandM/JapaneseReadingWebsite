import { Box, CircularProgress, Typography } from "@mui/material";

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        size={props.size}
        color={
          props.value < 25 ? "error" : props.value < 75 ? "warning" : "success"
        }
        variant="determinate"
        value={props.value}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
          fontSize={props.fontSize}
        >
          {Math.round(props.value)}
        </Typography>
      </Box>
    </Box>
  );
}

export default CircularProgressWithLabel;
