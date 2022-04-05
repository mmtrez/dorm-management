// IMPORT
import InfoCard from "../../components/InfoCard/InfoCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ReportsCard from "../../components/ReportsCard/ReportsCard";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';
import NewReportDialog from "../../components/NewReportDialog/NewReportDialog";
import {useEffect, useState} from "react";
import axios from "../../api/axios";
import NewUserDialog from "../../components/NewUserDialog/NewUserDialog";
import Stack from "@mui/material/Stack";
import NewPostDialog from "../../components/NewPostDialog/NewPostDialog";


const Dashboard = ({ userInfo, role }) => {
    // STATE
    const [openDialog, setOpenDialog] = useState(false);
    const [reports, setReports] = useState([]);
    const [newWorker, setNewWorker] = useState(false);
    const [openPostDialog, setOpenPostDialog] = useState(false);
    console.log(`role is ${role}`)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('/reports');
                setReports(result.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [])

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleOpenPostDialog = () => {
        setOpenPostDialog(true);
    }
    const handleClosePostDialog = () => {
        setOpenPostDialog(false);
    };

    return (
        <Box flexGrow={1} paddingY={6} paddingX={3}>
            <Grid container justifyContent="space-between" wrap>
                <Grid item xs={12} md={3.5} sx={{ bgcolor: 'white' }} borderRadius mb={7}>
                    <InfoCard userInfo={userInfo} />
                </Grid>
                <Grid item xs={12} md={8.25} sx={{ bgcolor: 'white' }} borderRadius mb={7}>
                    <ReportsCard
                        title={
                            role === 'user' ?
                                'گزارش های محول نشده'
                                : role === 'supervisor'
                                ? 'گزارش های بررسی شده'
                                : 'گزارش های پذیرفته شده'
                        }
                        reports={
                            role === 'user' ?
                                reports.filter((report) => (report.reporter === userInfo.fullName && report.reportState !== 'محول شده')).reverse()
                                : role === 'worker'
                                ? reports.filter((report) => (report.handler === userInfo.fullName && report.handlerAnswer === 'پذیرفته شده')).reverse()
                                : reports.filter((report) => (report.reportState === 'محول شده')).reverse()
                        }
                        setReports={setReports}
                        newWorker={newWorker}
                        setNewWorker={setNewWorker}
                        allReports={reports}
                        role={role}
                    />
                </Grid>
                <Grid item xs={12} md={12} sx={{ bgcolor: 'white' }} borderRadius mb={7}>
                    <ReportsCard
                        title={
                            role === 'user' ?
                                'گزارش های محول شده'
                                : role === 'worker'
                                ? 'گزارش های جدید'
                                : 'گزارش های بررسی نشده'
                        }
                        reports={
                            role === 'user' ?
                                reports.filter((report) => report.reportState === 'محول شده' && report.reporter === userInfo.fullName).reverse()
                                : role === 'worker'
                                ? reports.filter((report) => (report.handler === userInfo.fullName && report.handlerAnswer === 'بدون پاسخ'))
                                : reports.filter((report) => (report.reportState === 'بررسی نشده')).reverse()
                        }
                        setReports={setReports}
                        newWorker={newWorker}
                        setNewWorker={setNewWorker}
                        allReports={reports}
                        role={role}
                    />
                </Grid>
            </Grid>
            {role !== 'worker' &&
                <Stack direction="row" sx={{ position: 'fixed', left: '1.5rem', bottom: '1.5rem' }}>
                    <Fab variant="extended" color="primary" onClick={handleOpenDialog} sx={{ ml: 1 }}>
                        <AddIcon sx={{ ml: 1 }} />
                        {role === 'user' ? 'گزارش جدید' : 'افزودن کاربر'}
                    </Fab>
                    {role === 'user' &&
                        <NewReportDialog
                            openDialog={openDialog}
                            handleCloseDialog={handleCloseDialog}
                            userInfo={userInfo}
                            setReports={setReports}
                            reports={reports}
                        />
                    }
                    {role === 'supervisor' &&
                        <>
                            <NewUserDialog
                                openDialog={openDialog}
                                handleCloseDialog={handleCloseDialog}
                                setNewWorker={setNewWorker}
                                newWorker={newWorker}
                            />
                            <Fab variant="extended" color="primary" onClick={handleOpenPostDialog}>
                                <AddIcon sx={{ ml: 1 }} />
                                اطلاعیه جدید
                            </Fab>
                            <NewPostDialog
                                openPostDialog={openPostDialog}
                                handleClosePostDialog={handleClosePostDialog}
                                userInfo={userInfo}
                            />
                        </>
                    }
                </Stack>
            }
        </Box>
    );
};

export default Dashboard;