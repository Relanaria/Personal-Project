import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';

import { useLogin } from '../../hooks/useAuth';
import valitadeInputs from '../../util/validateFormInputs';

import './login.css';

export default function Login() {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const initialValues = {
        email: '',
        password: '',
    };

    const login = useLogin();

    const {values, changeHandler, submitHandler} = useForm(initialValues,async ({email, password}) => {
        let formErrors = valitadeInputs.validateLoginInput(email, password);
        try {
            
            if (Object.keys(formErrors).length > 0) {
                setErrors(formErrors);
                return;
            }
            
            await login(email, password);

            navigate('/');
        } catch (error) {
            formErrors.invalidInput = 'Invalid Email or password!';
            setErrors(formErrors);
            return;
        }
    })

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        placeholder='email'
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={changeHandler}
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        placeholder='password'
                        type="password"
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={changeHandler}
                        required
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                {errors.invalidInput && <p className="error">{errors.invalidInput}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}


