import "./pages.css";
import {useState} from "react"
import axios from 'axios'
import { object, string} from 'yup';
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false)
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    image: ""
  })
  const handleChange = (e) => {
    const {name, value} = e.target
    setUser({
      ...user,
      [name]: value
    })
  }
  const handleImageChange = (e) => {
    const {name, files} = e.target
    setUser({
      ...user,
      [name]: files[0]
    })
  }
  const validateData = async () =>{
    let RegisterSchema = object({
      username: string().min(5).max(30).required("Is Required"),
      email: string().email("Please Enter Valid Email!!").required("Email Is Required"),
      password: string().min(8, "At Least 8 Character").max(30).required("Password Is Required"),
      image: string().required("Is Required"),
    });
    try{
      await RegisterSchema.validate(await user,{abortEarly:false});
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
        const formData = new FormData();
        formData.append('email',user.email)
        formData.append('password',user.password)
        formData.append('userName',user.username)
        formData.append('image',user.image)
        const {data} = await axios.post(`${import.meta.env.VITE_API}/auth/signup`,formData);
        setUser({
          email: "",
          password: "",
          username: "",
          image: e.target["image"].value = []
        })
        if(data.message == 'success'){
          toast('Your Account has been Reigester Successfully')
        }
        navigate('/signin');
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
          <input type="text" className="creidentals-textbox" placeholder="Email" name="email" value={user.email} onChange={handleChange} />
          <input type="password" className="creidentals-textbox" placeholder="Password" name="password" value={user.password} onChange={handleChange} />
          <input type="text" className="creidentals-textbox" placeholder="Name"  name="username" value={user.username} onChange={handleChange} />
          <input type="file" className="creidentals-textbox" name="image" onChange={handleImageChange} />
          <button type="submit" className="submit-btn">{!loader? 'Register': 'wait'}</button>
        </div>
      </div>
    </form>
  )
}
  export default SignUp;