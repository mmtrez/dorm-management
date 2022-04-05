import { Dialog, DialogTitle, DialogContent,FormControl, Stack, TextField, Button, DialogActions } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "../../api/axios";

const validationSchema = yup.object({
    title: yup.string()
        .required('لطفا عنوان را وارد کنید')
        .max(100, 'اطلاعیه باید کمتر از 100 کاراکتر باشد'),
    text: yup.string()
        .required('لطفا متن اطلاعیه را وارد کنید'),
})

const NewPostDialog = ({ openPostDialog, handleClosePostDialog, userInfo }) => {

    const formik = useFormik({
        initialValues: {
            title: '',
            text: '',
            dateTime: new Intl.DateTimeFormat('fa').format(new Date()),
            author: userInfo.fullName,
        },
        validationSchema: validationSchema,
        onSubmit: async ({ title, text, dateTime, author }) => {
            try {
                const response = await axios.post('/posts', { title, text, dateTime, author });
                if (!response.data.errors) {
                    alert('اطلاعیه با موفقیت ثبت شد')
                    handleClosePostDialog();
                    formik.resetForm();
                } else {
                    alert('خطا')
                }
            } catch (err) {
                console.log(err)
            }
        }
    })

    return (
        <Dialog open={openPostDialog} onClose={handleClosePostDialog} maxWidth="md" fullWidth>
            <DialogTitle sx={{ textAlign: 'center' }}>ثبت اطلاعیه جدید</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <FormControl variant="standard" fullWidth>
                        <Stack direction="column" spacing={2}>
                            <TextField
                                id="title"
                                label="عنوان اطلاعیه"
                                variant="outlined"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}
                            />
                            <TextField
                                id="text"
                                label="توضیحات اطلاعیه"
                                variant="outlined"
                                value={formik.values.text}
                                onChange={formik.handleChange}
                                error={formik.touched.text && Boolean(formik.errors.text)}
                                helperText={formik.touched.text && formik.errors.text}
                                multiline
                                minRows={3}
                            />
                        </Stack>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePostDialog} variant="contained" sx={{ marginLeft: '0.5rem' }} color="warning">انصراف</Button>
                    <Button variant="contained" type="submit">ثبت</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default NewPostDialog;