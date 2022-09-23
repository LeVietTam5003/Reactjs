import React, { useState } from "react";
import Errors from './Errors'
import axios from "axios";
import { Link,  useNavigate} from "react-router-dom";
function Login(){

    const navigate = useNavigate();

    const [input,setInput] = useState({
        email:"",
        password:""
    })

    const [errors,setErrors] = useState({})

    function handleInput(e){
        let nameKey = e.target.name;
        let nameValue = e.target.value;
        setInput(state => ({...state,[nameKey]:nameValue}))
    }

    function handleSubmit(e){
        e.preventDefault();
        
        let objErrors = {};
        let check = 1;
        let formatEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;


        if(input.email === ""){
            check = 2;
            objErrors.email = "Bạn chưa nhập vào Email";
        }
        else{
            
            if(!formatEmail.test(input.email)){
                check = 2;
                objErrors.email = "Email không đúng";
            }
        }
        if(input.password === ""){
            check = 2;
            objErrors.password = "Bạn chưa nhập mật khẩu";
        }
        if(check === 2){
            setErrors(objErrors);
        }
        else{

            let data = {
                email:input.email,
                password:input.password,
                level:0
            }

            // console.log(data)
            // đẩy lên api
            axios.post('http://localhost/laravel/public/api/login', data)
                .then(res => {
                    if (res.data.errors) {
                        setErrors(res.data.errors)
                    } else {
                        let flag = true;
                        localStorage.setItem("Login", JSON.stringify(flag));
                        setErrors({})
                        alert("Đăng nhập thành công");
                        navigate('/');

                        // Khi login xong thì api sẻ trẻ về 1 token và 1 arr auth chưa tất cả thông tin user
                        // console.log(res);

                        //Sau khi đăng nhập thì phải gởi token và auth lên localstoge 
                        
                        // let Auth = res.data.Auth;
                        let Token_Auth = res.data;

                        // Đẩy lên localStoge
                        localStorage.setItem("token_auth", JSON.stringify(Token_Auth));

                    }
                    
                })
                .catch(errors => console.log(errors))
        }
    }

    

    return(
        <div className="col-sm-4 col-sm-offset-1 ">
            <div className="login-form">
            {/*login form*/}
            <h2 className="text-center">Login to your account</h2>
            <form action="" onSubmit={handleSubmit}>
                <input type="email" placeholder="Email Address" name='email' onChange={handleInput}/>
                <input type="password" placeholder="Password Address" name='password' onChange={handleInput}/>
                <Errors data={errors}/>
                <span>
                    <input type="checkbox" className="checkbox" /> 
                    Keep me signed in
                </span>
                <button type="submit" className="btn btn-default">
                Login
                </button>
            </form>
            </div>
        </div>
    )
}
export default Login;