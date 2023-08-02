import React from 'react'

export default function Carousel() {
    return (
        <div id="carouselExampleFade" className="carousel slide carousel-fade">
            <div className="carousel-inner">
                <div className="carousel-item carousel-image active" style={{ backgroundImage: 'url(https://source.unsplash.com/random/?burger)' }}>
                </div>
                <div className="carousel-item carousel-image" style={{ backgroundImage: 'url(https://source.unsplash.com/random/?pizza)' }}>
                </div>
                <div className="carousel-item carousel-image" style={{ backgroundImage: 'url(https://source.unsplash.com/random/?cheese)' }}>
                </div>
            </div>
            <div className="carousel-caption" style={{zIndex:10,bottom:'20vh'}}>
                <form className="d-flex">
                    <input className="form-control me-2 bg-dark text-white" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-dark bg-dark text-white" type="submit">Search</button>
                </form>
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
    )
}
