import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller } from "react-hook-form";

export const FormInputDropdown: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  options,
  error,
}) => {
  const generateSingleOptions = () => {
    return options?.map((option: any, index) => {
      return (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };
  return (
    <FormControl size={"small"} error={!!error}>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Select label={label} onChange={onChange} value={value}>
              {generateSingleOptions()}
            </Select>
            <FormHelperText>{error ? error.message : null}</FormHelperText>
          </>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};
