import React, { useState } from "react";
import { Alert, Box, Breadcrumbs, Button, IconButton, Link, Popover, Snackbar, TextField, Typography } from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { TreeFolderElement } from "../../types/FolderTypes";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import "./style.css";
import { borderRadius, margin } from "@mui/system";
import { createPage } from "../../utils/pages/pagesAPICalls";
import { createFolder } from "../../utils/folders/folderAPICalls";

interface Props {
  documents: TreeFolderElement[];
}

export default function FileExplorer(props: Props) {
  const { documents } = props;
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [textFieldInput, setTextFieldInput] = useState("");

  const [errorAPIList, setErrorAPIList] = useState<string[]>([]);

  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleNodeToggle = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
    setCurrentPath(nodeIds);
  };

  const renderTree = (nodes: TreeFolderElement) => {
    const isFolderOpen = currentPath.includes(nodes.id);
    const isFolder = nodes.children;
    return (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={nodes.title}
        icon={isFolder ? isFolderOpen ? <FolderOpenIcon className="fileExporer" /> : <FolderIcon className="fileExporer" /> : <DescriptionRoundedIcon className="fileExporer" />}
        onClick={() => handleElementClick(nodes)}>
        {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
      </TreeItem>
    );
  };

  const handleElementClick = (node: TreeFolderElement) => {
    if (node.children) {
      // If we click on an already open node
      if (currentPath.includes(node.id)) {
        if (currentPath[currentPath.length - 1] === node.id) {
          setCurrentPath(currentPath.slice(0, -1));
        }
        setCurrentPath(currentPath.slice(0, currentPath.indexOf(node.id)));
      } else {
        // If we click on a closed node
        setCurrentPath([...currentPath, node.id]);
      }
    } else if (!node.children) {
      // If we click on a page
      navigate(`/page/${node.id}`);
    }
  };

  const renderBreadcrumbs = () => {
    let path: { id: string; title: string }[] = [];
    let tree = documents;
    currentPath.forEach((nodeId) => {
      const node = tree.find((n) => n.id === nodeId);
      if (node) {
        path.push({ id: node.id, title: node.title });
        if (node.children) {
          tree = node.children;
        }
      }
    });

    return (
      <Breadcrumbs aria-label="breadcrumb">
        {path.map((item, index) => (
          <Link key={item.id} color={index === path.length - 1 ? "textPrimary" : "inherit"} onClick={() => handleBreadcrumbClick(item.id)}>
            {item.title}
          </Link>
        ))}
      </Breadcrumbs>
    );
  };

  const handleBreadcrumbClick = (id: string) => {
    setCurrentPath(currentPath.slice(0, currentPath.indexOf(id) + 1));
  };

  const handleBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldInput(event.target.value);
  };

  // HANDLE PAGE CREATE OR FOLDER CREATE
  const handleCreate = async () => {
    let response;
    if (anchorEl?.id === "addPageBtn") {
      if (currentPath.length === 0) {
        setErrorAPIList(["You need to create a folder first"]);
        return;
      }
      response = await createPage(textFieldInput, currentPath[currentPath.length - 1]);
    } else {
      // We get the parent folder
      const parentFolder = currentPath.length > 0 ? currentPath[currentPath.length - 1] : "";

      response = await createFolder(textFieldInput, parentFolder, currentPath.length === 0);
    }

    if (response.error) {
      setErrorAPIList(response.message);
    } else {
      //We add the newly created folder to the tree
      const { _id, title, isRoot } = response.data;
      if (anchorEl?.id === "addPageBtn") {
        // We add the page to the tree
        documentRecursiveAdd(currentPath[currentPath.length - 1], documents, { id: _id, title });
      } else {
        // We add the folder to the tree
        if (isRoot) {
          documents.push({ id: _id, title, children: [] });
        } else {
          documentRecursiveAdd(currentPath[currentPath.length - 1], documents, { id: _id, title, children: [] });
        }
      }
      handlePopoverClose();
    }
  };

  const documentRecursiveAdd = (parentId: string, documents: TreeFolderElement[], elementToAdd: TreeFolderElement): void => {
    for (let i = 0; i < documents.length; i++) {
      if (documents[i].id === parentId) {
        documents[i].children?.push(elementToAdd);
      } else if (documents[i].children && documents[i].children!.length > 0) {
        const found = documentRecursiveAdd(parentId, documents[i].children!, elementToAdd);
      }
    }
  };

  const handleCloseError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    } else {
      setErrorAPIList([]);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", userSelect: "none" }}>
      <Box sx={{ px: 2, py: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography variant="h5" color="text.primary" gutterBottom>
            File Explorer
          </Typography>
          <Box marginLeft={"10px"}>
            <IconButton onClick={handleBtnClick} sx={{ padding: "0", margin: "0px 5px" }} id="addFolderBtn">
              <CreateNewFolderIcon />
            </IconButton>
            <IconButton onClick={handleBtnClick} sx={{ padding: "0", margin: "0px 5px" }} id="addPageBtn">
              <NoteAddIcon />
            </IconButton>
          </Box>
        </Box>
        {renderBreadcrumbs()}
        <Popover
          open={open}
          onClose={handlePopoverClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}>
          <Box margin={"10px 20px"} sx={{ borderRadius: "10px" }}>
            <Typography variant="body1" color="text.primary" gutterBottom fontWeight={"bold"}>
              {anchorEl?.id === "addFolderBtn" ? "New folder name" : "New page title"}
            </Typography>
            <TextField id="outlined-basic" label="Name" variant="outlined" size="small" value={textFieldInput} onChange={handleTextChange} />
            <IconButton onClick={handleCreate} sx={{ padding: "0", margin: "0px 5px" }} id="addFolderBtn">
              <AddBoxIcon fontSize="large" />
            </IconButton>
          </Box>
        </Popover>
      </Box>
      <Box sx={{ flexGrow: 1, p: 2, overflow: "auto" }}>
        <TreeView defaultCollapseIcon={<FolderIcon className="fileExporer" />} defaultExpandIcon={<FolderOpenIcon className="fileExporer" />} onNodeToggle={handleNodeToggle} expanded={currentPath}>
          {documents.map((node) => renderTree(node))}
        </TreeView>
      </Box>
      <Snackbar open={errorAPIList.length > 0} onClose={handleCloseError}>
        <div>
          {errorAPIList.map((errorMsg, index) => (
            <Alert key={index} severity="error" onClose={handleCloseError}>
              {errorMsg}
            </Alert>
          ))}
        </div>
      </Snackbar>
    </Box>
  );
}
