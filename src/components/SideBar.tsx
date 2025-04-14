import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styled as muiStyled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";

// MUI Icons
import HomeIcon from "@mui/icons-material/Home";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import PersonIcon from "@mui/icons-material/Person";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";

// 드로어 너비
const drawerWidth = 260;

// 스타일된 컴포넌트
const DrawerContainer = muiStyled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
  },
}));

const LogoContainer = muiStyled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(3),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

const SearchContainer = muiStyled(Paper)(({ theme }) => ({
  padding: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: "90%",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  borderRadius: 20,
}));

const StyledInputBase = muiStyled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
  fontSize: 14,
}));

const StyledListItemButton = muiStyled(ListItemButton)<{ active?: number }>(
  ({ theme, active }) => ({
    borderRadius: theme.spacing(1),
    margin: theme.spacing(0.5, 1),
    backgroundColor: active ? "rgba(25, 118, 210, 0.08)" : "transparent",
    "&:hover": {
      backgroundColor: "rgba(25, 118, 210, 0.12)",
    },
  })
);

// 메뉴 아이템 배열
const MENU_ITEMS = [
  {
    path: "/main",
    label: "Home",
    icon: <HomeIcon />,
  },
  {
    path: "/rank",
    label: "Ranking",
    icon: <LeaderboardIcon />,
  },
  {
    path: "/info",
    label: "Information",
    icon: <PersonIcon />,
  },
  {
    path: "/reservation",
    label: "Reservation",
    icon: <EventNoteIcon />,
  },
  {
    path: "/set",
    label: "Setting",
    icon: <SettingsIcon />,
  },
];

interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 검색 로직 구현
    console.log("Searching for:", searchValue);
    setSearchValue("");
  };

  return (
    <DrawerContainer variant="permanent" anchor="left">
      <LogoContainer>
        <Avatar
          sx={{
            width: 70,
            height: 70,
            marginBottom: 1,
            backgroundColor: "#1976d2",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            fontSize: 28,
            fontWeight: "bold",
          }}
        >
          42
        </Avatar>
        <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
          42SRR
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Stats & Reservation
        </Typography>
      </LogoContainer>

      <Divider sx={{ mx: 2 }} />

      <SearchContainer>
        <StyledInputBase
          placeholder="Search..."
          inputProps={{ "aria-label": "search" }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
      </SearchContainer>

      <Divider sx={{ mx: 2 }} />

      <List sx={{ flex: 1, py: 1 }}>
        {MENU_ITEMS.map((item) => (
          <ListItem key={item.path} disablePadding>
            <StyledListItemButton
              active={location.pathname === item.path ? 1 : 0}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color:
                    location.pathname === item.path ? "#1976d2" : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight:
                    location.pathname === item.path ? "bold" : "normal",
                  color:
                    location.pathname === item.path ? "#1976d2" : "inherit",
                }}
              />
            </StyledListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2, mt: "auto" }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", textAlign: "center" }}
        >
          © 2024 42SRR
        </Typography>
      </Box>
    </DrawerContainer>
  );
};

export default SideBar;
