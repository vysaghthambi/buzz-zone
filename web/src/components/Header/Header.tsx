import Typography from "@mui/material/Typography";

export default function Header() {
  return (
    <header>
      <Typography display="flex" columnGap={1} fontSize={"1.5rem"}>
        BUZZ{" "}
        <Typography color="secondary.main" fontSize={"1.5rem"}>
          ZONE
        </Typography>
      </Typography>
    </header>
  );
}
