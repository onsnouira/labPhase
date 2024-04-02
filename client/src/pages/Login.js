import React, { useEffect } from 'react'
import "./style.css"
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../redux/slices/personSlice';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const { isAuth,errors: err } = useSelector(state => state.person)
  console.log(isAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {console.log(data);
    dispatch(signin(data))  }
console.log("errors", errors);
console.log("err",err);
useEffect(() => {
    if(isAuth) navigate('/')
}, [isAuth,navigate])
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" placeholder="Email" {...register("email", {required: true})} />
      <p className='error'> {errors.email && "email exist, please try to login"}</p>
      <input type="password" placeholder="Password" {...register("password", {required: true})} />
      <p className='error'> {errors.password && "weak password"}</p>

      <input type="submit" />
    </form>
    </div>
  )
}

export default Login
