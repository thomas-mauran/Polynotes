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

  const renderTree = (nodes: any) => {
    if (!Array.isArray(nodes.children)) {
      // If nodes is a document, wrap it with a Link component
      return <TreeItem key={nodes.id} nodeId={nodes.id} label={<Link to={`/page/${nodes.id}`}>{nodes.title}</Link>} endIcon={<DescriptionIcon className="treeItem" />} />;
    }

    // Otherwise, render it as a folder
    return (
      <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.title} endIcon={<FolderIcon className="treeItem" />}>
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
