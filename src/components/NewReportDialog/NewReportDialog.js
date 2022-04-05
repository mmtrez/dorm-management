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

  const handleSubmitNewReport = async () => {
    console.log(new Intl.DateTimeFormat("fa").format(new Date()));
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
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth
    >
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
            <TextField
              label="توضیحات گزارش"
              variant="outlined"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Stack>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseDialog}
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
