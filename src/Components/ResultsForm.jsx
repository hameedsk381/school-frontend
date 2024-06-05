import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const ResultsForm = ({ classId }) => {
    const [rows, setRows] = useState([]);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        // Simultaneously fetch students and subjects for the class
        Promise.all([
            axios.get(`/api/classes/${classId}/students`),
            axios.get(`/api/classes/${classId}/subjects`)
        ]).then(([studentsResponse, subjectsResponse]) => {
            setSubjects(subjectsResponse.data);
            // Transform students into grid rows with fields for each subject
            const studentRows = studentsResponse.data.map(student => ({
                id: student._id,
                name: `${student.name.firstName} ${student.name.lastName}`,
                ...subjectsResponse.data.reduce((acc, subject) => ({
                    ...acc,
                    [subject.code]: '', // Initialize each subject mark as empty
                }), {})
            }));
            setRows(studentRows);
        }).catch(error => console.error('Error fetching data', error));
    }, [classId]);

    const handleCommit = (params) => {
        const updatedRows = rows.map((row) => {
            if (row.id === params.id) {
                return { ...row, [params.field]: params.value };
            }
            return row;
        });
        setRows(updatedRows);
    };

    const handleSubmit = () => {
        axios.post(`/api/classes/${classId}/results`, { results: rows })
            .then(() => alert('Results submitted successfully!'))
            .catch(error => {
                alert('Failed to submit results');
                console.error('Error submitting results', error);
            });
    };

    const columns = [
        { field: 'name', headerName: 'Student Name', width: 200, editable: false },
        ...subjects.map(subject => ({
            field: subject.code,
            headerName: subject.name,
            width: 130,
            editable: true,
            type: 'number'
        }))
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                onCellEditCommit={handleCommit}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
            />
            <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: 20 }}>
                Submit Results
            </Button>
        </div>
    );
};

export default ResultsForm;
