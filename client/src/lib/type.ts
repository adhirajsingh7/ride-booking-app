import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_UPLOAD_SIZE } from "./constants";
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const signUpSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  full_name: z.string().min(1, { message: "Full name is required" }),
  mobile: z
    .string()
    .regex(phoneRegex, { message: "Invalid phone number" })
    .min(5, { message: "Phone must contain at least 5 characters" })
    .max(16, { message: "Phone contain at most 16 characters" }),
  role: z.string().min(1, { message: "Role is required" }),
  avatar: z.any(),
});

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export const registerCarSchema = z.object({
  brand: z.string().min(1, { message: "Brand is required" }),
  model: z.string().min(1, { message: "Model is required" }),
  plate_no: z.string().min(1, { message: "Plate no is required" }),
  seats_available: z.coerce
    .number()
    .gt(1, { message: "Seats available is required" })
    .lte(3, { message: "Too many seats, must be a car not truck" }),
  // seats_available: z
  //   .string()
  //   .min(1, { message: "Seats available is required" }),
  airbags: z.coerce
    .number()
    .gt(1, { message: "Airbags is required" })
    .lte(10, { message: "Too much Airbags, must be less than 10" }),
  // airbags: z
  //   .number()
  //   .lte(10, { message: "Too much Airbags, must be less than 10" }),
  // .min(1, { message: "Airbags is required" }),
  transmission: z.string().min(1, { message: "Transmission is required" }),
  image: z.any(),
  // .refine((files) => files?.length !== 0, "Car image is required")
  // .refine(
  //   (files) => files?.[0]?.size <= MAX_UPLOAD_SIZE,
  //   "Max image size is 5MB"
  // )
  // .refine(
  //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //   "Only .jpg, .jpeg, .png and .webp formats are supported"
  // ),
});

export type TRegisterCarSchema = z.infer<typeof registerCarSchema>;
