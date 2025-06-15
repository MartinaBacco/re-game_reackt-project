import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ConfirmSchema,
  getErrors,
  getFieldError,
} from "../../lib/validationForm";
import supabase from "../../supabase/supabase-client";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const { error, data } = ConfirmSchema.safeParse(formState);
    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
      console.log(errors);
    } else {
      let { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            username: data.username,
          },
        },
      });
      if (error) {
        alert("Signing up error 👎🏻!");
      } else {
        alert("Signed up 👍🏻!");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/");
      }
    }
  };

  const onBlur = (property) => () => {
    const message = getFieldError(ConfirmSchema, property, formState[property]);
    setFormErrors((prev) => ({ ...prev, [property]: message }));
    setTouchedFields((prev) => ({ ...prev, [property]: true }));
  };

  const isInvalid = (property) => {
    if (formSubmitted || touchedFields[property]) {
      return !!formErrors[property];
    }
    return undefined;
  };

  const setField = (property, valueSelector) => (e) => {
    setFormState((prev) => ({
      ...prev,
      [property]: valueSelector ? valueSelector(e) : e.target.value,
    }));
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold">Register now!</h1>
        </div>

        <div className="card bg-base-100 w-full max-w-md shadow-2xl p-8">
          <form onSubmit={onSubmit} noValidate className="space-y-4">

            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={setField("email")}
                onBlur={onBlur("email")}
                aria-invalid={isInvalid("email")}
                className="input input-bordered w-full"
              />
              {formErrors.email && (
                <small className="text-red-500">{formErrors.email}</small>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="firstName" className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formState.firstName}
                onChange={setField("firstName")}
                onBlur={onBlur("firstName")}
                aria-invalid={isInvalid("firstName")}
                className="input input-bordered w-full"
              />
              {formErrors.firstName && (
                <small className="text-red-500">{formErrors.firstName}</small>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="lastName" className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formState.lastName}
                onChange={setField("lastName")}
                onBlur={onBlur("lastName")}
                aria-invalid={isInvalid("lastName")}
                className="input input-bordered w-full"
              />
              {formErrors.lastName && (
                <small className="text-red-500">{formErrors.lastName}</small>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="username" className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formState.username}
                onChange={setField("username")}
                onBlur={onBlur("username")}
                aria-invalid={isInvalid("username")}
                className="input input-bordered w-full"
              />
              {formErrors.username && (
                <small className="text-red-500">{formErrors.username}</small>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formState.password}
                onChange={setField("password")}
                onBlur={onBlur("password")}
                aria-invalid={isInvalid("password")}
                className="input input-bordered w-full"
              />
              {formErrors.password && (
                <small className="text-red-500">{formErrors.password}</small>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
