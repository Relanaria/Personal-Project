import { useState } from "react";

export function useForm(initialValues, submitCallback) {
    const [values, setValues] = useState(initialValues);

    // Doesn't work with checkBox
    const changeHandler = (e) => {
        setValues(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        // On submit validation maybe?
        submitCallback(values);
    };

    return {
        values,
        changeHandler,
        submitHandler,
        setValues
    };
}
