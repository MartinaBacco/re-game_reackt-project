import z from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const passwordError =
  "Password must contain at least one uppercase letter, one lowercase letter, and one number.";
export const FormSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(3),
  password: z.string().min(8).regex(passwordRegex, passwordError),
});

export const ConfirmSchema = FormSchema.refine((data) => data);

export const FormSchemaLogin = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const ConfirmSchemaLogin = FormSchemaLogin;

export function getFieldError(schema, property, value) {
  const { error } = schema.shape[property].safeParse(value);
  return error
    ? error.issues.map((issue) => issue.message).join(", ")
    : undefined;
}

export const getErrors = (error) =>
  error.issues.reduce((all, issue) => {
    const path = issue.path.join("");
    const message = all[path] ? all[path] + ", " : "";
    all[path] = message + issue.message;
    return all;
  }, {});