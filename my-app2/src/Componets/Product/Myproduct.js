
import {Link} from "react-router-dom"
import React, { useEffect, useState } from "react";
import axios from "axios";
function Myproduct(){
    const [data,setData] = useState("")
    const [getId,setId] = useState("")
    // console.log(getId)
    useEffect(()=>{
        let userData = localStorage.getItem("token_auth")
        if(userData) {
            userData = JSON.parse(userData);
            // console.log(userData)
            let url = "http://localhost/laravel/public/api/user/my-product"
            
            let accessToken = userData.success.token;
            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
            };	

            axios.get(url,config)
            .then(res=>{
                console.log(res.data.data)
                setData(res.data.data)

            })   
        }
    },[])

    function checkId(e){
        let getId=e.target.value;
        // console.log(id)
        let urlDelete = "http://localhost/laravel/public/api/user/delete-product/" + getId;
        // console.log(urlDelete)
        let userData =JSON.parse(localStorage.getItem("token_auth"))
        let accessToken = userData.success.token;
            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                } 
            };	
            axios.get(urlDelete,config)
            .then(res=>{
                console.log(res.data.data)
                setData(res.data.data)

        })
    }
    function renderData(){
        return  Object.keys(data).map((value,key)=>{
        // Lấy hình ảnh dưới dạng mả hóa
        // let a = JSON.parse(data[value].image) 
        // console.log(a);
        return(
            <tr key={data[value].id}>
                <td>
                    {data[value].id}
                </td>
                <td>
                    {data[value].name}
                </td>
                <td>
                    <img className="image_product" src={"http://localhost/laravel/public/upload/user/product/" + data[value].id_user +"/" + (JSON.parse(data[value].image))[0]} alt="" />
                </td>
                <td>
                    ${data[value].price}
                </td>
                <td>
                {/**to={"/edit/" + data[value].id} để truyền qua prams*/}
                <Link to={"/account/myproduct/edit/" + data[value].id}>Edit</Link>  
                <button value={data[value].id}  onClick={checkId}>X</button>
                </td>
            </tr>
        )
    })}
    return(
        <div className="col-sm-9">
        <div className="table-responsive cart_info">
                <table className="table table-condensed">
                    <thead>
                        <tr className="cart_menu">
                            <td className="id">ID</td>   
                            <td className="name">Name</td>  
                            <td className="image">Image</td>                       
                            <td className="price">Price</td>
                            <td className="action">Action</td>
                            <td />
                        </tr>
                    </thead>
                    <tbody>
                        {renderData()}
                    </tbody>
                    <tfoot>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    <td className="addmore"> <Link to = "/account/addproduct" >Add New</Link> </td>
          </tfoot>
                </table>
        </div>
       
        </div>
    )
}

export default Myproduct;
