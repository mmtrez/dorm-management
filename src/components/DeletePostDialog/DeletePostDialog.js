import { Dialog, DialogTitle, DialogContent, FormControl, Stack, TextField, DialogActions, Button, Typography } from "@mui/material";
import axios from "../../api/axios";

const DeletePostDialog = ({ openDeleteDialog, handleCloseDeleteDialog, notife, notifes, setNotifes }) => {
    
    const handleDeltePost = async () => {
        try {
            const response = await axios.delete(`/posts/${notife._id}`);
            console.log(response)
            if (!response.data.errors) {
                setNotifes(notifes.filter((d) => (
                    d._id !== notife._id 
                )))
                handleCloseDeleteDialog();
            } else {
                alert('خطا')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} maxWidth="md" fullWidth>
            <DialogTitle sx={{ textAlign: 'center' }}>حذف اطلاعیه</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" component="p">
                        آیا از حذف این اطلاعیه اطمینان دارید ؟
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} variant="contained" sx={{ marginLeft: '0.5rem' }}>انصراف</Button>
                    <Button variant="contained" type="submit" color="error" onClick={handleDeltePost}>حذف</Button>
                </DialogActions>
        </Dialog>
    )
}

export default DeletePostDialog;