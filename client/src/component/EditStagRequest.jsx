import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate, useParams } from "react-router-dom";
import tagData from "./data/sotProps.json";
import fieldNames from "./data/requestFormFields.json";
import { getStagRequestById, updateStagRequest } from "../features/apiCalls";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

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
    width: "75%",
  },
}));

const EditStagRequest = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const { control, handleSubmit, register, setValue } = useForm();
  const [selectedOptions, setSelectedOptions] = useState({
    sotProperties: [],
    platform: [],
  });

  const fetchData = async (id) => {
    try {
      const { data } = await getStagRequestById(id);

      const firstElement = data?.[0] || {};

      for (const [fieldKey, fieldValue] of Object.entries(firstElement)) {
        setValue(fieldKey, fieldValue);
      }

      const sotProperties = firstElement?.sotProperties || [];
      const platformArray = firstElement?.platform
        ? firstElement?.platform.split(",").map((item) => item.trim())
        : [];

      setSelectedOptions({
        sotProperties: JSON.parse(sotProperties),
        platform: platformArray,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAutocompleteChange = (fieldKey, selectedValues) => {
    setSelectedOptions((prevOptions) => ({ ...prevOptions, [fieldKey]: selectedValues }));
  };

  const onSubmit = async (data) => {
    const sotVariables = selectedOptions.sotProperties.reduce((acc, obj, index) => {
      index = index + 1;
      acc[`sotVar${index}`] = `${obj.tagName} \n (${obj.tagKey})`;
      return acc;
    }, {});

    const sotPropertiesString = JSON.stringify(selectedOptions.sotProperties || []);
    const platFormString = selectedOptions.platform.join(",") || "";
    const attachments = JSON.stringify(data.attachments || {});

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
      navigate("/"); // Redirect to the desired page upon successful submission
    } catch (error) {
      console.error("Error updating request:", error);
      // Handle the error, e.g., show a user-friendly message
    }
  };

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <Typography variant="h6" component="div">
          Edit Stag Request Form:
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {fieldNames.map(({ fieldKey, fieldLabel, fieldType }) =>
              fieldType === "TextField" ? (
                <Grid item xs={12} md={6} key={`${fieldKey}-textField`}>
                  <Controller
                    name={fieldKey}
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label={fieldLabel} variant="outlined" fullWidth {...register(fieldKey)} />
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
                onChange={(_, newValue) => handleAutocompleteChange("platform", newValue)}
                renderInput={(params) => <TextField {...params} variant="outlined" label="Select Platform" fullWidth />}
                renderOption={(props, option, { selected }) => (
                  <MenuItem {...props} key={option} value={option} sx={{ justifyContent: "space-between" }}>
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
                isOptionEqualToValue={(option, value) => option.tagName === value.tagName}
                disableCloseOnSelect
                value={selectedOptions.sotProperties || []}
                onChange={(_, newValue) => handleAutocompleteChange("sotProperties", newValue)}
                renderInput={(params) => <TextField {...params} variant="outlined" label="Select SOT Variables" fullWidth />}
                renderOption={(props, option, { selected }) => (
                  <MenuItem {...props} key={option.tagKey} value={option.tagName} sx={{ justifyContent: "space-between" }}>
                    {option.tagName}
                    {selected ? <CheckIcon color="info" /> : null}
                  </MenuItem>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" type="submit" color="primary">
                Update Request
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </div>
  );
};

export default EditStagRequest;
