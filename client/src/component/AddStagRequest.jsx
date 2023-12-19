import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import CheckIcon from "@mui/icons-material/Check";
import tagData from "./data/sotProps.json";
import fieldNames from "./data/requestFormFields.json";
import { createStagRequest } from "../features/apiCalls";
import axios from "axios";
import FileUploadModal from "./FileUploadModal";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Controller, useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@mui/material/Link";
import { v4 as uuidv4 } from "uuid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "10px",
    margin: "0px auto",
  },
  card: {
    padding: theme.spacing(3),
  },
  fileGridItemStyles: {
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    width: "auto",
  },
}));

const AddStagRequest = ({ onClose, onDataRefresh }) => {
  const classes = useStyles();
  const { control, handleSubmit, register } = useForm();
  const [formData, setFormData] = useState(
    fieldNames.reduce((acc, { fieldKey }) => ({ ...acc, [fieldKey]: "" }), {})
  );
  const [selectedOptions, setSelectedOptions] = useState({
    sotProperties: [],
    platform: [],
  });
  const [files, setFiles] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFiles(acceptedFiles);
    }
  };
  
  const handleAutocompleteChange = (fieldKey, selectedValues) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [fieldKey]: selectedValues,
    }));
  };

  const onSubmit = async (data) => {
    const sotVariables = selectedOptions.sotProperties.reduce(
      (acc, obj, index) => {
        index = index + 1;
        acc[`sotVar${index}`] = `${obj.tagName} \n (${obj.tagKey})`;
        return acc;
      },
      {}
    );

    const updatedFormData = {
      ...formData,
      sotProperties: selectedOptions.sotProperties || [],
      ...sotVariables,
      ...data,
      platform: data.platform.join(","),
      attachments: files,
      requestId: uuidv4(),
    };
    setFormData(updatedFormData);

    try {
      const isFormValid = validateForm(updatedFormData);
      if (isFormValid) {
        await createStagRequest(updatedFormData);
        onClose();
        onDataRefresh();
        //navigate("/"); // Redirect to the desired page upon successful submission
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const validateForm = (formData) => {
    for (const fieldKey in formData) {
      if (formData.hasOwnProperty(fieldKey)) {
        const value = formData[fieldKey];
        const required = fieldNames.find(
          (field) => field.fieldKey === fieldKey
        )?.required;
        if (
          required &&
          (!value || (typeof value === "string" && !value.trim()))
        ) {
          return false;
        }
        if (fieldKey === "platform" && required) {
          if (!formData[fieldKey].length) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const handleAxiosError = (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          "Server responded with:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error during request setup:", error.message);
      }
    } else {
      console.error("Non-Axios error occurred:", error.message);
    }
  };

  const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <Typography variant="h6" component="div">
          Stag New Request Form:
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Grid container spacing={2} justify="center">
              {fieldNames.map(({ fieldKey, fieldLabel, required }) => (
                <React.Fragment key={fieldKey}>
                  {fieldKey.startsWith("sotProperties") ? (
                    <Grid
                      item
                      xs={12}
                      key={`${fieldKey}-autoComplete-sotProps`}
                    >
                      <Autocomplete
                        multiple
                        options={tagData}
                        getOptionLabel={(option) => option.tagName}
                        isOptionEqualToValue={(option, value) =>
                          option.tagName === value.tagName
                        }
                        disableCloseOnSelect
                        value={selectedOptions[fieldKey] || []}
                        onChange={(_, newValue) =>
                          handleAutocompleteChange(fieldKey, newValue)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label={fieldLabel}
                            placeholder="Select SOT Variables"
                            fullWidth
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
                    </Grid>
                  ) : fieldKey === "platform" ? (
                    <Grid
                      item
                      xs={12}
                      md={6}
                      key={`${fieldKey}-autoComplete-platform`}
                    >
                      <Controller
                        name={fieldKey}
                        control={control}
                        rules={{
                          required: "Please select at least one platform.",
                        }}
                        render={({ field, fieldState }) => (
                          <Autocomplete
                            multiple
                            options={["iOS", "Android", "Desktop"]}
                            getOptionLabel={(option) => option}
                            isOptionEqualToValue={(option, value) =>
                              option === value
                            }
                            disableCloseOnSelect
                            {...field}
                            onChange={(_, value) => field.onChange(value)}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                label={fieldLabel}
                                placeholder="Select Platform"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                              />
                            )}
                          />
                        )}
                        renderOption={(props, option, { selected }) => (
                          <MenuItem
                            {...props}
                            key={option.optionKey}
                            value={option.optionName}
                            sx={{ justifyContent: "space-between" }}
                          >
                            {option.optionName}
                            {selected ? <CheckIcon color="info" /> : null}
                          </MenuItem>
                        )}
                      />
                    </Grid>
                  ) : fieldKey === "attachments" ? (
                    <>
                      <Grid item xs={12} key={`${fieldKey}-link`}>
                        <Box>
                          <Link
                            component="button"
                            variant="body2"
                            onClick={(event) => {
                              event.preventDefault();
                              openModal();
                            }}
                          >
                            Upload Attachments
                          </Link>
                          <FileUploadModal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            onDrop={handleDrop}
                          />
                        </Box>
                      </Grid>
                    </>
                  ) : (
                    <Grid item xs={12} md={6} key={`${fieldKey}-textField`}>
                      <Controller
                        name={fieldKey}
                        control={control}
                        rules={{
                          required: `${fieldLabel.toLowerCase()}.`,
                        }}
                        render={({ field, fieldState, onChange }) => (
                          <TextField
                            {...field}
                            label={fieldLabel}
                            variant="outlined"
                            fullWidth
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            {...register(fieldKey)}
                          />
                        )}
                      />
                    </Grid>
                  )}
                </React.Fragment>
              ))}

              {files.length > 0 && (
                <Grid item xs={12} md={12}>
                  <h3 style={{ marginTop: "20px" }}>Selected Files</h3>
                  <div style={{
                      maxHeight: "200px", // Set the maximum height you desire
                      overflowY: "auto", // Enable vertical scrollbar
                    }}>
                    {files.map((file, index) => (
                      <div
                        key={file.name}
                        className={classes.fileGridItemStyles}
                      >
                        <span>{file.name}</span>
                        <IconButton onClick={() => removeFile(index)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </div>
                    ))}
                  </div>
                </Grid>
              )}

              <Grid item xs={12} sx={{ marginTop: 2 }}>
                <Button variant="contained" type="submit" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default AddStagRequest;
