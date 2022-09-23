import React,{useEffect,useState} from "react";
import {useParams,Link} from 'react-router-dom';
import Comment from "./Comment";
import Rate from "./Rate";
import ListComment from "./ListComment";
import axios from "axios";

function Detail(props){


    // Lấy thông tin id khi click vào phần sản phẩm nào
    let params = useParams();
    // console.log(params.id)

    // Tạo biến data rỗng 
    const [data,setData] = useState({});
    // Tạo biến data rỗng và sau khi có dử liệu từ mỗi id
    const [comment,setComment] = useState([]);
    
    // --------------------------------------//

    const [getIdRely,setIdRely] = useState("")
    // - click reply lay ID cm cha.
    // - truyen ID qua detail
    // - tu detail truyền qua comment 
    // - comment qua api
    
    function getIdCommentCha(getIdCha){
      setIdRely(getIdCha);
    }
    
    // --------------------------------------//
    function getComment(newComment){
      let joinComent = comment.concat(newComment)    
      // console.log(joinComent);
      setComment(joinComent)
    }
 
    // console.log(comment)

    useEffect(()=>{
      // Lấy thông tin danh sách bên Blog qua theo id từ blog để biết mình chọn phần nào bên index và show
      // danh mục của sản phẩm đó xuống bằng params.id  bên
      // (<Link className="btn btn-primary" to={"/blog/detail/" + key.id} >Read More </Link>)
        axios.get('http://localhost/laravel/public/api/blog/detail/' + params.id)
        .then(res=>{
          // khi lấy về thì đẩy dử liệu lên biến data sau khi biến data đc đẩy lên thì 
          // data đả có dử liệu
          // console.log(res)
          setData(res.data.data);
          //  Lấy giá trị id
          setComment(res.data.data.comment)
          // console.log(res.data.data.comment);

        })
        .catch(errors=>console.log(errors));
    },[]);
    // if(data.length>0){
    //   return data.map((value, key)=>{
    //       return(
    //           <div key={key} className="single-blog-post">
    // console.log(comment);
    function renderData(){
            return(
                <div className="blog-post-area">
                  <div className="single-blog-post">
                    <h3>{data.title}</h3>
                    <div className="post-meta">
                      <ul>
                        <li>
                          <i className="fa fa-user" /> Mac Doe
                        </li>
                        <li>
                          <i className="fa fa-clock-o" /> {data.created_at}
                        </li>
                        <li>
                          <i className="fa fa-calendar" /> {data.updated_at}
                        </li>
                      </ul>
                    </div>
                    <Link to="">
                    <img src={"http://localhost/laravel/public/upload/Blog/image/" + data.image} alt="" />
                    </Link>
                    <p>{data.description}</p>
                    <br />
                    <p>{data.content}</p>
                    <br />
                    <p>{data.description}</p>
                    <br />
                    <p>{data.content}</p>
                    <div className="pager-area">
                      <ul className="pager pull-right">
                        <li>
                          <Link to="/">Pre</Link>
                        </li>
                        <li>
                          <Link to="/">Next</Link>
                        </li>
                      </ul>
                    </div>
                  </div> 
                </div>
            )
    }

    return(
        <div>
        <div className="col-sm-3">
            
          </div>
          <div className="col-sm-9">
              <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>

                {renderData()}

                <Rate/>

                <div className="response-area">
                  {/** LISTCOMMENT
                  Sau khi mình có đc comment rồi thì mình gọi  ListComment truyền 
                  thông tin comment qua Listcoment qua sử lí
                */}
                  <h2>{comment.length} RESPONSES</h2>
                  <ListComment data={comment} getIdListComment={getIdCommentCha}/>
                  {/** LISTCOMMENT*/}
                  
                  {/** COMMENT*/}
                  <Comment deleteIdCon={getIdCommentCha} getComment={getComment} getIdComment={getIdRely}/>
                  {/** COMMENT*/}
                </div>
              </div>
          </div>
      </div>
    )
}
export default Detail;