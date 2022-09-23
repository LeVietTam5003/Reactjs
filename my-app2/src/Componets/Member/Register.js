import React, { useEffect, useState } from "react";
import Errors from './Errors'
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        // avata:""
    })
    const [errors, setErrors] = useState({});
    const [getFile, setFile] = useState("");
    const [avata, setAvata] = useState("");

    function handleInput(e) {
        let keyName = e.target.name;
        let valueName = e.target.value;
        setInput(state => ({...state, [keyName]: valueName }))
    }

    // Code tham khao mã hoá image filereader viet theo Hook				
    function handleFile(e) {
        let files = e.target.files;
        let reader = new FileReader();
        reader.onload = (e) => {
            setAvata(e.target.result); //Cái này để gởi qua api
            setFile(files[0]);
        };
        reader.readAsDataURL(files[0]);
    }

    function handleSubmit(e) {
        e.preventDefault();

        let objErrors = {};
        let check = 1;
        let formatEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        // minh se tao 1 array chứa danh sach những đuôi file hình anh để kiểm tra
        let fileImg = ["png", "jpg", "jpeg", "PNG", "JPG"];

        if (input.name === "") {
            check = 2;
            objErrors.name = "Bạn chưa nhập thông tin Tên"
        }
        if (input.email === "") {
            check = 2;
            objErrors.email = "Bạn chưa nhập vào Email"
        } else {
            if (!formatEmail.test(input.email)) {
                check = 2;
                objErrors.email("Nhập Email sai định dạng")
            }
        }
        if (input.password === "") {
            check = 2;
            objErrors.password = "Bạn chưa nhập mật khẩu"
        }
        if (input.phone === "") {
            check = 2;
            objErrors.phone = "Bạn chưa nhập số điện thoại"
        }


        if (input.address === "") {
            check = 2;
            objErrors.address = "Bạn chưa nhập thông tin địa chỉ"
        }


        // console.log(getFile);
        if (getFile) {
            let nameFile = getFile.name;
            // console.log(nameFile);
            let nameTail = nameFile.split(".");
            // console.log(nameTail);
            if (getFile.size > (1024 * 1024)) {
                check = 2;
                objErrors.avata = "Dung lượn file quá lớn"
            }
            if (!fileImg.includes(nameTail[1])) {
                check = 2;
                objErrors.avata = "File ảnh không tồn tại"
            }
        } else {
            check = 2;
            objErrors.avata = "Không có tệp nào được chọn "
        }

        if (check === 1) {

            let data = {
                name: input.name,
                email: input.email,
                password: input.password,
                phone: input.phone,
                address: input.address,
                avatar: avata,
                level: 0
            }

            // console.log(input.name)
            // console.log(data)
            axios.post('http://localhost/laravel/public/api/register', data)
                .then(res => {
                    // console.log(res.data)
                    if (res.data.errors) {
                        setErrors(res.data.errors)
                    } else {
                        setErrors({})
                       alert("Đăng kí thành công");
                    }

                })
                .catch(errors => console.log(errors))


        } else {
            setErrors(objErrors);

        }
    }

    return ( 
        <div className="col-sm-4" >
            <div className = "signup-form " > 
        { /*login form*/ } 
        <h2 className = "text-center" > Login to your account </h2> 
        <form action = "#" onSubmit={ handleSubmit } enctype = "multipart/form-data" >
            <input type = "text"placeholder = "Enter Name"
            name = 'name'
            onChange = { handleInput }/>
            <input type = "email"
                placeholder = "Enter Email Address"
                name = 'email'
                onChange = { handleInput }/>
            <input type = "text"
                placeholder = "Password "
                name = 'password'
                onChange = { handleInput }/>
            <input type = "phone"
                placeholder = "Enter Phone "
                name = 'phone'
                onChange = { handleInput }/>
            <input type = "address"
                placeholder = "Enter Address"
                name = 'address'
                onChange = { handleInput }/> 
            <input type = "file"
                placeholder = "Fhile"
                name = 'avata'
                onChange = { handleFile }/>
            <Errors data = { errors }/>
            <button type = "submit" className = "btn btn-default" >Login</button> 
        </form> 
        </div> 
        </div>
    )
}

export default Register;