import { Alert, Container, Divider, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FileExplorer from "../../components/FileExplorer/FileExplorer";
import RecentDocument from "../../components/RecentDocuments/RecentDocument";
import { getRecentPages } from "../../utils/pages/pagesAPICalls";

export default function WorkspaceView() {
  const [recentDocuments, setRecentDocuments] = useState([]);
  const [errorAPIList, setErrorAPIList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRecentPages();
      if (response.code != 200) {
        setErrorAPIList(response.message);
      } else {
        setRecentDocuments(response.data);
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

  return (
    <Container>
      <RecentDocument documents={recentDocuments} />
      <Divider />
      <br />
      <br />
      <FileExplorer documents={recentDocuments} />

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
