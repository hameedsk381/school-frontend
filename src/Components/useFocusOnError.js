import { useEffect, useRef } from 'react';

const useFocusOnError = (errors, formFields) => {
  const firstErrorFieldRef = useRef(null);

  useEffect(() => {
    const firstErrorField = Object.keys(errors).find((field) => errors[field]);

    if (firstErrorField) {
      const firstErrorFieldElement = Array.from(formFields).find(
        (field) => field.name === firstErrorField
      );

      if (firstErrorFieldElement) {
        firstErrorFieldRef.current = firstErrorFieldElement;
      }
    }
  }, [errors, formFields]);

  return firstErrorFieldRef;
};

export default useFocusOnError;