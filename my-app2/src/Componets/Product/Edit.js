import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Errors from "../Member/Errors";

function Edit() {
    // Lấy id sản phẩm bên trang myproduct
    const prams = useParams();
    // console.log(prams)
    const [getData, setData] = useState("");
    const [getCategory,setCategory] = useState("");
    const [getBrand,setBrand] = useState("");
    const [getFile,setFile] = useState("");
    const [errors,setErrors] = useState({});
    const [getId,setId] = useState("");
    const [getNameImage,setNameImage] = useState("")

    // console.log(typeof(getNameImage))

    // console.log(getCategory)
// -----------------------------------------------------------------//

    const [inputs, setInput] = useState({
        name: "",
        price: "",
        detail: "",
        company_profile:"",
        category:"",
        brand:"",
        status:"",
        sale:""
    });
// -----------------------------------------------------------------//

    const status = [{
        "id":"3",
        "name": "Status",
    },
    {
        "id": 1,
        "name":"Sale",
    },
    {
        "id": 0,
        "name":"New"
    }
    ];
// -----------------------------------------------------------------//

    function renderStatus(){
        if(status.length>0){
            return status.map((value,key)=>{
                return(
                    <option key={value.id} value={value.id}  >
                        {value.name} 
                    </option>
                )   
            })
        }
    }

// -----------------------------------------------------------------//

    useEffect(() => {
        let userData = localStorage.getItem("token_auth")
        if (userData) {
            userData = JSON.parse(userData)
            // console.log(userData)
            // Lấy đường dẫn của sản phẩm đó kèm id
            let url = "http://localhost/laravel/public/api/user/product/" + prams.id;

            // Lấy token
            let getToken = userData.success.token;

            // truyền token bỏ vô confix
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + getToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };

            // Gọi ra
            axios.get(url, config)
                .then(res => { 
                    setData(res.data.data)
                    setId(res.data.data.status)
                    setInput({
                        name:res.data.data.name,
                        price:res.data.data.price,
                        company_profile:res.data.data.company_profile,
                        detail:res.data.data.detail,
                        category:res.data.data.id_category,
                        brand:res.data.data.id_brand,
                        status:res.data.data.status,
                        sale:res.data.data.sale,
                })
            })

            axios.get("http://localhost/laravel/public/api/category-brand")
            .then(res=>{
                // console.log(res)
                setCategory(res.data.category)
                setBrand(res.data.brand)
            })
        }
    }, [])
    // console.log(inputs.category)
    function clickId(e){
        let id = e.target.value;
        console.log(id)
        setId(id)
    }
// -----------------------------------------------------------------//


    function rederSale(){
        if(getId == 1){
            return(<label><input type="sale" placeholder="0" name='sale' value={inputs.sale} onChange={handleInput}/></label>)
        }
        else{
            return
        }
    }
// -----------------------------------------------------------------//

    function renderCategory(){
        if(getCategory.length>0){
            return getCategory.map((value,key)=>{
                return(
                    <option key={value.id} value={value.id}>{value.category}</option>
                )
            })
        }
    }
// -----------------------------------------------------------------//

    function renderBrand(){
        if(getBrand.length>0){
            return getBrand.map((value,key)=>{
                return(
                    <option key={value.id} value={value.id}>{value.brand}</option>
                )
            })
        }
    }

// -----------------------------------------------------------------//
  
    function handleInput(e) {
        let keyName = e.target.name;
        let valueName = e.target.value;
        setInput(state => ({...state, [keyName]: valueName }))
    }
// -----------------------------------------------------------------//

    function checKed(e){
        let name = e.target.value
        console.log(name)
        
        let check = e.target.checked;

        // Nếu check rồi thì bỏ cái tên của ảnh vào đây
        if(check){
            setNameImage(state => ([...state, name]))
        }
        else{
            let c = getNameImage.filter((item,i)=>{
                return (item != name)
            })
            // console.log(c)
            setNameImage(c)
        }
        console.log(check)
    }

    // 
// -----------------------------------------------------------------//

    function renderImage(){
        // console.log(getData)
        if(Object.keys(getData).length> 0){
            // console.log(getData.image)
            let renderImage = getData.image
            return renderImage.map((value, key)=>{
                return(
                    <li>
                        <img  className="image_edit" src={"http://localhost/laravel/public/upload/user/product/" + getData.id_user + "/" + value} alt=""  />
                        <input type="checkbox" value={value} name="avataCheckBox" onChange={checKed}/>
                    </li>
                )
            })
        }
    }
// -----------------------------------------------------------------//
// let a = inputs.sale ? inputs.sale : 0
// console.log(a)
    function handelFile(e){
        let File = e.target.files;
        setFile(File);
        console.log(File)
    }
// -----------------------------------------------------------------//

    function submitForm(e){
        e.preventDefault();

        let check = true;
        let objErorrs = {}
        let fileImg = ["png", "jpg", "jpeg", "PNG", "JPG"];
        if(inputs.name == undefined || inputs.name == ""){
            check = false;
            objErorrs.name = "Bạn chưa nhập Name"
        }
        if(inputs.price == undefined || inputs.price == ""){
            check = false;
            objErorrs.price = "Bạn chưa nhập Price"
        }
        if(inputs.company_profile == undefined || inputs.company_profile == ""){
            check = false;
            objErorrs.company_profile = "Bạn chưa nhập Company_profile"
        }
        if(inputs.detail == undefined || inputs.detail == ""){
            check = false;
            objErorrs.detail = "Bạn chưa nhập Detail"
        }
        // console.log(getFile.length + getNameImage.length)
        if((Object.keys(getFile).length + getNameImage.length) > 3){
            check = false
            objErorrs.avata = "Tối đa upload 3 hình"
        }

        if(Object.keys(getFile).length > 0){
            Object.keys(getFile).map((key,index)=>{
                let nameFile = getFile[key].name;
                let nameTail = nameFile.split(".");

                if (getFile[key].size > (1024 * 1024)) {
                    check = false;
                    objErorrs.avata = "Dung lượn file quá lớn"
                }
                if(getFile.length > 3){
                    check = false
                    objErorrs.avata = "Tối đa upload 3 hình"
                }
                if (!fileImg.includes(nameTail[1])) {
                    check = false;
                    objErorrs.avata = "File ảnh không tồn tại"
                }
            })
        }
        else{
            check = false;
            objErorrs.name = "Bạn chưa chọn file"
        }
        
        

        if(check === true){
            setErrors({})
            let userData = localStorage.getItem("token_auth");
            userData = JSON.parse(userData);
            let url = "http://localhost/laravel/public/api/user/edit-product/" + prams.id;

            let getToken = userData.success.token;
            let config = {
                headers: {
                'Authorization': 'Bearer '+ getToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                }
            }
            // console.log(inputs)
            const formData = new FormData();
            
            formData.append('name' , inputs.name)
            formData.append('price' , inputs.price)
            formData.append('category' , inputs.category)
            formData.append('brand' , inputs.brand)
            formData.append('company' , inputs.company_profile)
            formData.append('detail' , inputs.detail)
            formData.append('status' , inputs.status)
            formData.append('sale' , inputs.sale ? inputs.sale : 0)
            Object.keys(getFile).map((item,i)=>{
                formData.append('file[]' , getFile[item]) 
            })
            // getNameImage.map((item,i)=>{
            //     formData.append('file[]' , getFile[item]) 
            // })
            Object.keys(getNameImage).map((item,i)=>{
                formData.append('avatarCheckBox[]' , getNameImage[item]) 
            })

            axios.post(url, formData, config)
            .then(res => {
                console.log(res)
                if (res.data.errors) {
                    setErrors(res.data.errors)
                } else {
                    setErrors({})
                   alert("Cập nhật thành công");
                }

            })
            .catch(errors => console.log(errors))
        }
        
       else{
            setErrors(objErorrs)
        }
    }
// -----------------------------------------------------------------//

    return ( 
        <div className="col-sm-6" >
            <div className = "signup-form " > 
                <h2 className = "text-center" > Login to your account </h2> 
                <form onSubmit={submitForm} enctype="multipart/form-data" >
                    {/** Name */}
                    <input type="text" placeholder="Name" name='name' value={inputs.name} onChange={handleInput}/>
                    {/** Price */}
                    <input type="price" placeholder="Price" name='price' value={inputs.price} onChange={handleInput}/>
                    <div className="form-group">
                        <select className="custom-select" value={inputs.category} name='category' onChange={handleInput} >   
                            <option>Please choose category</option>
                            {renderCategory()}
                        </select>
                    </div>
                    <div className="form-group">
                        <select value={inputs.brand} className="custom-select" name='brand' onChange={handleInput}>    
                        <option>Please choose brand</option>
                        {renderBrand()}
                        </select>
                    </div>
                    <div className="form-group">
                        <select className="custom-select" name='status' value={inputs.status} onClick={clickId}  onChange={handleInput}>
                            {renderStatus()}
                        </select>
                    </div>
                    {rederSale()}
                    <input type="file" placeholder="Fhile" name='file' multiple onChange={handelFile}/>
                    <ul className="ul_image">
                        {renderImage()}
                    </ul>
                    {/** Company_profile */}
                    <input type="company_profile" placeholder="company_profile" name='company_profile' value={inputs.company_profile} onChange={handleInput}/>
                    {/** Detail */}
                    <textarea name="detail" placeholder="Detail" rows="10" cols="30" value={inputs.detail} onChange={handleInput}></textarea>
                    <Errors data = {errors}/>
                    <button type="submit" className="btn btn-default">Login</button>
                </form> 
            </div> 
        </div>        
    )
}

export default Edit;