import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const SignUp = () => {

    const { signUp, updateUser, googleSignIn } = useContext(AuthContext);

    const [signUpError, setSignUpError] = useState('');

    const { register, formState: { errors }, handleSubmit } = useForm();

    const [createdUserEmail, setCreatedUserEmail] = useState('');

    // custom hook 
    // const [token] = useToken(createdUserEmail);

    // after login navigate to home page 
    const navigate = useNavigate();

    // if (token) {
    //     navigate('/');
    // }

    const handleSignUp = data => {
        // console.log(data);

        setSignUpError('');

        signUp(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);

                // toast 
                toast.success("SignUp successfully");
                navigate('/');

                saveUser(data.name, data.email, data.role);

                // update user info 
                // const userInfo = {
                //     displayName: data.name,
                //     role: data.role
                // }

                // updateUser(userInfo)
                //     .then(() => {
                //         saveUser(data.name, data.email, data.role);

                //     })
                //     .catch(error => console.error(error));
            })
            .catch(error => {
                // console.error(error.message);
                setSignUpError(error.message);
            })
    }

    const saveUser = (name, email, role) => {
        const user = { name, email, role };

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(d => {

                if (d.acknowledged) {
                    setCreatedUserEmail(user.email);
                }
            })
    }


    const signInWithGoogle = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success("SignUp successfully");
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            })
    }

    // ********************************************************************
    // atar bodole custom hook use kora hoice 
    // jwt token 
    // const getUserToken = email => {
    //     fetch(`http://localhost:5000/jwt?email=${email}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.accessToken) {

    //                 // local Storage er moddhe jwt token set korbe 
    //                 localStorage.setItem('accessToken', data.accessToken);
    //                 navigate('/');
    //             }
    //         })
    // }
    // *****************************************************************
    return (
        <div className='h-[600px] flex justify-center items-center'>
            <div className='w-2/6 p-7'>
                <h2 className='text-4xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", { required: "Name is required" })} className="input input-bordered w-full" />

                        {/* error message  */}
                        {errors.name && <p className='text-red-500'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Select your role</span>
                        </label>
                        <select {...register("role", { required: "role is required" })}
                            className="select select-bordered w-full ">
                            <option selected>Buyer</option>
                            <option>Seller</option>
                        </select>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" {...register("email", { required: "Email address is required" })} className="input input-bordered w-full" />

                        {/* error message  */}
                        {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: "Password is required",

                            // minimum length 
                            minLength: { value: 6, message: "Password must be 6 chactar or longer" },

                            // password pattern 
                            pattern:
                            {
                                value: /(?=.*[A-Z].*[A-Z])/,
                                message: 'Password must have 2 upper case'
                            }

                        })} className="input input-bordered w-full" />

                        {/* error message  */}
                        {errors.password && <p className='text-red-500'>{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text">Forget Password?</span>
                        </label>
                    </div>

                    <div>
                        {
                            signUpError &&
                            <p className='text-red-500'>{signUpError}</p>
                        }
                    </div>
                    <input className='btn btn-primary w-full' value="Login" type="submit" />
                </form>
                <p>Already have an <Link to="/login" className='text-primary'>Please Login</Link></p>
                <div className="divider">OR</div>

                <button onClick={signInWithGoogle} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;