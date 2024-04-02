import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { gettask, deletetask, addtask, updatetask } from '../redux/slices/todoSlice'
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';


const Home = () => {
  const dispatch=useDispatch()
 const [updated,setupdatetask]=useState({})
const [visible,setvisible]=useState({visibility:"hidden"})
 const handleChange=(e)=>{
  setupdatetask({...taskList,[e.target.name]:e.target.value})
  console.log(updated)
}
 
 const {taskList,isLoading}=useSelector(state => state.task)
 const { register, handleSubmit, formState: { errors } } = useForm();
 const onSubmit = data => {
  dispatch(addtask(data))
  console.log(data)};
 console.log(errors);
 useEffect(()=>{dispatch(gettask())},[dispatch])
 console.log(gettask())
  return (
    <div className='form'>
    <form  onSubmit={handleSubmit(onSubmit)}>
    <input type="text" placeholder="text" {...register('title')}/>
    <input type="text" placeholder="desc" {...register('desc')}/>
    <input type="submit" />
  </form>
  {isLoading && <p>Loading</p>}
  {Array.isArray(taskList) && taskList.map(el=>
  <div>
    <p>{el.title}</p>
    <p>{el.desc}</p>


    <button onClick={()=>{(visible.visibility==="hidden")
    ?   setvisible({visibility:"visible"}):setvisible({visibility:"hidden"})}}>update</button>

    <div style={visible}>
    <input type='text' placeholder='add task' name='title'onChange={handleChange}></input>
    <input type='text' placeholder='add desc' name='desc 'onChange={handleChange}></input>
   <button onClick={()=>dispatch(updatetask({...updated,_id:el._id}))}>Updating</button>

    </div>

   
  
  <Button onClick={()=>dispatch(deletetask(el))}>Delete</Button> 
   
  </div>
  )}
  </div>
  )
}

export default Home