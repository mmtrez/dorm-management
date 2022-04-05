import { Paper, Typography, Stack, Box, Button } from "@mui/material";
import { Schedule, PersonOutline, EditOutlined, DeleteOutline } from "@mui/icons-material";
import ItemHeader from "../ItemHeader/ItemHeader";
import Item from "../Item/Item";
import EditPostDialog from "../EditPostDialog/EditPostDialog";
import { useState } from "react";
import DeletePostDialog from "../DeletePostDialog/DeletePostDialog";

const AnnouncementItem = ({ notife, role, notifes, setNotifes }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    return (
        <Item>
            <Paper elevation={6} sx={{ pt: 8, paddingX: 2, pb: 2 }}>
                <ItemHeader title={notife.title} />
                <Typography component="p" sx={{ mb: 4, fontSize: '1rem' }}>
                    {notife.text}
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                    <Box flexGrow={1}>
                        <Box sx={{ ml: 3, display: "inline" }}>
                            <Schedule sx={{ ml: 1, verticalAlign: "middle" }} />
                            <Typography variant="body1" component="time" sx={{ verticalAlign: "middle" }}>
                                {notife.dateTime}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "inline" }}>
                            <PersonOutline sx={{ ml: 1, verticalAlign: "middle" }} />
                            <Typography variant="body1" component="address" sx={{ display: "inline" }}>
                                {notife.author}
                            </Typography>
                        </Box>
                    </Box>
                    {role === 'supervisor' && 
                        <Box>
                            <Button
                                variant="contained"
                                startIcon={<EditOutlined sx={{ ml: 1, color: 'white' }} />}
                                sx={{ ml: 1 }}
                                onClick={handleOpenDialog}    
                            >
                                ویرایش
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<DeleteOutline sx={{ ml: 1, color: 'white' }} />}
                                color="error"
                                onClick={handleOpenDeleteDialog}
                            >
                                حذف
                            </Button>

                            <EditPostDialog
                                openDialog={openDialog}
                                handleCloseDialog={handleCloseDialog}
                                notife={notife}
                                notifes={notifes}
                                setNotifes={setNotifes}
                            />
                            <DeletePostDialog
                                openDeleteDialog={openDeleteDialog}
                                handleCloseDeleteDialog={handleCloseDeleteDialog}
                                notife={notife}
                                notifes={notifes}
                                setNotifes={setNotifes}
                            />
                        </Box>
                    }
                </Stack>
            </Paper>
        </Item>
    )
}

export default AnnouncementItem;
