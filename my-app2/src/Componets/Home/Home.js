import React,{useEffect, useState , useContext} from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import { UserContext } from "../UserContext/UserContext";
function Home(){
    const user =  useContext(UserContext);
    // console.log(user)
    const [getData,setData] = useState("");
    useEffect(()=>{
        axios.get("http://localhost/laravel/public/api/product")
        .then(res=>{
            setData(res.data.data)
        })
    },[])

// lay getID = 1
//  obj = {
//     getId:1
//  }
//  => local 
    function buyCart(e){
        // lấy id củ cart đó
        let getId = e.target.id;
        let item = {};
        let check = 1
        let tongQty = 0
        let getLocal = localStorage.getItem("item")  
        if (getLocal) {
            item = JSON.parse(getLocal)
            Object.keys(item).map((value,key)=>{
                console.log(value)
                if(getId == value){ 
                    check = 2
                    item[value] += 1
                }   
                tongQty+=item[value]
            })
        }
        if(check == 1){
            item[getId] = 1 ;
            tongQty+=1
        }
        // console.log(tongQty)
// -----------------------------------------//
        // Đưa vào APP
        console.log("1");
        user.getTongProduct(tongQty)
// -----------------------------------------//
        localStorage.setItem("item", JSON.stringify(item))
    }

    function renderData(){
        if(getData.length > 0){
            return getData.map((value,key)=>{
                let a = value.image;
                let b = JSON.parse(a); 
                let image = b[0];
               
                return(
                    <div className="col-sm-4">
                        <div className="product-image-wrapper">
                            <div className="single-products">
                            <div className="productinfo text-center" id="products1">
                                <img src={"http://localhost/laravel/public/upload/user/product/" + value.id_user + "/" + image} alt="" />
                                <h2>{value.price}</h2>
                                <p>{value.name}</p>
                                <Link to className="btn btn-default add-to-cart">
                                <i className="fa fa-shopping-cart" />
                                Add to cart
                                </Link>
                            </div>
                            <div className="product-overlay">
                                <div className="overlay-content">
                                <h2>{value.price}</h2>
                                <p>{value.name}</p>
                                <Link to className="btn btn-default add-to-cart" id={value.id} onClick={buyCart}>
                                    <i className="fa fa-shopping-cart" />
                                    Add to cart
                                </Link>
                                </div>
                            </div>
                            </div>
                            <div className="choose">
                            <ul className="nav nav-pills nav-justified">
                                <li>
                                <Link to>
                                    <i className="fa fa-plus-square" />
                                    Add to wishlist
                                </Link>
                                </li>
                                <li>
                                <Link to={"/productdetail/" + value.id} id={value.id} onClick={buyCart}>
                                    <i className="fa fa-plus-square" />
                                    Add to compare
                                </Link>
                                </li>
                            </ul>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    return(
        <div>
        <section>
        <div className="container">
            <div className="row">
            <div className="col-sm-9 padding-right">
                <div className="features_items">{/*features_items*/}
                <h2 className="title text-center">Features Items</h2>
                {renderData()}
                </div>{/*features_items*/} 
            </div>
            </div>
        </div>
        </section>
            
        </div>
    )
}
export default Home;