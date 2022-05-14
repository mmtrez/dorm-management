// IMPORT
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "../../api/axios";

const NewReportDialog = ({
  openDialog,
  handleCloseDialog,
  userInfo,
  setReports,
  reports,
}) => {
  // STATE
  const [issueType, setIssueType] = useState("");
  const [text, setText] = useState("");
  const [errIssue, setErrIssue] = useState(false);
  const [errText, setErrText] = useState(false);
  const handleSubmitNewReport = async () => {
    if (issueType.length < 15 || issueType.length > 200 || text.length < 30) {
      if (issueType.length < 15 || issueType.length > 200) {
        setErrIssue(true);
      } else {
        setErrIssue(false);
      }
      if (text.length < 30) {
        console.log();
        setErrText(true);
      } else {
        setErrText(false);
      }
    } else {
      try {
        const result = await axios.post("/reports", {
          reporter: userInfo.fullName,
          issueType,
          dormName: userInfo.dormName,
          room: userInfo.room,
          reportState: "بررسی نشده",
          text,
          handler: "تعیین نشده",
          handlerAnswer: "بدون پاسخ",
          force: false,
          date: new Intl.DateTimeFormat("fa").format(new Date()),
        });
        setReports([...reports, result.data]);
        setIssueType("");
        setText("");
        handleCloseDialog();
      } catch (err) {
        console.log(err);
        alert(err);
      }
    }
  };

  const handleClean = () => {
    setErrIssue(false);
    setErrText(false);
    setIssueType("");
    setText("");
    handleCloseDialog();
  };

  return (
    <Dialog open={openDialog} onClose={handleClean} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: "center" }}>ثبت گزارش جدید</DialogTitle>
      <DialogContent>
        <FormControl variant="standard" fullWidth>
          <Stack direction="column" spacing={2}>
            <TextField
              label="نوع مشکل"
              variant="outlined"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
            />
            <Typography
              style={errIssue ? { display: "block" } : { display: "none" }}
              sx={{ color: "crimson", fontSize: "12px" }}
            >
              عنوان باید بین 15 و 200 کاراکتر باشد
            </Typography>
            <TextField
              label="توضیحات گزارش"
              variant="outlined"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Typography
              style={errText ? { display: "block" } : { display: "none" }}
              sx={{ color: "crimson", fontSize: "12px" }}
            >
              متن باید بیشتر از 30 کاراکتر باشد
            </Typography>
          </Stack>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClean}
          variant="contained"
          sx={{ marginLeft: "0.5rem" }}
          color="warning"
        >
          انصراف
        </Button>
        <Button onClick={handleSubmitNewReport} variant="contained">
          ثبت
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewReportDialog;
