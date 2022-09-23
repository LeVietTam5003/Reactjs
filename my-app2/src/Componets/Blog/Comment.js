import React,{useEffect,useState} from "react";
import {useParams,Link} from 'react-router-dom';
import axios from "axios";
import Errors from "../Member/Errors";
function Comment(props) {
    let params = useParams();//id của Id_blog để biết mình bình luận blog nào
    // console.log(params.id);
    // let data = props.getIdComment ? props.getIdComment : 0;
    // // console.log(data);
    // Tạo biến 
    const [comment,setComment] = useState("");
    const [errors,setErrors] = useState({});


    function handleInput(e){
        setComment(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        let localStoge = localStorage.getItem("Login");

        let errorsObj = {};
        // Muốn comment được thì phải kiểm tra đả login chưa
        // Nếu login rồi thì cho bình luận
        if(localStoge){
            // Kiểm tra bình luận chưa

            // Chưa thì in ra thông báo
            if(comment == ""){
                errorsObj.message = "Bạn chưa nhập nội dung";
                setErrors(errorsObj);
            }
            // bình luận rồi thì in ra thông báo
            else{
                // lấy biến lỗi về bằng " "
                setErrors({});
                // Lấy token bên localStoge xuống
                let userData = localStorage.getItem("token_auth");
                userData = JSON.parse(userData);
                // console.log(dataToken)
                
                // Đường dẫn api để gởi comment đúng params.id của phần mình chọn
                let url = 'http://localhost/laravel/public/api/blog/comment/' + params.id;

                //console.log(url)
                //{http://localhost/laravel/public/api/blog/comment/}+ với id của bài viết


                // Biến lấy token
                let accessToken = userData.success.token;
                // console.log(accessToken)
                
            
                // config để gởi token qua api
                let config = { 
                    headers: { 
                    'Authorization': 'Bearer '+ accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                    } 
                };	
                    const formData = new FormData();
                    // Những prams cần truyền qua api
                        formData.append('id_blog', params.id);//Lấy id_blog thông qua params.id
                        formData.append('id_user', userData.Auth.id)//Lấy id_user thông qua
                        formData.append('id_comment', props.getIdComment ? props.getIdComment : 0)
                        formData.append('comment', comment)
                        formData.append('image_user', userData.Auth.avatar)
                        formData.append('name_user', userData.Auth.name);

                        // ------------------------------------
                        // Gởi thông tin lên api:
                            // ('id_blog', params.id)
                            // ('id_user', userData.Auth.id)
                            // ('id_comment', 0)
                            // ('comment', comment)
                            // ('image_user', userData.Auth.avatar)
                            // ('name_user', userData.Auth.name)
                    // đẩy dử liệu lên Api
                    axios.post(url, formData, config)
                    .then(res=>{
                        console.log(res.data.data);
                        props.getComment(res.data.data);
                    })}
            
        } 
        // Nếu chưa login thì phải xuất ra thông tin bắc buộc login mới cho bình luận
        else{
            alert("Vui lòng đăng nhập");
        }   
    }

    // khi click vào nút này có hàm handleClickClear thì sẻ trả về giá trị set id bên detail
    function handleClickClear(e){
        props.deleteIdCon(0)
      }

    return (
        <div className="replay-box">
            <div className="row">
                <div className="col-sm-12">
                <h2>Leave a replay</h2>
                <div className="text-area">
                    <div className="blank-arrow">
                    <label>Your Name</label>
                    </div>
                    <span>*</span>
                    <form action="" onSubmit={handleSubmit}>
                        <textarea name="message" rows={11} defaultValue={""} onChange={handleInput}/>
                        <Errors data={errors}/>
                        <button className="btn btn-primary">
                            post comment
                        </button>
                    </form>
                        <button onClick={handleClickClear} className="btn btn-primary">
                            Clear ID
                        </button>
                </div>
                </div>
            </div>
        </div>

    )
}

export default Comment;