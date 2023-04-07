import React from "react";
import CommonForm from "./common_components/CommonForm";
import * as Yup from "yup";
const SignIn = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .required("Required"),
  });

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];

  return (
    <CommonForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      fields={fields}
      submitButtonText="Log In"
    />
  );
};

export default SignIn;
