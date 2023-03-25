interface FolderElement {
  id: string;
  type: string;
  title: string;
  childList?: []; // added property with optional modifier
}

type RecursiveFindResult = {
  id: string;
  title: string | null;
  children?: RecursiveFindResult[];
};
