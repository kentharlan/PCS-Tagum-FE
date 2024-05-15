import { useState, useEffect } from "react"
import { Button } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from '../../api/axios'
import Checkin from "./Checkin"
import Checkout from "./Checkout"
import Clean from "./Clean"
import Modal from "../Modal"
import './Rooms.css'
import Navbar from "../Navbar"
import TimedOut from "./Timedout"

const GET_ROOMS_URL = "/rooms"
const INIT_ROOMS = "/txn/init"
const GET_ACTIVE_TXNS_URL = "/txn/txns/active"

const theme = createTheme({
    palette: {
        half_hour_left: {
            main: '#E3D026',
            light: '#E9DB5D',
            dark: '#A29415',
            contrastText: '#242105',
        },
    },
});

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalConfig, setModalConfig] = useState([]);
    const [activeTxns, setActiveTxns] = useState([]);
    const [timers, setTimers] = useState([]);

    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        getRooms()
    }, [openModal])

    useEffect(() => {
        getActiveTxns()
    }, [rooms])

    useEffect(() => {
        const updatedTimers = startTimers();

        return () => {
            stopTimers(updatedTimers)
            setTimers([]);
        }
    }, [activeTxns])

    const init = async () => {
        try {
            await axios.post(INIT_ROOMS);
        } catch (error) {
            console.log(error.message)
        }
    }

    const getRooms = async () => {
        try {
            const result = await axios.get(GET_ROOMS_URL);
            const data = result?.data;
            setRooms(data);
        } catch (error) {
            console.log(error.message)
        }
    }

    const getActiveTxns = async () => {
        try {
            const result = await axios.get(GET_ACTIVE_TXNS_URL);
            const data = result?.data;
            let timerArray = [];
            data.forEach((txn) => {
                if (txn) {
                    const checkin_dt = new Date(txn.dt_check_in);
                    const current_dt = new Date();

                    const duration = parseInt(txn.base_time) + parseInt(txn.additional_time);
                    const diff = (checkin_dt.setTime(checkin_dt.getTime() + (duration * 60 * 60 * 1000))) - current_dt
                    const initialTime = Math.floor(diff / 1000)

                    timerArray[txn.room_no] = {
                        time: initialTime,
                        intervalId: null
                    }
                }
            });

            setTimers(timerArray);
            setActiveTxns(data);
        } catch (error) {
            console.log(error.message)
        }
    }

    const startTimers = () => {
        const updatedTimers = timers.map((timer, index) => {
            if (!timer) return null

            const intervalId = setInterval(() => {
                const updatedTime = [...timers]
                updatedTime[index].time -= 1

                setTimers(updatedTime)

                if (updatedTime[index].time < 0) {
                    getRooms();
                    clearInterval(intervalId);
                }
            }, 1000);

            return { ...timer, intervalId };
        });

        setTimers(updatedTimers)
        return updatedTimers
    };

    const stopTimers = (updatedTimers) => {
        updatedTimers.forEach(timer => {
            clearInterval(timer?.intervalId)
        });
    };

    const handleButton = (room) => {
        switch (room.status) {
            case 1:
                setModalConfig({
                    title: "Check In",
                    content: <Checkin
                        setOpenModal={setOpenModal}
                        room={room}
                    />
                })
                break;
            case 2:
                setModalConfig({
                    title: "Check Out",
                    content: <Checkout
                        setOpenModal={setOpenModal}
                        room={room}
                    />
                })
                break;
            case 3:
                setModalConfig({
                    title: "Update Room to Vacant",
                    content: <Clean
                        setOpenModal={setOpenModal}
                        room={room}
                    />
                })
                break;
            case 4:
                setModalConfig({
                    title: "Time is up!",
                    content: <TimedOut
                        setOpenModal={setOpenModal}
                        room={room}
                    />
                })
                break;
        }

        setOpenModal(true)
    }

    const elements = (room) => {
        if (!room) return

        let color = "primary"
        switch (room.status) {
            case 1:
                color = "success"
                break;
            case 2:
                color = "error"
                break;
            case 3:
                color = "primary"
                break;
            case 4:
                color = "secondary"
                break;
        }

        const shouldBlink = timers[room.room_no]?.time <= 300;

        return (
            <ThemeProvider theme={theme}>
                <Button
                    sx={{
                        height: "100%",
                        width: "100%",
                        minWidth: "0",
                        animation: shouldBlink ? "blink 1s linear infinite" : "none",
                        padding: 0 // Removed padding as per instructions
                    }}
                    variant="contained"
                    key={room.rooms_no}
                    color={timers[room.room_no]?.time <= 600 ? "half_hour_left" : color}
                    onClick={() => handleButton(room)}
                >
                    {room.room_no}
                </Button>
            </ThemeProvider>
        )
    };

    return (
        <>
            <Navbar />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", margin: "0 2vw" }}>
                <table className="GeneratedTable">
                    <tbody>
                        <tr>
                            <td colSpan={12}></td>
                            <td>{elements(rooms[39])}</td>
                            <td>{elements(rooms[38])}</td>
                            <td>{elements(rooms[37])}</td>
                            <td>{elements(rooms[36])}</td>
                            <td>{elements(rooms[35])}</td>
                            <td>{elements(rooms[34])}</td>
                            <td>{elements(rooms[33])}</td>
                            <td>{elements(rooms[32])}</td>
                            <td>{elements(rooms[31])}</td>
                            <td>{elements(rooms[30])}</td>
                            <td>{elements(rooms[29])}</td>
                        </tr>
                        <tr>
                            <td colSpan={22}></td>
                            <td>{elements(rooms[28])}</td>
                        </tr>
                        <tr>
                            <td colSpan={22}></td>
                            <td>{elements(rooms[27])}</td>
                        </tr>
                        <tr>
                            <td colSpan={20}></td>
                            <td>{elements(rooms[20])}</td>
                            <td></td>
                            <td>{elements(rooms[26])}</td>
                        </tr>
                        <tr>
                            <td rowSpan={2}>{elements(rooms[0])}</td>
                            <td rowSpan={2}>{elements(rooms[1])}</td>
                            <td rowSpan={2}>{elements(rooms[2])}</td>
                            <td rowSpan={2}>{elements(rooms[3])}</td>
                            <td rowSpan={2}>{elements(rooms[4])}</td>
                            <td rowSpan={2}>{elements(rooms[5])}</td>
                            <td rowSpan={2}>{elements(rooms[6])}</td>
                            <td rowSpan={2}>{elements(rooms[7])}</td>
                            <td rowSpan={2}>{elements(rooms[8])}</td>
                            <td rowSpan={2}>{elements(rooms[9])}</td>
                            <td rowSpan={2}>{elements(rooms[10])}</td>
                            <td rowSpan={2}>{elements(rooms[11])}</td>
                            <td rowSpan={2}>{elements(rooms[12])}</td>
                            <td rowSpan={2}>{elements(rooms[13])}</td>
                            <td rowSpan={2}>{elements(rooms[14])}</td>
                            <td rowSpan={2}>{elements(rooms[15])}</td>
                            <td rowSpan={2}>{elements(rooms[16])}</td>
                            <td rowSpan={2}>{elements(rooms[17])}</td>
                            <td rowSpan={2}>{elements(rooms[18])}</td>
                            <td rowSpan={2}>{elements(rooms[19])}</td>
                            <td>{elements(rooms[21])}</td>
                            <td></td>
                            <td>{elements(rooms[25])}</td>
                        </tr>
                        <tr>
                            <td>{elements(rooms[22])}</td>
                            <td>{elements(rooms[23])}</td>
                            <td>{elements(rooms[24])}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Modal
                openModal={openModal}
                setOpenModal={setOpenModal}
                title={modalConfig.title}
                width="30vw"
            >
                {modalConfig.content}
            </Modal>
        </>
    )
}

export default Rooms;