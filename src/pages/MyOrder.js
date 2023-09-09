import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'

export default function MyOrder() {
  const [orderData,setOrderData] = useState("");
  const fetchMyOrder = async ()=>{
    try {
      
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/myorderData`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email: localStorage.getItem('userEmail')
        })
      }).then( async (res)=>{
        let response = await res.json();
        console.log(response)
        setOrderData(response);
      })
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchMyOrder();
  },[]);
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className='row'>

          {orderData !== {} ? Array(orderData).map(data => {
            return (
              data.orderData ?
                data.orderData.order_data.slice(0).reverse().map((item) => {
                  return (
                    item.map((arrayData) => {
                      return (
                        <div  >
                          {arrayData.Order_date ? <div className='m-auto mt-5 fw-bold'>

                            {data = arrayData.Order_date}
                            <hr />
                          </div> :

                            <div className=' d-flex flex-row flex-wrap justify-content-around' >
                              <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                <div className="card-body">
                                  <h5 className="card-title">{arrayData.name}</h5>
                                  <div className='container w-100 p-0' style={{ height: "38px" }}>
                                    <span className='m-1'>{arrayData.qty}</span>
                                    <span className='m-1'>{arrayData.size}</span>
                                    <span className='m-1'>{data}</span>
                                    <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                      ₹{arrayData.price}/-
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          }
                        </div>
                      )
                    }))
                }) : <div style={{fontSize:'50px',alignItems:'center',display:'flex',justifyContent:'center'}}>List is Empty!</div>
            )
          }) : ""}
        </div>
      </div>
      <Footer />
    </div>
  )
}
