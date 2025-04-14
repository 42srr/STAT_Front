import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface AppHeaderProps {
  intraId: string;
  onLogout: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ intraId, onLogout }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold", color: "#1976d2" }}
        >
          42 STAT & RESERVATION
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Chip
            icon={<AccountCircleIcon />}
            label={intraId}
            color="primary"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<LogoutIcon />}
            onClick={onLogout}
          >
            로그아웃
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
