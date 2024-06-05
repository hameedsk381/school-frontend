import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Paper, Snackbar, Alert, LinearProgress } from '@mui/material';

import REACT_API_URL from '../config';



const SearchResults = () => {
    const [rollNumber, setRollNumber] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSearch = async () => {
        if (!rollNumber) {
            setError('Please enter a roll number');
            return;
        }
        setLoading(true);
        setError('');
        setResults([]);
        try {
            const response = await axios.get(`${REACT_API_URL}/results/results-by-roll/${rollNumber}`);
            setLoading(false);
            if (response.status === 200) {
                setResults(response.data);
            }
        } catch (err) {
            setLoading(false);
            if (err.response && err.response.status === 409) {
                setOpenSnackbar(true);
            } else {
                setError('Failed to fetch results');
            }
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="sm">
            <Paper style={{ padding: 20, marginTop: 30 }}>
                {loading && <LinearProgress/>}
                <Typography variant="h6" gutterBottom>
                    Search Student Results by Roll Number
                </Typography>
                <TextField
                    label="Roll Number"
                    variant="outlined"
                    fullWidth
                    value={rollNumber}
                    onChange={e => setRollNumber(e.target.value)}
                    margin="normal"
                />
                <Button sx={{mb:4}} onClick={handleSearch} variant="contained" color="primary" disabled={loading}>
                    Search
                </Button>
             
                {error && <Typography color="error">{error}</Typography>}
                {openSnackbar && <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
                        Student not found.
                    </Alert>}
                <div style={{ marginTop: 20 }}>
                    {results.map((result) => (
                        <Typography key={result._id}>
                            Exam: {result.exam.title} - Score: {result.score}
                        </Typography>
                    ))}
                </div>
                {/* <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
                        Student not found.
                    </Alert>
                </Snackbar> */}
            </Paper>
        </Container>
    );
};

export default SearchResults;
