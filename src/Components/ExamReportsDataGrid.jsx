import React, { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Close, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import axios from 'axios';
import ExamReportForm from './ExamReportForm';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Alert, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import REACT_API_URL from '../config';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress'; // Added loader

const ExamReportsDataGrid = () => {
    const loginstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = loginstate;
    const classTeacher = currentUser.classTeacherName._id;
    const [examReports, setExamReports] = useState([]);
    const [selectedReportId, setSelectedReportId] = useState(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true); // Added loader state

    const fetchExamReports = async () => {
        try {
            setLoading(true); // Show full page loader
            const response = await axios.get(`${REACT_API_URL}/exams/class/${classTeacher}`);
            setExamReports(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Hide full page loader
        }
    };

    useEffect(() => {
        fetchExamReports();
    }, []);

    const handleDelete = async (id) => {
        try {
            setLoading(true); // Show full page loader
            await axios.delete(`${REACT_API_URL}/exams/${id}`);
            fetchExamReports();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Hide full page loader
        }
    };

    const handleEdit = (id) => {
        setSelectedReportId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedReportId(null);
        setOpen(false);
    };

    const handleFormSubmit = async (data) => {
        try {
            setLoading(true); // Show full page loader
            if (selectedReportId) {
                await axios.put(`${REACT_API_URL}/exams/${selectedReportId}`, data);
            } else {
                await axios.post(`${REACT_API_URL}/exams/add`, data);
            }
            fetchExamReports();
            handleClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Hide full page loader
        }
    };

    const groupedReports = examReports.reduce((acc, report) => {
        const key = `${report.examType}`;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(report);
        return acc;
    }, {});
 
    return (
        <Container>
            {loading && <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} /> } {/* Show full page loader */}
          {!loading &&   <Button sx={{m:3}} variant="contained" color="primary" onClick={() => setOpen(true)}>Add Exam Report</Button>}
            {Object.keys(groupedReports).map((groupKey, index) => (
                <Stack mb={4} key={index}>
                    <Typography variant="h5" gutterBottom>{groupKey}</Typography>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={groupedReports[groupKey].map(report => ({ ...report, id: report._id }))}
                            columns={[
                                { field: 'studentId', headerName: 'Student ID', width: 150 },
                                { field: 'examType', headerName: 'Exam Type', width: 150 },
                                { field: 'dateOfExam', headerName: 'Date of Exam', width: 250, valueFormatter: (params) => new Date(params.value).toISOString().split('T')[0] },
                                { field: 'classId', headerName: 'Class', width: 150, valueGetter: (params) => params.row.classId.name },
                                {
                                    field: 'subjects',
                                    headerName: 'Subjects',
                                    width: 300,
                                    valueGetter: (params) => params.row.subjects.map(subject => `${subject.subjectName.name} (${subject.marks} marks)`).join(', '),
                                },
                                {
                                    field: 'actions',
                                    headerName: 'Actions',
                                    width: 150,
                                    renderCell: (params) => (
                                        <div>
                                            <GridActionsCellItem
                                                icon={<EditIcon />}
                                                label="Edit"
                                                onClick={() => handleEdit(params.row.id)}
                                            />
                                            <GridActionsCellItem
                                                icon={<DeleteIcon />}
                                                label="Delete"
                                                onClick={() => handleDelete(params.row.id)}
                                            />
                                        </div>
                                    )
                                }
                            ]}
                            pageSize={5}
                            loading={loading} // Show loader inside DataGrid
                            components={{
                                loadingOverlay: () => (
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                                        <CircularProgress />
                                    </div>
                                ),
                            }}
                        />
                    </div>
                </Stack>
            ))}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                fullScreen
                sx={{ overflow: 'auto' }}
            >
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Stack direction={'row'} justifyContent="space-between" sx={{ p: 2 }}>
                                <Typography variant="h4" align="center" gutterBottom>
                                    {selectedReportId ? 'Edit Exam Report' : 'Add Exam Report'}
                                </Typography>
                                <div>
                                    <Button startIcon={<Close />} variant="contained" color="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                </div>
                            </Stack>
                            <ExamReportForm onSubmit={handleFormSubmit} reportId={selectedReportId} />
                        </Paper>
                    </Grid>
                </Grid>
            </Modal>
        </Container>
    );
};

export default ExamReportsDataGrid;
