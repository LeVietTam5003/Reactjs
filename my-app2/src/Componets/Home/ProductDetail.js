import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
function ProductDetail(){
    const params = useParams();
        // console.log(params.id)
    const [getData,setData] = useState("");
    const [getImage,setImage] = useState("")
        useEffect(()=>{
            axios.get("http://localhost/laravel/public/api/product/detail/" + params.id)
            .then(res=>{
                console.log(res.data.data)
                setData(res.data.data);
                const image = res.data.data.image;
                const type = JSON.parse(image)
                setImage(type[0])
            })
        },[])

console.log(typeof getImage)

    return(
        <div className="col-sm-9 padding-right">
            <div className="product-details">
            {/*product-details*/}
            <div className="col-sm-5">
                <div className="view-product">
                <img src={"http://localhost/laravel/public/upload/user/product/" + getData.id_user + "/" + getImage} alt=""/>
                <Link to="images/product-details/1.jpg" rel="prettyPhoto">
                    <h3>ZOOM</h3>
                </Link>
                </div>
                <div id="similar-product" className="carousel slide" data-ride="carousel">
                {/* Wrapper for slides */}
                <div className="carousel-inner">
                    <div className="item">
                    <Link to="">
                        <img src="frontend/images/product-details/similar1.jpg" alt="" />
                    </Link>
                    <Link to="">
                        <img src="frontend/images/product-details/similar2.jpg" alt="" />
                    </Link>
                    <Link to="">
                        <img src="frontend/images/product-details/similar3.jpg" alt="" />
                    </Link>
                    </div>
                    <div className="item">
                    <Link to="">
                        <img src="frontend/images/product-details/similar1.jpg" alt="" />
                    </Link>
                    <Link to="">
                        <img src="frontend/images/product-details/similar2.jpg" alt="" />
                    </Link>
                    <Link to="">
                        <img src="frontend/images/product-details/similar3.jpg" alt="" />
                    </Link>
                    </div>
                    <div className="item active">
                    <Link to="">
                        <img src="frontend/images/product-details/similar1.jpg" alt="" />
                    </Link>
                    <Link to="">
                        <img src="frontend/images/product-details/similar2.jpg" alt="" />
                    </Link>
                    <Link to="">
                        <img src="frontend/images/product-details/similar3.jpg" alt="" />
                    </Link>
                    </div>
                </div>
                {/* Controls */}
                <Link
                    className="left item-control"
                    to="#similar-product"
                    data-slide="prev"
                >
                    <i className="fa fa-angle-left" />
                </Link>
                <Link
                    className="right item-control"
                    to="#similar-product"
                    data-slide="next"
                >
                    <i className="fa fa-angle-right" />
                </Link>
                </div>
            </div>
            <div className="col-sm-7">
                <div className="product-information">
                {/*/product-information*/}
                <img
                    src="images/product-details/new.jpg"
                    className="newarrival"
                    alt=""
                />
                <h2>Anne Klein Sleeveless Colorblock Scuba</h2>
                <p>Web ID: 1089772</p>
                <img src="images/product-details/rating.png" alt="" />
                <span>
                    <span>US ${getData.price}</span>
                    <label>Quantity:</label>
                    <input type="text" defaultValue={3} />
                    <button type="button" className="btn btn-fefault cart">
                    <i className="fa fa-shopping-cart" />
                    Add to cart
                    </button>
                </span>
                <p>
                    <b>Availability:</b> In Stock
                </p>
                <p>
                    <b>Condition:</b> New
                </p>
                <p>
                    <b>Brand:</b> E-SHOPPER
                </p>
                <Link to="">
                    <img
                    src="images/product-details/share.png"
                    className="share img-responsive"
                    alt=""
                    />
                </Link>
                </div>
                {/*/product-information*/}
            </div>
            </div>
        </div>
      
    )
}
export default ProductDetail;