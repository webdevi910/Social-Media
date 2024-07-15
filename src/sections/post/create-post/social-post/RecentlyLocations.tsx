import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ILocation } from "../../redux/post-creating";

interface ISearchResultsProps {
  locations: ILocation[];
}

const RecentlyLocations: FC<ISearchResultsProps> = (props) => {
  const { locations } = props;

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
        Recents Places
      </Typography>
      {locations.map((location) => (
        <Stack
          key={location.id}
          sx={{ marginTop: 3 }}
          direction="row"
          justifyContent="space-between"
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
              <LocationOnOutlinedIcon />
            </Stack>
            <Box sx={{ marginLeft: "12px" }}>
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
                {location.mainName}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={[
                  (theme) => ({
                    color: theme.palette.surface.onSurface,
                    fontWeight: 400,
                    fontSize: 14,
                    marginBottom: 0.5,
                  }),
                ]}
              >
                {location.detailName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 300,
                  lineHeight: "17px",
                  color: (theme) => theme.palette.surface.onSurfaceVariantD,
                }}
              >
                {location.countUsed}
              </Typography>
            </Box>
          </Stack>

          <MoreVertIcon />
        </Stack>
      ))}
    </>
  );
};

export default RecentlyLocations;
