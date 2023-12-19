import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import CheckIcon from "@mui/icons-material/Check";
import tagData from "./data/sotProps.json";
import fieldNames from "./data/requestFormFields.json";
import { getStagRequestById, updateStagRequest } from "../features/apiCalls";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { CardContent } from "@mui/material";
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
  inputLabelNoShrink: {
    transform: "translate(32px, 24px) scale(1)"
  }
}));

const EditStagRequest = ({ id, onDataRefresh, onClose }) => {
  const classes = useStyles();
  const { control, handleSubmit, register, setValue } = useForm();
  const [selectedOptions, setSelectedOptions] = useState({
    sotProperties: [],
    platform: [],
  });
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const setValuesAsync = async () => {
      try {
        const { data } = await getStagRequestById(id);
        const firstElement = data || {};
        for (const [fieldKey, fieldValue] of Object.entries(firstElement)) {
          await setValue(fieldKey, fieldValue);
        }
        const sotProperties = firstElement?.sotProperties || [];
        const platformArray = firstElement?.platform
          ? firstElement?.platform.split(",").map((item) => item.trim())
          : [];
        if (firstElement.attachments && firstElement.attachments.length > 0) {
          setFiles([...firstElement.attachments]);
        }
        setSelectedOptions({
          sotProperties: JSON.parse(sotProperties),
          platform: platformArray,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    setValuesAsync();
  }, [id, setValue]);

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
    const sotPropertiesString = JSON.stringify(
      selectedOptions.sotProperties || []
    );
    const platFormString = selectedOptions.platform.join(",") || "";
    const attachments = files || [];
    const updatedFormData = {
      ...data,
      ...sotVariables,
      sotProperties: sotPropertiesString,
      platform: platFormString,
      requestId: data.requestId,
      attachments: attachments,
    };
    try {
      await updateStagRequest(updatedFormData);
      onDataRefresh();
      onClose();
      setFiles([]);
    } catch (error) {
      console.error("Error updating request:", error);
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
          Edit Stag Request Form:
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Grid container spacing={2}>
              {fieldNames.map(({ fieldKey, fieldLabel, fieldType }) =>
                fieldType === "TextField" ? (
                  <Grid item xs={12} md={6} key={`${fieldKey}-textField`}>
                    <Controller
                      name={fieldKey}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label={fieldLabel}
                          variant="outlined"
                          fullWidth
                          {...register(fieldKey)}
                          InputLabelProps={{
                            shrink: true,
                            className: classes.inputLabelNoShrink
                          }}
                        />
                      )}
                    />
                  </Grid>
                ) : null
              )}

              <Grid item md={6} xs={12}>
                <Autocomplete
                  multiple
                  options={["iOS", "Android", "Desktop"]}
                  getOptionLabel={(option) => option}
                  isOptionEqualToValue={(option, value) => option === value}
                  disableCloseOnSelect
                  value={selectedOptions.platform || []}
                  onChange={(_, newValue) =>
                    handleAutocompleteChange("platform", newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select Platform"
                      fullWidth
                    />
                  )}
                  renderOption={(props, option, { selected }) => (
                    <MenuItem
                      {...props}
                      key={option}
                      value={option}
                      sx={{ justifyContent: "space-between" }}
                    >
                      {option}
                      {selected ? <CheckIcon color="info" /> : null}
                    </MenuItem>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={tagData}
                  getOptionLabel={(option) => option.tagName}
                  isOptionEqualToValue={(option, value) =>
                    option.tagName === value.tagName
                  }
                  disableCloseOnSelect
                  value={selectedOptions.sotProperties || []}
                  onChange={(_, newValue) =>
                    handleAutocompleteChange("sotProperties", newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select SOT Variables"
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

              {files.length > 0 && (
                <Grid item xs={12} md={12}>
                  <h3 style={{ marginTop: "20px" }}>Selected Files</h3>
                  <div
                    style={{
                      maxHeight: "200px", // Set the maximum height you desire
                      overflowY: "auto", // Enable vertical scrollbar
                    }}
                  >
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

              <Grid item xs={12}>
                <Button variant="contained" type="submit" color="primary">
                  Update Request
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default EditStagRequest;
