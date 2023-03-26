import { Link } from "react-router-dom";
import { TreeItem, TreeView } from "@mui/lab";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import { TreeFolderElement } from "../../types/FolderTypes";
import "./style.css";

interface Props {
  documents: TreeFolderElement[];
}

export default function TreeFileExplorer(props: Props) {
  const { documents } = props;

  const renderTree = (nodes: TreeFolderElement) => {
    console.log(nodes);
    const title = nodes.title ? nodes.title : "Untitled";

    if (!Array.isArray(nodes.children)) {
      // If nodes is a document, wrap it with a Link component
      return <TreeItem key={nodes.id} nodeId={nodes.id} label={<Link to={`/page/${nodes.id}`}>{title.substring(0, 12) + "..."}</Link>} endIcon={<DescriptionIcon className="treeItem" />} />;
    }
    if (nodes.children.length === 0) {
      // If nodes is a document, wrap it with a Link component
      return <TreeItem key={nodes.id} nodeId={nodes.id} label={title} endIcon={<FolderIcon className="treeItem" />} />;
    }

    // Otherwise, render it as a folder
    return (
      <TreeItem key={nodes.id} nodeId={nodes.id} label={title} endIcon={<FolderIcon className="treeItem" />}>
        {nodes.children.map((node: TreeFolderElement) => renderTree(node))}
      </TreeItem>
    );
  };
  return (
    <TreeView
      aria-label="customized"
      defaultExpanded={["0"]}
      defaultCollapseIcon={<FolderIcon className="treeItem" />}
      defaultExpandIcon={<FolderIcon className="treeItem" />}
      defaultEndIcon={<DescriptionIcon className="treeItem" />}
      sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}>
      {documents.map((doc) => renderTree(doc))}
    </TreeView>
  );
}
