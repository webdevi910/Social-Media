import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ILocation } from "../../redux/post-creating";

interface ICurrentlyLocationProps{
  currentLocation:ILocation
}

const CurrentlyLocation: FC<ICurrentlyLocationProps> = (props) => {

  const {currentLocation} = props;

  return (
    <>
      <Typography
        sx={[
          (theme) => ({
            color: theme.palette.surface.onSurface,
            fontWeight: 700,
          }),
        ]}
        variant="h5"
      >
        Currently Selected
      </Typography>
      <Stack
        sx={{ marginTop: 3 }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row">
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              height: 48,
              width: 48,
              bgcolor: "background.main",
              borderRadius: "100%",
            }}
          >
            <GpsFixedIcon />
          </Stack>
          <Stack justifyContent="center" sx={{ marginLeft: "12px" }}>
            <Typography
              variant="subtitle1"
              sx={[
                (theme) => ({
                  color: theme.palette.surface.onSurface,
                  fontWeight: 500,
                  marginBottom: 0.5,
                }),
              ]}
            >
              {currentLocation.mainName}
            </Typography>
          </Stack>
        </Stack>

        <CancelOutlinedIcon />
      </Stack>
    </>
  );
};

export default CurrentlyLocation;
