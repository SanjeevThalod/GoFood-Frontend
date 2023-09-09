import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import i1 from './Burger-on-16-Menu.jpg';
import i2 from './6776_Pizza-Dough_ddmfs_2x1_1725-fdaa76496da045b3bdaadcec6d4c5398.jpg'
import '../App.css'

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
      <div><div id="carouselExampleFade" className="carousel slide carousel-fade" style={{ backgroundColor: '#1e1e1e' }}>
        <div className="carousel-inner">
          <div className="carousel-item carousel-image active" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)),url(${i1})` }}>
          </div>
          <div className="carousel-item carousel-image" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)),url(${i2})` }}>
          </div>
          <div className="carousel-item carousel-image" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)),url(https://source.unsplash.com/random/?cheese)' }}>
          </div>
        </div>
        <div className="carousel-caption" style={{ zIndex: 10, bottom: '20vh' }}>
          <div className="d-flex justify-content-center">
            <input className="form-control me-2 text-black bg-white" data-bs-theme="dark" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setsearch(e.target.value) }} style={{ boxShadow: '2px 2px 5px white' }} />
          </div>
        </div>
        <div className="carousel-caption" style={{ zIndex: 10, bottom: '45vh',fontWeight:'700' }}>
          <div className="d-flex flex-column hula">
            <span>Deliously Delivered:</span>
            <span style={{color:'purple'}}>Savour the Flavour</span>
            <span>At your DoorStep</span>
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
      </div>
      </div>
      <div style={{ width: '100vw', color: 'blue', fontWeight: '900', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', fontSize: '40px', textShadow: '0px 2px 16px gray',paddingLeft:'40px',marginTop:'40px',marginBottom:'40px' }}>
        Whats on your mind?
      </div>
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
                  <div className=' d-flex flex-row flex-wrap justify-content-around'>
                    {foodItem !== [] ?
                      foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                        .map(newItems => {
                          return (
                            <div key={newItems._id}>
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
