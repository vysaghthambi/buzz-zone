import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import LogoutIcon from "@mui/icons-material/Logout";

import { signInWithGoogle, signOut } from "../../lib/firebase/auth";
import { useUser } from "../../context/UserContext";

export default function Header() {
  const { user } = useUser();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <header>
      <Stack flexDirection="row" columnGap={1}>
        <Typography variant="h1">BUZZ</Typography>
        <Typography color="secondary.main" variant="h1">
          ZONE
        </Typography>
      </Stack>

      {!user ? (
        <Button variant="outlined" color="secondary" onClick={signInWithGoogle}>
          Login
        </Button>
      ) : (
        <Stack flexDirection="row" alignItems="center" columnGap={1}>
          <Avatar
            alt={user.displayName ?? "profile"}
            src={user.photoURL ?? ""}
            sx={{ height: { xs: 30, md: 40 }, width: { xs: 30, md: 40 } }}
          />
          {!isSmallScreen && (
            <Typography variant="h2">{user.displayName}</Typography>
          )}
          <IconButton size="large" onClick={signOut}>
            <LogoutIcon fontSize="large" color="secondary" />
          </IconButton>
        </Stack>
      )}
    </header>
  );
}
