import Categories from "./categories";
import "./pages.css";

function Home(data) {

  let arr = data.data;
  return (
    <div className="container">
      <Categories/>
      <div className="card-container">
        {
          arr.map(product =>
            <div className="card" key={Math.random()}>
              <div><img src={product.mainImage.secure_url} className="product-img" /></div>
              <div>{product.name}</div>
              <div className="price-div">${product.price}</div>
            </div>
          )
        }
      </div>
    </div>
    
  )
  }
  
  export default Home;