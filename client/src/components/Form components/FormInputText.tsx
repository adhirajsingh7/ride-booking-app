import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const FormInputText = (props: FormInputProps) => {
  const { name, control, label, type } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          type={type}
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};

export default FormInputText;
