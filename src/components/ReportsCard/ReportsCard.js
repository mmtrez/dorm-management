// IMPORT
import * as React from "react";
import Item from "../Item/Item";
import ItemHeader from "../ItemHeader/ItemHeader";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Button,
  Collapse,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const columns = [
  {
    id: "reporter",
    label: "گزارش کننده",
    minWidth: 170,
    align: "right",
  },
  {
    id: "issueType",
    label: "نوع مشکل",
    minWidth: 170,
    align: "right",
  },
  {
    id: "dormName",
    label: "نام خوابگاه",
    minWidth: 100,
    align: "right",
  },
  {
    id: "room",
    label: "شماره اتاق",
    minWidth: 170,
    align: "right",
  },
  {
    id: "reportState",
    label: "وضعیت گزارش",
    minWidth: 170,
    align: "right",
  },
  {
    id: "handler",
    label: "محول شده به",
    minWidth: 170,
    align: "right",
  },
  {
    id: "handlerAnswer",
    label: "پاسخ مسئول فنی",
    minWidth: 170,
    align: "right",
  },
];

const ReportsCard = ({
  title,
  reports,
  setReports,
  newWorker,
  setNewWorker,
  allReports,
  role,
}) => {
  // STATE
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(null);
  const [workers, setWorkers] = useState([]);
  const [handler, setHandler] = useState("");
  const [handlerAnswer, setHandlerAnswer] = useState("");
  const [force, setForce] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/workers");
      setWorkers(result.data);
    };
    fetchData();
    console.log(allReports);
  }, [newWorker]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const onClickSubmitHandler = async (e) => {
    let state;
    if (handler === "تعیین نشده") {
      state = "بررسی نشده";
    } else {
      state = "محول شده";
    }
    try {
      const result = await axios.patch(`/reports/${e.target.value}`, {
        handler: handler,
        reportState: state,
        force,
      });
      setReports(
        allReports.map((report) =>
          report._id === e.target.value
            ? { ...report, handler: handler, reportState: state, force }
            : report
        )
      );
    } catch (err) {
      console.log(err);
      alert(err);
    } finally {
      setHandler("");
      setOpen(null);
      setForce(false);
    }
  };
  const onClickSubmitAnswer = async (e) => {
    try {
      if (handlerAnswer === "پذیرفته شده") {
        const result = await axios.patch(`/reports/${e.target.value}`, {
          handlerAnswer: handlerAnswer,
        });
        setReports(
          allReports.map((report) =>
            report._id === e.target.value
              ? { ...report, handlerAnswer: handlerAnswer }
              : report
          )
        );
      } else if (handlerAnswer === "رد شده") {
        const result = await axios.patch(`/reports/${e.target.value}`, {
          handlerAnswer: handlerAnswer,
          handler: "تعیین نشده",
          reportState: "بررسی نشده",
        });
        setReports(
          allReports.map((report) =>
            report._id === e.target.value
              ? { ...report, handlerAnswer: handlerAnswer }
              : report
          )
        );
      }
    } catch (err) {
      alert(err);
    } finally {
      setHandlerAnswer("");
      setOpen(null);
    }
  };

  return (
    <Item>
      <ItemHeader title={title} />
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
        elevation={0}
      >
        <TableContainer sx={{ maxHeight: 244, marginTop: "3rem", flexGrow: 1 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">تاریخ</TableCell>
                <TableCell align="center" sx={{ minWidth: "80px" }}>
                  اهمیت
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align="right">جزئیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((report, index) => {
                  return (
                    <>
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell align="center">{report.date}</TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            backgroundColor: report.force ? "#F08080" : "none",
                          }}
                        >
                          {report.force ? "فوری" : "عادی"}
                        </TableCell>
                        {columns.map((column) => {
                          const value = report[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                        <TableCell align="right">
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() =>
                              open === null ? setOpen(index) : setOpen(null)
                            }
                          >
                            {open === index ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={8}
                        >
                          <Collapse
                            in={open === index}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Stack
                              sx={{ margin: 1 }}
                              direction="row"
                              alignItems="center"
                              padding={1}
                            >
                              <Typography
                                variant="p"
                                gutterBottom
                                component="div"
                                flexGrow={1}
                              >
                                <span style={{ color: "#1565c0" }}>
                                  توضیحات گزارش :{" "}
                                </span>
                                {report.text}
                              </Typography>
                              {role === "supervisor" && (
                                <>
                                  <FormControl
                                    variant="filled"
                                    sx={{
                                      width: "235px",
                                      marginLeft: "1.5rem",
                                    }}
                                  >
                                    <InputLabel id="demo-simple-select-label">
                                      برای محول کردن یک مسئول را انتخاب کنید
                                    </InputLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={handler}
                                      label="Age"
                                      onChange={(e) =>
                                        setHandler(e.target.value)
                                      }
                                      autoFocus
                                    >
                                      <MenuItem defaultValue value="تعیین نشده">
                                        تعیین نشده
                                      </MenuItem>
                                      {workers.map((worker, index) => (
                                        <MenuItem
                                          key={index}
                                          value={worker.fullName}
                                        >
                                          {worker.fullName}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        value={force}
                                        onChange={(e) =>
                                          setForce(e.target.checked)
                                        }
                                      />
                                    }
                                    label="فوری"
                                  />
                                  <Button
                                    variant="contained"
                                    onClick={(value) =>
                                      onClickSubmitHandler(value)
                                    }
                                    value={report._id}
                                    sx={{ marginRight: 8 }}
                                  >
                                    تایید
                                  </Button>
                                </>
                              )}
                              {role === "worker" && (
                                <>
                                  <FormControl
                                    variant="filled"
                                    sx={{
                                      width: "235px",
                                      marginLeft: "1.5rem",
                                    }}
                                  >
                                    <InputLabel id="demo-simple-select-label">
                                      پاسخ خود به گزارش محول شده را انتخاب کنید
                                    </InputLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={handlerAnswer}
                                      label="Age"
                                      onChange={(e) =>
                                        setHandlerAnswer(e.target.value)
                                      }
                                      autoFocus
                                    >
                                      <MenuItem value="پذیرفته شده">
                                        پذیرفتن
                                      </MenuItem>
                                      <MenuItem value="رد شده">
                                        رد کردن
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                  <Button
                                    variant="contained"
                                    onClick={(value) =>
                                      onClickSubmitAnswer(value)
                                    }
                                    value={report._id}
                                  >
                                    تایید
                                  </Button>
                                </>
                              )}
                            </Stack>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={reports.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Item>
  );
};

export default ReportsCard;
