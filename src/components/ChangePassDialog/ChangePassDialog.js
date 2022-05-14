import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  Stack,
  TextField,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import axios from "../../api/axios";
import { useState } from "react";

const EditPostDialog = ({
  openDialog,
  handleCloseDialog,
  userInfo: { _id: id },
}) => {
  const [pass, setPass] = useState("");
  const [repeat, setRepeat] = useState("");
  const [err, setErr] = useState(false);
  const [errMinChar, setErrMinChar] = useState(false);

  const handleChangePass = async () => {
    if (repeat === pass) {
      setErr(false);
      if (pass.length >= 8) {
        setErrMinChar(false);
        try {
          const result = await axios.patch(`/pass/${id}`, { socialId: pass });
          if (result) {
            alert("با موفقیت تغییر کرد");
            handleCloseDialog();
            setPass("");
            setRepeat("");
            setErr(false);
            setErrMinChar(false);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        setErrMinChar(true);
      }
    } else {
      setErr(true);
    }
  };

  const close = () => {
    setPass("");
    setRepeat("");
    setErr(false);
    handleCloseDialog();
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ textAlign: "center" }}>تغییر کلمه عبور</DialogTitle>
      <DialogContent>
        <FormControl variant="standard" fullWidth>
          <Stack direction="column" spacing={2}>
            <TextField
              id="pass"
              label="رمزعبور جدید"
              variant="outlined"
              onChange={(e) => setPass(e.target.value)}
            />
            <Typography
              sx={{
                display: err ? "block" : "none",
                color: "crimson",
                fontSize: "12px",
              }}
            >
              کلمه عبور و تکرار هم یکی نیست
            </Typography>
            <Typography
              sx={{
                display: errMinChar ? "block" : "none",
                color: "crimson",
                fontSize: "12px",
              }}
            >
              رمز عبور باید حداقل 8 کاراکتر باشد
            </Typography>
            <TextField
              id="repeat"
              label="تکرار رمز عبور"
              variant="outlined"
              onChange={(e) => setRepeat(e.target.value)}
            />
            <Typography
              sx={{
                display: err ? "block" : "none",
                color: "crimson",
                fontSize: "12px",
              }}
            >
              کلمه عبور و تکرار هم یکی نیست
            </Typography>
            <Typography
              sx={{
                display: errMinChar ? "block" : "none",
                color: "crimson",
                fontSize: "12px",
              }}
            >
              رمز عبور باید حداقل 8 کاراکتر باشد
            </Typography>
          </Stack>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={close}
          variant="contained"
          sx={{ marginLeft: "0.5rem" }}
          color="warning"
        >
          انصراف
        </Button>
        <Button variant="contained" type="submit" onClick={handleChangePass}>
          ویرایش
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPostDialog;
