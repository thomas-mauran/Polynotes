import { Alert, Box, Card, CardContent, Container, Snackbar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { getRecentPages } from "../../utils/pages/pagesAPICalls";
import UpdateIcon from "@mui/icons-material/Update";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import { BlockType } from "../../types/PageTypes";

export default function WorkspaceView() {
  const [documents, setDocuments] = useState([]);
  const [errorAPIList, setErrorAPIList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRecentPages();
      console.log(response);
      if (response.code != 200) {
        setErrorAPIList(response.message);
      } else {
        // Store the jwt

        setDocuments(response.data);
        console.log(documents);
      }
    };

    fetchData();
  }, []);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    } else {
      setErrorAPIList([]);
    }
  };
  const findTitle = (blockList: BlockType[]) => {
    for (const block of blockList) {
      if (block.type === "h1") {
        let tempElement = document.createElement("div");
        tempElement.innerHTML = block.html as string;
        const text = tempElement.firstChild?.textContent;
        return text;
      }
    }
  };

  return (
    <Container>
      <h1>Workspace</h1>
      <Box sx={{ display: "flex", flexDirection: "row", width: "100%", overflowX: "auto" }}>
        {documents.map((doc, index) => {
          const date = new Date(doc.updatedAt).toLocaleDateString();
          const link = `/page/${doc._id}`;
          const title = findTitle(doc.blocks) ?? "No title";
          return (
            <Link to={link}>
              <Card sx={{ margin: "10px 20px", minWidth: "200px" }} key={doc._id}>
                <CardContent>
                  <Typography variant="h5" color="text.primary" gutterBottom>
                    {title}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
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

      <Snackbar open={errorAPIList?.length > 0} onClose={handleClose}>
        <div>
          {errorAPIList?.map((errorMsg, index) => (
            <Alert key={index} severity="error" onClose={handleClose}>
              {errorMsg}
            </Alert>
          ))}
        </div>
      </Snackbar>
    </Container>
  );
}
