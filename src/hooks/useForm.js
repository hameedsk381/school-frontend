import { useState } from 'react';

const useForm = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validationRules(values));
    setIsSubmitting(true);
  };

  const handleBlur = () => {
    setErrors(validationRules(values));
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
  };
};

export default useForm;
