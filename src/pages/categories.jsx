import "./pages.css";
import axios from 'axios'
import { useState,useEffect } from "react";
function Categories() {
  const [categories, setCategories] = useState([]);
  const  getCategories = async () => {
    const {data} =await axios.get(`${import.meta.env.VITE_API}/categories/active?limit=9`);
    setCategories(data.categories)
    console.log(data)    
  }
  useEffect(() => {
    getCategories();
  },[])
  console.log(categories)
    return (
      <div className="container">
       <div className="categories-container">
          {
            categories.map(categorie =>
              <div className="cate-card" key={categorie._id}>
                <div><img src={categorie.image.secure_url} className="categories-img" /></div>
              </div>
            )
          }
        </div>
      </div>
      
    )
  }
  
  export default Categories;