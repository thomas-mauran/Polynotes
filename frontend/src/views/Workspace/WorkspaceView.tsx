import { Alert, Container, Divider, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FileExplorer from "../../components/FileExplorer/FileExplorer";
import RecentDocument from "../../components/RecentDocuments/RecentDocument";
import { getTree } from "../../utils/folders/folderAPICalls";
import { getRecentPages } from "../../utils/pages/pagesAPICalls";

export default function WorkspaceView() {
  const [recentDocuments, setRecentDocuments] = useState([]);
  const [treeDocuments, setTreeDocuments] = useState([]);

  const [errorAPIList, setErrorAPIList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseRecent = await getRecentPages();
      if (responseRecent.code != 200) {
        setErrorAPIList(responseRecent.message);
      } else {
        setRecentDocuments(responseRecent.data);
      }

      const responseTree = await getTree();
      if (responseTree.code != 200) {
        setErrorAPIList(responseTree.message);
      } else {
        setTreeDocuments(responseTree.data);
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
      <FileExplorer documents={treeDocuments} />
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
