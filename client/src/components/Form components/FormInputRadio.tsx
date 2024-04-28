import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller } from "react-hook-form";
// import { FormInputProps } from "./FormInputProps";

export const FormInputRadio: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  options,
  error,
}) => {
  const generateRadioOptions = () => {
    return options.map((singleOption, index) => (
      <FormControlLabel
        key={index}
        value={singleOption.value}
        label={singleOption.label}
        control={<Radio />}
      />
    ));
  };

  return (
    <FormControl component="fieldset" error={!!error}>
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <RadioGroup row value={value} onChange={onChange}>
            {generateRadioOptions()}
          </RadioGroup>
        )}
      />
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};
