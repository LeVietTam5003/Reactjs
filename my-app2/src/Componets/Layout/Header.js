import { useContext, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
// import { UserContext } from "../UserContext/UserContext";
// import { useEffect, useState } from "react";


function Header(){
  // const user =  useContext(UserContext);
  
  const navigate = useNavigate();
  function renderLogin(){
// gọi local Stoge xuống
    // Nếu co
    let getLocalStolore = localStorage.getItem("Login")
    if (getLocalStolore) {
        return(
        <li onClick={logoin}><Link to="/Login"><i className="fa-sign-out"></i>Logout</Link></li>
      )
    }
    else{
      return(
        <li><Link to="/Login"><i className="fa-sign-in"></i>Login </Link></li>
      )
    }
  }  

  function logoin(){
    localStorage.removeItem('auth_token')
		navigate("/Login")
	}
  // function logout(){
	// 	navigate("/Register")
	// }

  function rederCart(){
    // console.log(props.getQty)
    // let objLocal = props.getQty;
    // let sum = 0
    // Object.keys(objLocal).map((value,key)=>{
    //   sum+=objLocal[value]
    // })
    // return(<span>{sum}</span>)
    // console.log(user.qty)
    // return(user.getQty)

    console.log("3");
    // Gọi local
    let item1 = localStorage.getItem("item1");
    if(item1){
      item1 = JSON.parse(item1)
      return item1
    } 
  } 

  return(
      <header id="header">
        {/*header*/}
        <div className="header_top">
          {/*header_top*/}
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <div className="contactinfo">
                  <ul className="nav nav-pills">
                    <li>
                      <Link to="">
                        <i className="fa fa-phone" /> +2 95 01 88 821
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <i className="fa fa-envelope" /> info@domain.com
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="social-icons pull-right">
                  <ul className="nav navbar-nav">
                    <li>
                      <Link to="">
                        <i className="fa fa-facebook" />
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <i className="fa fa-twitter" />
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <i className="fa fa-linkedin" />
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <i className="fa fa-dribbble" />
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <i className="fa fa-google-plus" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*/header_top*/}
        <div className="header-middle">
          {/*header-middle*/}
          <div className="container">
            <div className="row">
              <div className="col-md-4 clearfix">
                <div className="logo pull-left">
                  <Link to="/">
                    <img src="frontend/images/home/logo.png" alt="" />
                  </Link>
                </div>
                <div className="btn-group pull-right clearfix">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle usa"
                      data-toggle="dropdown"
                    >
                      USA
                      <span className="caret" />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="">Canada</Link>
                      </li>
                      <li>
                        <Link to="">UK</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle usa"
                      data-toggle="dropdown"
                    >
                      DOLLAR
                      <span className="caret" />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="">Canadian Dollar</Link>
                      </li>
                      <li>
                        <Link to="">Pound</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-8 clearfix">
                <div className="shop-menu clearfix pull-right">
                  <ul className="nav navbar-nav">
                    <li>
                      <Link to="/account/update">
                        <i className="fa fa-user" /> Account
                      </Link>
                    </li>
                    <li>
                      <Link to>
                        <i className="fa fa-star" /> Wishlist
                      </Link>
                    </li>
                    <li>
                      <Link to="checkout.html">
                        <i className="fa fa-crosshairs" /> Checkout
                      </Link>
                    </li>
                    <li>
                      <Link to="/cart">
                        <i className="fa fa-shopping-cart" /> Cart {rederCart()}
                      </Link>
                    </li>
                    
                   {/*  <li>  <Link to={"/Login"}>
                        <i className="fa fa-lock" /> Login
                      </Link></li>*/}
                      {renderLogin()}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*/header-middle*/}
        <div className="header-bottom">
          {/*header-bottom*/}
          <div className="container">
            <div className="row">
              <div className="col-sm-9">
                <div className="navbar-header">
                  <button
                    type="button"
                    className="navbar-toggle"
                    data-toggle="collapse"
                    data-target=".navbar-collapse"
                  >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                  </button>
                </div>
                <div className="mainmenu pull-left">
                  <ul className="nav navbar-nav collapse navbar-collapse">
                    <li>
                      <Link to="/" className="active">
                        Home
                      </Link>
                    </li>
                    <li className="dropdown">
                      <Link to="">
                        Shop
                        <i className="fa fa-angle-down" />
                      </Link>
                      <ul role="menu" className="sub-menu">
                        <li>
                          <Link to="shop.html">Products</Link>
                        </li>
                        <li>
                          <Link to="product-details.html">Product Details</Link>
                        </li>
                        <li>
                          <Link to="checkout.html">Checkout</Link>
                        </li>
                        <li>
                          <Link to="cart.html">Cart</Link>
                        </li>
                        <li>
                        <Link to="/Login">Login</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <Link to="">
                        Blog
                        <i className="fa fa-angle-down" />
                      </Link>
                      <ul role="menu" className="sub-menu">
                        <li>
                          <Link to="/blog/list">Blog List</Link>
                        </li>
                        <li>
                          <Link to="blog-single.html">Blog Single</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="404.html">404</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="search_box pull-right">
                  <input type="text" placeholder="Search" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*/header-bottom*/}
      </header>
    )
}

export default Header;