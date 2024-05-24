import "./pages.css";
import axios from 'axios'
import {useState} from "react";
import {object, string} from 'yup';
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";
function SignIn() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false)
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const handleChange = (e) => {
    const {name, value} = e.target
    setUser({
      ...user,
      [name]: value
    })
  }
  const validateData = async () =>{
    let LoginSchema = object({
      email: string().email("Please Enter Valid Email!!").required("Email Is Required"),
      password: string().min(8, "At Least 8 Character").max(30).required("Password Is Required"),
    });
    try{
      await LoginSchema.validate(await user,{abortEarly:false});
    }catch(error){
      console.log(error.errors)
    }
    
  }
  const handleSubmit =  async (e) => {
    e.preventDefault();
    setLoader(true)
    console.log(user)
    try{
      if(validateData()){
        const {data} = await axios.post(`${import.meta.env.VITE_API}/auth/signin`,
          {
            email: user.email,
            password: user.password
          }
        );
        
        localStorage.setItem('userToken',data.token)
        console.log(data.token)
        setUser({
          email: "",
          password: "",
        })
        toast('Your Account has been Login Successfully');

        navigate('/');
        return true
      }
    }catch(error){
      console.log(error)
    }
    finally{
      setLoader(false)
    }
    return false

    
  };
    return (
      <form onSubmit={handleSubmit}>
        <div className="container">
        <div className="login-div">
            <input type="text" className="creidentals-textbox" placeholder="Email"  name="email" value={user.email} onChange={handleChange}/>
            <input type="password" className="creidentals-textbox" placeholder="Password" name="password" value={user.password} onChange={handleChange}/>
            <p>forget password?</p>
            <button type="submit" className="submit-btn">{!loader? 'Login': 'wait'}</button>
        </div>
        </div>
        
      </form>
    )
  }
  
  export default SignIn;