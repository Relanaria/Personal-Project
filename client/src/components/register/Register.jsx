import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { useRegister } from '../../hooks/useAuth';
import valitadeInputs from '../../util/validateFormInputs';
import { trimInputs } from '../../util/trimInputs';

import './register.css'; 

function Register() {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const initialValues = {
        email: '',
        password: '',
        username: '',
        confirmPassword: ''
    };

    const register = useRegister();

    const {values, changeHandler, submitHandler} = useForm(initialValues,async (userData) => {
        trimInputs(userData);
        let formErrors = valitadeInputs.validateRegisterInput(userData);
        try {
            
            if (Object.keys(formErrors).length > 0) {
                setErrors(formErrors);
                return;
            }
               await register(userData);
            navigate('/');
        } catch (error) {
            console.log(error);
            
            formErrors.email = 'Email already exists!';
            setErrors(formErrors);
            return;
        }
    });


    return (
        <div className="register-container">
            <h1>Register</h1>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        placeholder='email'
                        type="email"
                        id="email"
                        name="email"
                        onChange={changeHandler}
                        vlaue={values.email}
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        placeholder='username'
                        type="text"
                        id="username"
                        name="username"
                        onChange={changeHandler}
                        vlaue={values.username}
                        required
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        placeholder='password'
                        type="password"
                        id="password"
                        name="password"
                        onChange={changeHandler}
                        vlaue={values.password}
                        required
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        placeholder='confirmPassword'
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={changeHandler}
                        vlaue={values.confirmPassword}
                        required
                    />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
