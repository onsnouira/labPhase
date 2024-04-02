import React, { useEffect } from 'react'
import "./style.css"
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/slices/personSlice';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const { isAuth,errors: err } = useSelector(state => state.person)
  console.log(isAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {console.log(data);
    dispatch(signup(data))  }
console.log("errors", errors);
console.log("err",err);
useEffect(() => {
    if(isAuth) navigate('/')
}, [isAuth,navigate])
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Name" {...register("name", {required: true, min: -1, maxLength: 20})} />
      <p className='error'>{errors.name && "this field if required "}</p>
      <input type="text" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
      <p className='error'>{errors.email && "email exit, please try to login" }</p>
      <input type="password" placeholder="Password" {...register("password", {required: true, max: 12, min: 6, maxLength: 12, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i})} />
      <p className='error'>{errors.password && "email exit, please try to login" }</p>
<br/>
      <input type="submit" />
    </form>
    </div>
  )
}

export default Register
