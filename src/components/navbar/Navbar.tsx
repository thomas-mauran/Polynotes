import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import SharedIcon from "@mui/icons-material/FolderShared";
import RestoreIcon from "@mui/icons-material/Restore";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";

import AccountCircle from "@mui/icons-material/AccountCircle";
import { Avatar, Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

// Style
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: 0,
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: "8%",
    width: "60%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

// Nav bar
export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [sidebarAnchorEl, sidebarSetAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isSidebarOpen = Boolean(sidebarAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSidebarMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    sidebarSetAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSidebarMenuClose = () => {
    sidebarSetAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  // Side bar

  const listItems = [
    {
      listIcon: <AddIcon />,
      listText: "Create",
    },
    {
      listIcon: <HomeIcon />,
      listText: "My workspace",
    },
    {
      listIcon: <SharedIcon />,
      listText: "Shared with me",
    },
    {
      listIcon: <RestoreIcon />,
      listText: "Recent",
    },
    {
      listIcon: <StarIcon />,
      listText: "Stared",
    },
    {
      listIcon: <DeleteIcon />,
      listText: "Trash",
    },
  ];

  const SideList = () => (
    <Menu open={isSidebarOpen} onClose={handleSidebarMenuClose}>
      <Box>
        <List>
          {listItems.map((listItem, index) => (
            <ListItem button key={index}>
              <ListItemIcon>{listItem.listIcon}</ListItemIcon>
              <ListItemText primary={listItem.listText} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Menu>
  );

  const StyledSideList = styled(SideList)(({ theme }) => ({
    width: 250,
    background: "#511",
    height: "100vh",
    backgroundColor: "red",
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }} onClick={handleSidebarMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ display: { xs: "none", sm: "block" } }}>
            Polynotes
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: "flex" } }}>
            <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
              <AccountCircle fontSize="large" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {<StyledSideList />}
    </Box>
  );
}
