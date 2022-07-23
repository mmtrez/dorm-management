import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import LoginForm from "../../components/LoginForm/LoginForm";
import chamranLogo from "../../assets/images/chamranLogo.png";

const Entrance = ({ setAuth, setRole, setUserInfo }) => {
  return (
    <>
      <Stack
        flexGrow={1}
        component="main"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Paper
          elevation={10}
          sx={{
            maxWidth: "lg",
            width: { xs: "75%", md: "unset" },
            minWidth: "320px",
          }}
        >
          <Stack direction="row">
            <LoginForm
              setAuth={setAuth}
              setRole={setRole}
              setUserInfo={setUserInfo}
            />
            <Box
              width={"50%"}
              padding={10}
              sx={{ display: { xs: "none", md: "flex" } }}
              alignItems="center"
            >
              <img src={chamranLogo} alt="a picture about managment" />
            </Box>
          </Stack>
        </Paper>
        <Box
          bgcolor={(theme) => theme.palette.primary.light}
          color={(theme) => theme.palette.common.white}
          borderRadius
          sx={{
            maxWidth: "lg",
            width: { xs: "75%", md: "unset" },
            minWidth: "320px",
            p: 3,
          }}
        >
          <Typography variant="h5">
            سایت از نظر فونت و ظاهر خیلی کار داره :))
          </Typography>
          <Typography variant="h6">راهنما :</Typography>
          <Typography>
            سرپرست خوابگاه : <br />
            Work Id : 9273101 <br />
            social Id : Mamat1377 <br />
            مسیول فنی : <br />
            Work Id : 9673103 <br />
            Social Id : 1742856114 <br />
            دانشجو : <br />
            student Id : 9673102 <br />
            Social Id : 1742856214 <br />
          </Typography>
          <Typography>
            دانشجو میتواند گزارش ثبت کند. <br />
            سرپرست خوابگاه با بررسی گزارش آن را به یک مسیول فنی محول میکند.{" "}
            <br />
            مسیول فنی میتواند گزارش محول شده را رد کند یا بپذیرد ، که در صورت رد
            کردن به لیست گزارش های بررسی نشده سرپرست خوابگاه برمیگردد. <br />
          </Typography>
          <Typography>
            برای دانشجویان نام کاربری و رمز عبور به ترتیب معادل با شماره
            دانشجویی و شماره ملی میباشد
          </Typography>
          <Typography>
            برای کارکنان نام کاربری و رمز عبرو به ترتیب معادل با شماره پرسنلی و
            شماره ملی میباشد
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

export default Entrance;
