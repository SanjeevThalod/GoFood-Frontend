import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {
  const [search, setsearch] = useState('');
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);
  const loadData = async () => {
    let response = await fetch(`${process.env.REACT_APP_BASE_URL}/food`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setfoodItem(response.food);
    setfoodCat(response.category);
  }
  useEffect(() => {
    loadData()
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div><div id="carouselExampleFade" className="carousel slide carousel-fade">
        <div className="carousel-inner">
          <div className="carousel-item carousel-image active" style={{ backgroundImage: 'url(https://source.unsplash.com/random/?burger)' }}>
          </div>
          <div className="carousel-item carousel-image" style={{ backgroundImage: 'url(https://source.unsplash.com/random/?pizza)' }}>
          </div>
          <div className="carousel-item carousel-image" style={{ backgroundImage: 'url(https://source.unsplash.com/random/?cheese)' }}>
          </div>
        </div>
        <div className="carousel-caption" style={{ zIndex: 10, bottom: '20vh' }}>
          <div className="d-flex justify-content-center">
            <input className="form-control me-2 text-black bg-white" data-bs-theme="dark" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setsearch(e.target.value) }} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div></div>
      <div className='container'>
        {
          foodCat !== [] ?
            foodCat && foodCat.map((data) => {
              return (
                <div className=''>
                  <div key={data._id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr />
                  <div className=' d-flex flex-row flex-wrap'>
                    {foodItem !== [] ?
                      foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                        .map(newItems => {
                          return (
                            <div key={newItems._id} >
                              <Card foodItem={newItems}
                                option={newItems.options[0]}


                              />
                            </div>
                          );
                        }) : <div>NOT FOUND </div>
                    }
                  </div>
                </div>
              )
            }) : <div>Server Error</div>
        }
      </div>
      <div><Footer /></div>
    </div>
  )
}
