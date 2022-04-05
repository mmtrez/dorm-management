import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";
import { useState } from "react";
import axios from "../../api/axios";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  fullName: yup.string().required("لطفا نام و نام خانوداگی را وارد کنید"),
  birthDate: yup.string().required("لطفا تاریخ تولد را وارد کنید"),
  socialId: yup
    .string()
    .matches(/^[0-9]+$/, "شماره ملی باید فقط شامل اعداد باشد")
    .required("لطفا شماره ملی را وارد کنید")
    .min(10, "شماره ملی 10 رقم میباشد")
    .max(10, "شماره ملی 10 رقم میباشد"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "شماره همراه باید فقط شامل اعداد باشد")
    .required("لطفا شماره همراه را وارد کنید")
    .min(10, "شماره همراه باید 10 رقم و بدون 0 باشد")
    .max(10, "شماره همراه باید 10 رقم و بدون 0 باشد"),
  workId: yup
    .string()
    .matches(/^[0-9]+$/, "شماره پرسنلی باید فقط شامل اعداد باشد")
    .required("لطفا شماره پرسنلی را وارد کنید")
    .min(7, "شماره پرسنلی 7 رقم میباشد")
    .max(7, "شماره پرسنلی ۷ رقم میباشد"),
});
const validationSchema2 = yup.object({
  fullName: yup.string().required("لطفا نام و نام خانوداگی را وارد کنید"),
  birthDate: yup.string().required("لطفا تاریخ تولد را وارد کنید"),
  socialId: yup
    .string()
    .matches(/^[0-9]+$/, "شماره ملی باید فقط شامل اعداد باشد")
    .required("لطفا شماره ملی را وارد کنید")
    .min(10, "شماره ملی 10 رقم میباشد")
    .max(10, "شماره ملی 10 رقم میباشد"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "شماره همراه باید فقط شامل اعداد باشد")
    .required("لطفا شماره همراه را وارد کنید")
    .min(10, "شماره همراه باید 10 رقم و بدون 0 باشد")
    .max(10, "شماره همراه باید 10 رقم و بدون 0 باشد"),
  studentId: yup
    .string()
    .matches(/^[0-9]+$/, "شماره دانشجویی باید فقط شامل اعداد باشد")
    .required("لطفا شماره دانشجویی را وارد کنید")
    .min(7, "شماره دانشجویی ۷ رقم میباشد")
    .max(7, "شماره دانشجویی ۷ رقم میباشد"),
  room: yup
    .number()
    .typeError("شماره اتاق باید فقط شامل اعداد باشد")
    .required("لطفا شماره اتاق را وارد کنید"),
  dormName: yup.string().required("لطفا نام خوابگاه را وارد کنید"),
});

const NewUserDialog = ({
  openDialog,
  handleCloseDialog,
  setNewWorker,
  newWorker,
}) => {
  // STATE
  const [userType, setUserType] = useState("user");

  const formik = useFormik({
    initialValues: {
      fullName: "",
      birthDate: "",
      socialId: "",
      phoneNumber: "",
      workId: "",
      studentId: "",
      room: "",
      dormName: "",
    },
    validationSchema:
      userType === "user" ? validationSchema2 : validationSchema,
    onSubmit: async ({
      fullName,
      birthDate,
      socialId,
      phoneNumber,
      workId,
      studentId,
      room,
      dormName,
    }) => {
      try {
        console.log(userType);
        if (userType === "user") {
          const result = await axios.post(`/register/user`, {
            fullName,
            birthDate,
            socialId,
            studentId,
            dormName,
            room,
            phoneNumber,
          });
          result ? alert("کاربر با موفقیت ثبت شد") : alert("خطا");
          formik.resetForm();
          handleCloseDialog();
        } else {
          const result = await axios.post(`/register/${userType}`, {
            fullName,
            birthDate,
            socialId,
            phoneNumber,
            workId,
          });
          userType === "worker" ? setNewWorker(!newWorker) : console.log("");
          result ? alert("کاربر با موفقیت ثبت شد") : alert("خطا");
          formik.resetForm();
          handleCloseDialog();
        }
      } catch (err) {
        alert("خطا");
        console.log(err);
      }
    },
  });

  const handleChangeType = (e) => {
    setUserType(e.target.value);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ textAlign: "center" }}>ثبت کاربر جدید</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <FormControl variant="standard" fullWidth>
            <Stack direction="column" spacing={2}>
              <InputLabel id="userType">نوع کاربر</InputLabel>
              <Select
                labelId="userType"
                id="userType"
                value={userType}
                label="userType"
                onChange={(e) => handleChangeType(e)}
              >
                <MenuItem defaultValue value="user">
                  دانشجو
                </MenuItem>
                <MenuItem value="supervisor">سرپرست خوابگاه</MenuItem>
                <MenuItem value="worker">مسئول فنی</MenuItem>
              </Select>
              <TextField
                label="نام و نام خانوادگی"
                id="fullName"
                variant="outlined"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
              <TextField
                label="تاریخ تولد"
                id="birthDate"
                variant="outlined"
                value={formik.values.birthDate}
                onChange={formik.handleChange}
                error={
                  formik.touched.birthDate && Boolean(formik.errors.birthDate)
                }
                helperText={formik.touched.birthDate && formik.errors.birthDate}
              />
              <TextField
                label="شماره ملی"
                id="socialId"
                variant="outlined"
                value={formik.values.socialId}
                onChange={formik.handleChange}
                error={
                  formik.touched.socialId && Boolean(formik.errors.socialId)
                }
                helperText={formik.touched.socialId && formik.errors.socialId}
              />
              <TextField
                label="شماره تماس"
                variant="outlined"
                id="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
              {userType !== "user" && (
                <TextField
                  label="شماره پرسنلی"
                  id="workId"
                  variant="outlined"
                  value={formik.values.workId}
                  onChange={formik.handleChange}
                  error={formik.touched.workId && Boolean(formik.errors.workId)}
                  helperText={formik.touched.workId && formik.errors.workId}
                />
              )}
              {userType === "user" && (
                <>
                  <TextField
                    label="شماره دانشجویی"
                    id="studentId"
                    variant="outlined"
                    value={formik.values.studentId}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.studentId &&
                      Boolean(formik.errors.studentId)
                    }
                    helperText={
                      formik.touched.studentId && formik.errors.studentId
                    }
                  />
                  <TextField
                    label="شماره اتاق"
                    id="room"
                    variant="outlined"
                    value={formik.values.room}
                    onChange={formik.handleChange}
                    error={formik.touched.room && Boolean(formik.errors.room)}
                    helperText={formik.touched.room && formik.errors.room}
                  />
                  <TextField
                    label="نام مجتمع خوابگاه"
                    id="dormName"
                    variant="outlined"
                    value={formik.values.dormName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.dormName && Boolean(formik.errors.dormName)
                    }
                    helperText={
                      formik.touched.dormName && formik.errors.dormName
                    }
                  />
                </>
              )}
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
          <Button type="submit" variant="contained">
            ثبت
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewUserDialog;
