import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart,useCart } from './ContextReducer';
import {useToast} from '@chakra-ui/react';

export default function Card(props) {
    let dispatch = useDispatchCart();
    const toast = useToast();
    let data = useCart();
    let options = props.option ??{};
    const priceRef = useRef();
    let priceOptions = Object.keys(options).slice(1);
    const [qty,setqty] = useState(1);
    const [size,setsize] = useState("");
    const handelCart = async ()=>{
        let food = [];
        for(const item of data){
            if(item.id === props.foodItem._id){
                food = item;
                break;
            }
        }
        toast({
            title:'added',
            duration:500,
            status:'success',
            position:'bottom'
        })
        if(food !== []){
            if(food.size === size){
                await dispatch({type:"UPDATE",id:props.foodItem._id,price:finalPrice,qty:qty});
                return;
            }else if(food.size !== size){
                await dispatch({type:'ADD',id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size,img:props.foodItem.img});
                return;
            }
            return;
        }
        await dispatch({type:'ADD',id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size,img:props.foodItem.img});
    };
    let finalPrice = qty*parseInt(options[size]);
    useEffect(()=>{
        setsize(priceRef.current.value);
    },[]);
    return (
        <div className="card m-3" style={{"width": "18rem",maxHeight:'360px',boxShadow:'2px 2px 2px silver'}}>
            <img src={props.foodItem.img} className="card-img-top" style={{height:'160px',objectFit:'fill'}} alt='' />
            <div className="card-body">
                <h5 className="card-title">{props.foodItem.name}</h5>
                <div className="container ">
                    <select className='m-2 h-100' data-bs-theme='light' onChange={(e)=>setqty(e.target.value)}>
                        {Array.from(Array(6),(e,i)=>{
                            return(
                                <option key={i+1} value={i+1}>{i+1}</option>
                            )
                        })}
                    </select>
                    <select className='m-2 h-100' data-bs-theme='light' ref={priceRef} onChange={(e)=>setsize(e.target.value)}>
                         {priceOptions.map((data)=>{
                            return (
                                <option value={data} key={data}>{data}</option>
                            )
                         })}
                    </select>
                    <div className='d-inline h-100 fs-5'>₹{finalPrice}/-</div>
                    <hr/>
                    <div className="btn btn-primary justify-center ms-2" onClick={handelCart}>Add to Cart</div>
                </div>
            </div>
        </div>
    )
}
