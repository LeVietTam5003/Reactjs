import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function Index(){

    const [getItem,setItem] = useState([]);

    useEffect(()=>{
      // Lấy thông tin từ abiblog xuống
        axios.get("http://localhost/laravel/public/api/blog")
        .then(res=>{
            setItem(res.data.blog.data)
            // console.log(res.data.blog.data);
        })
        .catch(errors=>console.log(errors));
    },[]);

    function renderItem(){
      if(getItem.length > 0){
            return getItem.map((key,value)=>{
                return(
                  <div className="single-blog-post" key={key.id}>
                  <h3>{key.title}</h3>
                  <div className="post-meta">
                  <ul>
                    <li>
                      <i className="fa fa-user" /> Mac Doe
                    </li>
                    <li>
                      <i className="fa fa-clock-o" /> {key.created_at}
                    </li>
                    <li>
                      <i className="fa fa-calendar" /> {key.updated_at}
                    </li>
                  </ul>
                  <span>
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-half-o" />
                  </span>
                </div>
                <Link to="">
                {/*Lấy hình ảnh trên api*/}
                  <img src={"http://localhost/laravel/public/upload/Blog/image/" + key.image} alt="" />
                </Link>
                <p>
                  {key.content}
                </p>
                {/** dùng để chọn để biết click vào phần nào của blog */}
                <Link className="btn btn-primary" to={"/blog/detail/" + key.id} >
                  Read More
                </Link>
                  </div> 
                )
            })
        }
    }
    return(
      <div>
        <div className="col-sm-3">
          </div>
          <div className="col-sm-9">
              <div className="blog-post-area">
                  <h2 className="title text-center">Latest From our Blog</h2>
                  {renderItem()}
                  <div className="pagination-area">
                  <ul className="pagination">
                    <li>
                      <Link to="" className="active">
                        1
                      </Link>
                    </li>
                    <li>
                      <Link to="">2</Link>
                    </li>
                    <li>
                      <Link to="">3</Link>
                    </li>
                    <li>
                      <Link to="">
                        <i className="fa fa-angle-double-right" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
          </div>
      </div>
      
    )
}

export default Index;