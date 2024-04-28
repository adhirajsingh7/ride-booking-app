import React, { useState } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import FormInputText from "../components/Form components/FormInputText";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerCarSchema, TRegisterCarSchema } from "../lib/type";
import { FormInputDropdown } from "../components/Form components/FormInputDropdown";
import { transmission_options } from "../lib/constants";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";

const RegisterCarPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const defaultValues = {
    brand: "",
    model: "",
    plate_no: "",
    seats_available: "",
    airbags: "",
    transmission: "",
    image: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterCarSchema>({
    defaultValues,
    resolver: zodResolver(registerCarSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    const formData = new FormData();
    formData.append("brand", data.brand);
    formData.append("model", data.model);
    formData.append("plate_no", data.plate_no);
    formData.append("seats_available", data.seats_available);
    formData.append("airbags", data.airbags);
    formData.append("transmission", data.transmission);
    formData.append("image", data.image[0] || "");
    console.log(data);
    console.log("form data");
    for (let data of formData) {
      console.log(data);
    }

    try {
      const response = await axios.post(`/cars/${params.user_id}`, formData);
      toast.success("Car registered successfully!");
      console.log(response);
    } catch (error) {
      toast.error("Car registration failed!");
      console.log(error);
    }
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // console.log(data.file[0]);
    // console.log("file : ", file);
  };
  const [image, setImage] = useState<string | null>(null);
  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: 1,
      }}
    >
      <IconButton onClick={() => navigate("/home")}>
        <ArrowBackIcon />
      </IconButton>
      <Box
        sx={{
          height: "calc(100% - 100px)",
          width: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          direction="column"
          gap={2}
          sx={{
            p: 8,
            border: 1,
            borderRadius: 6,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Stack direction="column" gap={2} sx={{ width: "350px" }}>
              <Typography variant="h4">Create Car</Typography>
              <Box
                sx={{
                  height: "100px",
                  width: "100px",
                  border: 1,
                  borderStyle: `${image ? "hidden" : "dashed"}`,
                  borderRadius: "50%",
                }}
              >
                {image ? (
                  <img
                    src={image}
                    alt=""
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <Stack
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      height: 1,
                      width: 1,
                    }}
                  >
                    Image
                  </Stack>
                )}
              </Box>
              <input
                // multiple
                type="file"
                {...register("image")}
                onChange={handleImageChange}
              />
              {/* {errors?.image?.message && <FormHelperText error={true} >{errors.image.message}</FormHelperText>} */}

              <FormInputText
                type="text"
                name={"brand"}
                control={control}
                label={"Brand"}
              />
              <FormInputText
                type="text"
                name={"model"}
                control={control}
                label={"Model"}
              />
              <FormInputText
                type="text"
                name={"plate_no"}
                control={control}
                label={"Plate no"}
              />
              <FormInputText
                type="number"
                name={"seats_available"}
                control={control}
                label={"Seats available"}
              />
              <FormInputText
                type="number"
                name={"airbags"}
                control={control}
                label={"Airbags"}
              />
              <FormInputDropdown
                name="transmission"
                control={control}
                label="Transmission"
                options={transmission_options}
                error={errors.transmission}
              />
              <LoadingButton
                size="small"
                type="submit"
                loading={isSubmitting}
                loadingPosition="center"
                variant="contained"
              >
                <span>Register car</span>
              </LoadingButton>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Box>
  );
};

export default RegisterCarPage;
