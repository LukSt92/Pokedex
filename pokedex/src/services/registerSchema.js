import * as z from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long." }),
    email: z.string().email({ message: "Incorrect email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        {
          message:
            "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character and be at least 8 characters long.",
        }
      ),
    confirm: z.string(),
  })
  .refine((userData) => userData.password === userData.confirm, {
    message: "Passwords do not match.",
    path: ["confirm"],
  });
