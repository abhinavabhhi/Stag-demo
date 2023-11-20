import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import CheckIcon from "@mui/icons-material/Check";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import tagData from './data/sotProps.json';
import fieldNames from './data/requestFormFields.json';

const AddStagRequest = () => {
    const [formData, setFormData] = useState(
        fieldNames.reduce((acc, { fieldKey }) => ({ ...acc, [fieldKey]: '' }), {})
    );

    const [latestFormData, setLatestFormData] = useState({});

    const navigate = useNavigate();

    const [selectedOptions, setSelectedOptions] = useState({
        sotProperties: [],
        platform: [],
    });

    const isObjectEmpty = (obj) => {
        return Object.keys(obj).length === 0;
      };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAutocompleteChange = (fieldKey, selectedValues) => {
        setSelectedOptions((prevOptions) => ({ ...prevOptions, [fieldKey]: selectedValues }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const sotVariables = selectedOptions.sotProperties.reduce((acc, obj, index) => {
            index = index + 1;
            acc[`sotVar${index}`] = obj.tagName;
            return acc;
        }, {});

        const updatedFormData = {
            ...formData,
            ...sotVariables,
            platform: selectedOptions.platform.join(','),
        };

        setLatestFormData(updatedFormData);
        setFormData(updatedFormData);

        console.log("Updated formData:", updatedFormData);

        try {
            console.log("updated data to send:", updatedFormData);
            const isEmpty = isObjectEmpty(updatedFormData);
            if(!isEmpty) {
                await axios.post("http://localhost:8800/stagRequest", updatedFormData);
                navigate("/"); // Redirect to the desired page upon successful submission
            }
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const handleAxiosError = (error) => {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.error('Server responded with:', error.response.status, error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error during request setup:', error.message);
            }
        } else {
            console.error('Non-Axios error occurred:', error.message);
        }
    };

    useEffect(() => {
        console.log("Updated formData:", latestFormData);
    }, [latestFormData]);

    return (
        <Box sx={{ flexGrow: 1, padding: 16, fontFamily: 'Arial, sans-serif' }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Box sx={{ m: 2 }}>
                        <h2 style={{ fontSize: '24px' }}>SOT Request Form:</h2>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        {fieldNames.map(({ fieldKey, fieldLabel }) => (
                            fieldKey.startsWith('sotProperties') ? (
                                <Autocomplete
                                    key={fieldKey}
                                    multiple
                                    options={tagData}
                                    getOptionLabel={(option) => option.tagName}
                                    isOptionEqualToValue={(option, value) => option.tagName === value.tagName}
                                    disableCloseOnSelect
                                    value={selectedOptions[fieldKey]}
                                    onChange={(_, newValue) => handleAutocompleteChange(fieldKey, newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label={fieldLabel}
                                            placeholder="Select SOT Variables"
                                            sx={{ m: 1, fontSize: '14px' }}
                                        />
                                    )}
                                    renderOption={(props, option, { selected }) => (
                                        <MenuItem
                                            {...props}
                                            key={option.tagKey}
                                            value={option.tagName}
                                            sx={{ justifyContent: "space-between" }}
                                        >
                                            {option.tagName}
                                            {selected ? <CheckIcon color="info" /> : null}
                                        </MenuItem>
                                    )}
                                />
                            ) : fieldKey === 'platform' ? (
                                <Autocomplete
                                    key={fieldKey}
                                    multiple
                                    options={['iOS', 'Android', 'Desktop']}
                                    getOptionLabel={(option) => option}
                                    isOptionEqualToValue={(option, value) => option === value}
                                    disableCloseOnSelect
                                    value={selectedOptions[fieldKey]}
                                    onChange={(_, newValue) => handleAutocompleteChange(fieldKey, newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label={fieldLabel}
                                            placeholder="Select Platform"
                                            sx={{ m: 1, fontSize: '14px' }}
                                        />
                                    )}
                                />
                            ) : (
                                <TextField
                                    key={fieldKey}
                                    label={fieldLabel}
                                    variant="outlined"
                                    name={fieldKey}
                                    value={formData[fieldKey]}
                                    onChange={handleInputChange}
                                    fullWidth
                                    margin="normal"
                                    sx={{ m: 1, fontSize: '14px' }}
                                />
                            )
                        ))}

                        <Box sx={{ marginTop: 2 }}>
                            <Button variant="contained" type="submit" color="primary">
                                Submit
                            </Button>
                        </Box>
                    </form>
                </Grid>

                <Grid item xs={6}>
                    <Box sx={{ paddingLeft: 4 }}>
                        <h2 style={{ fontSize: '24px' }}>Submitted JSON Format</h2>
                        <pre style={{ fontSize: '16px' }}>{JSON.stringify(formData, null, 2)}</pre>
                        <h2 style={{ fontSize: '24px', marginTop: '16px' }}>Selected Options</h2>
                        <pre style={{ fontSize: '16px' }}>{JSON.stringify(selectedOptions, null, 2)}</pre>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddStagRequest;
