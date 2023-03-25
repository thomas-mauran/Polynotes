import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import { Link } from "react-router-dom";
import noPhoto from "../../assets/png/no-photo.png";
import { RecentDocuments } from "../../types/APIResponseTypes";

interface Props {
  documents: RecentDocuments[];
}

export default function FileExplorer(props: Props) {
  const { documents } = props;

  return (
    <Box>
      <Typography variant="h5" color="text.primary" gutterBottom sx={{ fontWeight: "bold" }}>
        File explorer
      </Typography>
    </Box>
  );
}
