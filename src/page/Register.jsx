import React from 'react'
import { useForm } from "react-hook-form";
import { Context } from '../context/GlobalContext';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import '../styles/register.css'

const Register = () => {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        const response = await actions.register(data)
        if (response) {
            navigate('/')
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h4 className="text-center mt-5">Register</h4>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto my-5 p-4">
                        <div className="mb-3">
                            <label htmlFor="input" className="form-label">Email</label>
                            <input type="email" className="form-control " name='email' placeholder="email@example.com" {...register('email', { required: 'Email is required!' })} />
                            <small className="invalid-feedback"></small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="input" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" name="username" placeholder="Username" {...register('username', { required: 'Username is required!' })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="input" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="******"  {...register('password')} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="input" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="confirm_password" name='confirm_password' placeholder="******" {...register('confirm_password')} />
                        </div>
                        <Link to="/">
                            <button className="btn btn-primary">Create Account</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register