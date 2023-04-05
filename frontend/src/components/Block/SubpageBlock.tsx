import { TextField, IconButton, Autocomplete, Select, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent, useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { closeSettings, updateHTML } from "../../redux/reducers/pageReducer";
import { useDispatch } from "react-redux";
import { getPageTitle, getPages } from "../../utils/pages/pagesAPICalls";
import { Link as LinkRouter } from "react-router-dom";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { SelectChangeEvent } from '@mui/material/Select';

interface propsType {
  index: number;
  defaultValue: { id: string; label: string };
  settingsOpen: boolean;
  uuid: string;
}

export default function SubpageBlock(props: propsType) {
  const [inputs, setInputs] = useState({
    id: props.defaultValue.id ?? "",
    label: props.defaultValue.label ?? "",
  });

  const [userPages, setUserPages] = useState<{id: string, label: string}[]>([]);
  const [errorAPIList, setErrorAPIList] = useState([]);

  const dispatch = useDispatch();

  const fetchPages = async () => {
    const response = await getPages();
    if (response.error) {
      setErrorAPIList(response.message);
    } else {
      setUserPages(response.data);
    }
  };

  const fetchNewName = async () => {
    const response = await getPageTitle(props.defaultValue.id);
    if (response.error) {
      setErrorAPIList(response.message);
    } else {
      setInputs((prevState) => ({
        ...prevState,
        label: response.data,
      }));
    }
  };

  useEffect(() => {
    fetchPages();
    fetchNewName();
  }, []);

  const handleSelect = (e: SelectChangeEvent<string>) => {
    const label = findLabel(e.target.value);
    setInputs((prevState) => ({
      label: label,
      id: e.target.value,
    }));
  };

  const findLabel = (id: string) => {
    const page = userPages.find((page) => page.id === id);
    return page?.label ?? "";
  };

  const handleClick = () => {
    dispatch(closeSettings({ uuid: props.uuid }));

    dispatch(updateHTML({ uuid: props.uuid, newData: inputs }));
  };
  return (
    <Box sx={{ display: "flex" }}>
      {props.settingsOpen === true ? (
        <>
            <Select id="combo-box-demo" value={inputs.id} onChange={handleSelect} 
            sx={{ width: 300, marginTop: "10px" }} 
            >
              {userPages.map((page) => (
                <MenuItem key={page.id} value={page.id} id={page.label} >{page.label}</MenuItem>
              ))}

            </Select>

          <IconButton onClick={handleClick} aria-label="delete" sx={{ padding: "0px", height: "30px", marginTop: "20px" }}>
            <AddBoxIcon fontSize="large" />
          </IconButton>
        </>
      ) : (
        <Box>
          <Box
            sx={{
              display: "flex",
              fontFamily: "sans-serif",
              alignItems: "center",
              justifyContent: "center",
              padding: "7px",
              borderRadius: "5px",
              "&:hover": {
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              },
            }}>
            <InsertDriveFileOutlinedIcon />
            <LinkRouter to={`/page/${inputs.id}`}>{inputs.label}</LinkRouter>
          </Box>
        </Box>
      )}
    </Box>
  );
}
