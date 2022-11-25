import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const LogIn = () => {

    const { signIn } = useContext(AuthContext);

    const { register, formState: { errors }, handleSubmit } = useForm();

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.form.pathname || '/';

    // for custom hook 
    const [loginUserEmail, setLoginUserEmail] = useState('');

    // const [token] = useToken(loginUserEmail);
    // if (token) {
    //     navigate(from, { replace: true });
    // }




    // custom login error 
    const [loginError, setLoginError] = useState('');

    const handleLogin = data => {

        // ager login error reset 
        setLoginError('');

        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                // console.log(user);

                setLoginUserEmail(user.email);

                // navigate(from, { replace: true });
            })
            .catch(error => {
                // console.error(error.message);
                setLoginError(error.message);
            })
    }


    return (
        <div className='h-[600px] flex justify-center items-center'>
            <div className='w-2/6 p-7'>
                <h2 className='text-4xl text-center'>Log In</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" {...register("email", { required: "Email address is required" })} className="input input-bordered w-full" />
                        {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 charcter or longer" }
                        })} className="input input-bordered w-full" />
                        {errors.password && <p className='text-red-500'>{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text">Forget Password</span>
                        </label>
                    </div>
                    <div>
                        {/* {
                            loginError &&
                            <p className='text-red-500'>{loginError}</p>
                        } */}
                    </div>
                    <input className='btn btn-primary w-full' value="Log in" type="submit" />
                </form>
                <p>New to Arrow Computer <Link to="/signup" className='text-primary'>Create a new account</Link></p>
                <div className="divider">OR</div>

                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default LogIn;