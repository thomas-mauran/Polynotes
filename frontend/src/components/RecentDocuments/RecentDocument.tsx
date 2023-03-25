import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import { Link } from "react-router-dom";
import noPhoto from "../../assets/png/no-photo.png";
import { RecentDocuments } from "../../types/APIResponseTypes";

interface Props {
  documents: RecentDocuments[];
}

export default function RecentDocument(props: Props) {
  const { documents } = props;

  return (
    <Box>
      <Typography variant="h5" color="text.primary" gutterBottom sx={{ fontWeight: "bold" }}>
        Recent Documents
      </Typography>
      <br />
      <Divider />
      <Box sx={{ display: "flex", flexDirection: "row", width: "100%", overflowX: "auto" }}>
        {documents.map((doc) => {
          const date = new Date(doc.updatedAt).toLocaleDateString();
          const link = `/page/${doc._id}`;
          return (
            <Link to={link} key={doc._id}>
              <Card sx={{ margin: "10px 20px", minWidth: "150px", height: "250px" }}>
                <CardContent>
                  <Typography variant="h5" color="text.primary" gutterBottom sx={{ fontWeight: "bold" }}>
                    {doc.title}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    {doc.thumbnailSrc == null ? (
                      <img src={noPhoto} alt="no thumbnail" style={{ width: "70%", maxHeight: "150px" }} />
                    ) : (
                      <img src={doc.thumbnailSrc as string} alt="thumbnail of the document" style={{ maxWidth: "60%", maxHeight: "150px" }} />
                    )}
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "row", bottom: "0px", marginTop: "10px" }}>
                    <UpdateIcon />
                    <Typography variant="body2" color="text.secondary" margin="0px 0px 0px 15px">
                      Last Update {date}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
}
