import React ,{useState}from 'react';
import Header from './Componets/Layout/Header';
import Footer from './Componets/Layout/Footer';
import Menuleft from './Componets/Layout/MenuLeft';
import {useLocation} from 'react-router-dom';
import {UserContext} from './Componets/UserContext/UserContext'
function App(props) {
  // ----------------------------------//
  const params = useLocation();
  // console.log(params['pathname'])
  // ----------------------------------//
  const [getQty,SetQty] = useState();

  function getTongProduct(xx){
    SetQty(xx);
    localStorage.setItem("item1",JSON.stringify(xx))
    console.log("2");
    // xx => localStorage
  }

  console.log(getQty)

  return (
    // Lưu ý
    <UserContext.Provider value={{
      getTongProduct: getTongProduct,
      getQty: getQty 
    }}>
      {/*<Header getQty={getQty}/>*/}
      <Header/>
      <section>
        <div className="container" >
            <div className="row" >
              {((params['pathname'].includes("cart")) || (params['pathname'].includes("contact"))) ? "" : <Menuleft/>}
              {props.children}
            </div>
        </div>
      </section>
      <Footer/> 
    </UserContext.Provider>
  );
}

export default App;
