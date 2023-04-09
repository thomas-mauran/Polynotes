import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import { Link } from "react-router-dom";
import noPhoto from "../../assets/png/no-photo.png";
import { RecentDocuments } from "../../types/APIResponseTypes";
import ScheduleIcon from '@mui/icons-material/Schedule';

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
          const lastUpdateDate = new Date(doc.updatedAt).toLocaleDateString();
          const createdAtDate = new Date(doc.createdAt).toLocaleDateString();
          const link = `/page/${doc._id}`;
          let title = doc.title ? doc.title : "Untitled";
          if(title.length > 20){
            title = title.substring(0, 20) + "..."
          }
          return (
            <Link to={link} key={doc._id}>
              <Card sx={{ margin: "10px 20px", minWidth: "250px", height: "300px" }}>
                <CardContent>
                  <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: "bold" }}>
                    {title}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    {doc.thumbnailSrc == null ? (
                      <img src={noPhoto} alt="no thumbnail" style={{ maxHeight: "150px", maxWidth: "100%", width: "120px"}} />
                    ) : (
                      <img src={doc.thumbnailSrc as string} alt="thumbnail of the document" style={{ maxWidth: "100%", maxHeight: "150px" }} />
                    )}
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "row", bottom: "0px", marginTop: "10px" }}>
                    <UpdateIcon />
                    <Typography variant="body2" color="text.secondary" margin="0px 0px 0px 15px">
                      Last Update {lastUpdateDate}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "row", bottom: "0px", marginTop: "10px" }}>
                    <ScheduleIcon />
                    <Typography variant="body2" color="text.secondary" margin="0px 0px 0px 15px">
                      Created at {createdAtDate}
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
