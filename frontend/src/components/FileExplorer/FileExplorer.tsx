import React, { useState } from "react";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { TreeFolderElement } from "../../types/FolderTypes";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import "./style.css";

interface Props {
  documents: TreeFolderElement[];
}

export default function FileExplorer(props: Props) {
  const { documents } = props;
  const [currentPath, setCurrentPath] = useState<string[]>([]);

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
        icon={isFolder ? isFolderOpen ? <FolderOpenIcon className="fileExporer" /> : <FolderIcon className="fileExporer" /> : <InsertDriveFileIcon className="fileExporer" />}
        onClick={() => handleElementClick(nodes)}>
        {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
      </TreeItem>
    );
  };

  const handleElementClick = (node: TreeFolderElement) => {
    console.log("node", node);
    console.log("currentPath", currentPath);

    if (node.children && node.children.length > 0) {
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
        tree = node.children;
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

  const handleBreadcrumbClick = (id: number) => {
    console.log("id", id);
    console.log(currentPath.slice(0, currentPath.indexOf(id)));
    setCurrentPath(currentPath.slice(0, currentPath.indexOf(id) + 1));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", userSelect: "none" }}>
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="h5" color="text.primary" gutterBottom>
          File Explorer
        </Typography>
        {renderBreadcrumbs()}
      </Box>
      <Box sx={{ flexGrow: 1, p: 2, overflow: "auto" }}>
        <TreeView defaultCollapseIcon={<FolderIcon className="fileExporer" />} defaultExpandIcon={<FolderOpenIcon className="fileExporer" />} onNodeToggle={handleNodeToggle} expanded={currentPath}>
          {documents.map((node) => renderTree(node))}
        </TreeView>
      </Box>
    </Box>
  );
}
