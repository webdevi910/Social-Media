import {
  Box,
  Button,
  ButtonBase,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { BottomSheet } from "react-spring-bottom-sheet";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import { ILocation, selectLocation } from "../../redux/post-creating";
import { useAppDispatch } from "../../redux/store";

interface ISearchResultsProps {
  locations: ILocation[];
  clicked: () => void;
}

const SearchResults: FC<ISearchResultsProps> = (props) => {
  const { locations, clicked } = props;
  const [openBottomSheet, setOpenBottomSheet] = useState<boolean>(false);
  const dispatch = useAppDispatch();

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
        Search Results
      </Typography>
      {locations.map((location) => (
        <div
          onClick={() => {
            dispatch(selectLocation(location));
            clicked();
          }}
          key={location.id}
        >
          <Stack
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
            <IconButton
              sx={{ width: 24, height: 24 }}
              onClick={() => setOpenBottomSheet(true)}
            >
              <MoreVertIcon />
            </IconButton>
          </Stack>
        </div>
      ))}

      <BottomSheet
        open={openBottomSheet}
        onDismiss={() => setOpenBottomSheet(false)}
        snapPoints={({ minHeight }) => [minHeight, minHeight]}
      >
        <Stack spacing={3} sx={{ padding: 2 }}>
          <Stack spacing={1} direction="row" alignItems="center">
            <DeleteOutlineOutlinedIcon />
            <Typography
              variant="body2"
              sx={[
                (theme) => ({
                  color: theme.palette.surface.onSurface,
                  fontWeight: 300,
                }),
              ]}
            >
              Remove
            </Typography>
          </Stack>
          <Stack spacing={1} direction="row" alignItems="center">
            <FlagOutlinedIcon />
            <Typography
              variant="body2"
              sx={[
                (theme) => ({
                  color: theme.palette.surface.onSurface,
                  fontWeight: 300,
                }),
              ]}
            >
              Report
            </Typography>
          </Stack>
        </Stack>
      </BottomSheet>
    </>
  );
};

export default SearchResults;
