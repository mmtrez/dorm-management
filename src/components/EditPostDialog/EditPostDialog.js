import { Dialog, DialogTitle, DialogContent, FormControl, Stack, TextField, DialogActions, Button } from "@mui/material";
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

const EditPostDialog = ({ openDialog, handleCloseDialog, notife, notifes, setNotifes }) => {

    const formik = useFormik({
        initialValues: {
            title: notife.title,
            text: notife.text,
        },
        validationSchema: validationSchema,
        onSubmit: async ({ title, text }) => {
            try {
                const response = await axios.patch(`/posts/${notife._id}`, { title, text });
                if (!response.data.errors) {
                    setNotifes(notifes.map((d) => (
                        d._id === notife._id ? {...notife, title, text} : d 
                    )))
                    handleCloseDialog();
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
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
            <DialogTitle sx={{ textAlign: 'center' }}>ویرایش اطلاعیه</DialogTitle>
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
                    <Button onClick={handleCloseDialog} variant="contained" sx={{ marginLeft: '0.5rem' }} color="warning">انصراف</Button>
                    <Button variant="contained" type="submit">ویرایش</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default EditPostDialog;