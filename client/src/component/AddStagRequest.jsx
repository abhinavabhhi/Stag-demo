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
import { createStagRequest, createJiraTicket } from "../features/apiCalls";
import axios from "axios";
import FileUploadModal from "./FileUploadModal";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Controller, useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@mui/material/Link";
import { v4 as uuidv4 } from "uuid";
import FilesThumbnails from "./FilesThumbnails";
import jiraPostRequest from "./data/jiraPostRequest.json";

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
}));

const AddStagRequest = ({ onClose, onDataRefresh }) => {
  const classes = useStyles();
  const { control, handleSubmit, register } = useForm();
  const [state, setState] = useState({
    formData: fieldNames.reduce(
      (acc, { fieldKey }) => ({ ...acc, [fieldKey]: "" }),
      {}
    ),
    selectedOptions: {
      sotProperties: [],
      platform: [],
    },
    files: [],
    modalIsOpen: false,
  });

  const openModal = () => {
    setState((prevState) => ({ ...prevState, modalIsOpen: true }));
  };

  const closeModal = () => {
    setState((prevState) => ({ ...prevState, modalIsOpen: false }));
  };

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setState((prevState) => ({ ...prevState, files: acceptedFiles }));
    }
  };

  const handleAutocompleteChange = (fieldKey, selectedValues) => {
    setState((prevState) => ({
      ...prevState,
      selectedOptions: {
        ...prevState.selectedOptions,
        [fieldKey]: selectedValues,
      },
    }));
  };

  const onSubmit = async (data) => {
    try {
      const sotVariables = state.selectedOptions.sotProperties.reduce(
        (acc, obj, index) => {
          index = index + 1;
          acc[`sotVar${index}`] = `${obj.tagName} \n (${obj.tagKey})`;
          return acc;
        },
        {}
      );

      const updatedFormData = {
        ...state.formData,
        sotProperties: state.selectedOptions.sotProperties || [],
        ...sotVariables,
        ...data,
        platform: data.platform.join(","),
        attachments: state.files,
        requestId: uuidv4(),
      };

      setState((prevState) => ({ ...prevState, formData: updatedFormData }));

      const isFormValid = validateForm(updatedFormData);

      if (isFormValid) {
        const result = await createStagRequest(updatedFormData);
        if (result?.affectedRows > 0) {
          const mappedResponse = {
            ...jiraPostRequest,
            "fields": {
              "summary": updatedFormData?.title,
              "description": `AC:\r\n # ${
                updatedFormData?.description
              } \r\n \r\n # *Platform:* \r\n # ${
                updatedFormData.platform
              } \r\n *Required response from UFE:* \r\n {code:java}${formatSotVariables(
                updatedFormData.sotType,
                updatedFormData?.sotProperties
              )} {code} \r\n ${updatedFormData?.comments}`,
              "project": {
                "key": "SA",
                "name": "Sephora Analytics",
                "projectTypeKey": "software",
              },
              "priority": {
                "self": `https://jira.sephora.com/rest/api/2/priority/7`,
                "iconUrl":
                  `https://jira.sephora.com/images/icons/priorities/blocker.svg`,
                "name": "Not Prioritized",
                "id": "7",
              },
              "issuetype": {
                "self": "https://jira.sephora.com/rest/api/2/issuetype/10",
                "id": "10",
                "description":
                  "Created by Jira Software - do not edit or delete. Issue type for a user story.",
                "iconUrl":
                  `https://jira.sephora.com/secure/viewavatar?size=xsmall&avatarId=15285&avatarType=issuetype`,
                "name": "Story",
                "subtask": false,
                "avatarId": 15285,
              },
              "update": {}
            },
          };
          console.log("mappedResponse", mappedResponse);
          const result = await createJiraTicket(mappedResponse);
          console.log("result====", result);
        }
        onClose();
        onDataRefresh();
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const formatSotVariables = (sotType, sotProperties) => {
    const formattedSotProperties = sotProperties
      .map(({ tagKey, tagName }) => `'${tagKey}': '${tagName}'`)
      .join(",\r\n") || "";
    return `{ 'sotType': '${sotType}', ${formattedSotProperties} }`;
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

  const updateFiles = (updatedFiles) => {
    setState((prevState) => ({ ...prevState, files: updatedFiles }));
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
                        value={state.selectedOptions[fieldKey] || []}
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
                            isOpen={state.modalIsOpen}
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
                            multiline={
                              fieldKey === "description" ||
                              fieldKey === "comments"
                            }
                            rows={4}
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

              {state.files.length > 0 && (
                <FilesThumbnails
                  label="Uploaded Files"
                  initialData={state.files}
                  onUpdateFiles={updateFiles}
                />
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
