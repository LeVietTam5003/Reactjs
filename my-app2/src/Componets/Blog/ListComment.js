import React from "react";
import {Link} from "react-router-dom";

function ListComment(props){
    // qua bên đây sẻ nhận thông tin từ bên Deteil qua và kiểm tra
    // console.log(props.data);
    // Hàm lấy id con Reply
    function handleID(e){
      let getId = e.target.id;
    //   console.log(getId);
      let getIdListComment = props.getIdListComment;
      getIdListComment(getId)
    }
    // console.log(data)
    function renderData(){
        // kiểm tra data có rỗng hay không
        // Nếu không rỗng thì cho return
        let data = props.data;
        // console.log(data)
        
        if(data.length > 0){
            return data.map((value,key)=>{
                if( parseInt(value.id_comment) == 0){
                    return(
                        <>
                            <li key={key} className="media">
                                <Link className="pull-left" to="">
                                <img className="media-object" 
                                src={"http://localhost/laravel/public/upload/user/avatar/" + value.image_user} alt="" />
                                </Link>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user" />{value.name_user}</li>
                                        <li><i className="fa fa-clock-o" /> {value.updated_at}</li>
                                        <li><i className="fa fa-calendar" /> {value.created_at}</li>
                                    </ul>
                                    <p> {value.comment} </p>
                                    <Link className="btn btn-primary" to id={value.id}  onClick={handleID}><i className="fa fa-reply" />Reply</Link>
                                </div>                       
                            </li>
                            {data.map((value1, key1)=>{
                                // if(value.id != 0 && parseInt(value1.id_comment) == parseInt(value.id)){
                                //     console.log(value1.comment);
                                // }
                                console.log(key1);
                                if((value1.id_comment != 0) && parseInt(value1.id_comment) == parseInt(value.id)){
                                  return(
                                    <li key={key1} className="media second-media">
                                        <Link className="pull-left" to>
                                          <img className="media-object" src={"http://localhost/laravel/public/upload/user/avatar/" + value1.image_user} alt="" />
                                        </Link>
                                        <div className="media-body">
                                          <ul className="sinlge-post-meta">
                                            <li><i className="fa fa-user" />{value1.name_user}</li>
                                            <li><i className="fa fa-clock-o" />{value1.updated_at}</li>
                                            <li><i className="fa fa-calendar" />{value1.created_at}</li>
                                          </ul>
                                          <p>{value1.comment}</p>
                                          <Link className="btn btn-primary" to><i className="fa fa-reply" />Replay</Link>
                                        </div>
                                    </li> 
                                  )
                                }
                            }) 
                            }
                        </>
                    )
                }
            })
        }
        else{
            return(
                <div className="text-center">
                    <h4>Không có danh sách comment</h4>
                </div>
            )
        }
    }
    return(
        <ul className="media-list">
            {renderData()}
        </ul> 
    )
}

export default ListComment;