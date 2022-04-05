import { Container, Stack } from "@mui/material";
import axios from "../../api/axios";
import { useState, useEffect } from "react";
import AnnouncementItem from "../../components/AnnouncementItem/AnnouncementItem";

const Announcements = ({ role }) => {
    const [notifes, setNotifes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/posts');
                setNotifes(response.data.reverse());
            } catch(err) {
                alert('خطا');
            }
        }
        fetchData();
    }, [])

    return (
        <Container maxWidth="md" sx={{ paddingY: 6 }}>
            <Stack spacing={8}>
                {notifes.map((notife, index) => (
                    <AnnouncementItem key={index} notife={notife} role={role} notifes={notifes} setNotifes={setNotifes} />
                ))}
            </Stack>
        </Container>
    )
}

export default Announcements;