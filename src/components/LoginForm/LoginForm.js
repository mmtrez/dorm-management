import { TextField, Button, Stack, Box, Typography } from "@mui/material";
import { useState } from "react";
import axios from "../../api/axios";
import Logo from "../../assets/images/chamranLogo.png";

const LoginForm = ({ setAuth, setRole, setUserInfo }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitLogin = async () => {
    try {
      const data = {
        username: Number(userName),
        password: Number(password),
      };
      const result = await axios.post("/login", data);
      if (result.data === "کاربری با این مشخصات یافت نشد") {
        alert(result.data);
      } else {
        setAuth(true);
        setRole(result.data.role);
        localStorage.setItem("auth", "1");
        localStorage.setItem("role", result.data.role);
        localStorage.setItem("userInfo", JSON.stringify(result.data.info));
        console.log(result);
        setUserInfo(result.data.info);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setUserName("");
      setPassword("");
    }
  };

  return (
    <Stack
      component="form"
      padding={{ xs: 5, md: 10 }}
      direction="column"
      spacing={3}
      justifyContent="center"
      borderLeft={1}
      borderColor="#e7e7e7"
      sx={{ width: { xs: "100%", md: "50%" } }}
    >
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          maxWidth: "200px",
          margin: "auto",
        }}
      >
        <img src={Logo} alt="chamran's logo" />
      </Box>
      <Typography
        variant="h5"
        component="h1"
        textAlign="center"
        marginBottom="25px"
      >
        سامانه مدیریت خوابگاه چمران
      </Typography>
      <TextField
        id="outlined-basic"
        label="‌نام‌ کاربری"
        variant="outlined"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="‌رمز عبور"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={handleSubmitLogin}
        sx={{ padding: 1 }}
      >
        ورود
      </Button>
    </Stack>
  );
};

export default LoginForm;
