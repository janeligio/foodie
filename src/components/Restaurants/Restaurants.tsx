import {useState} from 'react';
import Eatery from '../../types/Eatery';
import CategoryType from '../../types/Category';
import  { FaHome, FaStar, FaStarHalf, FaDollarSign, FaYelp } from 'react-icons/fa';

export default function Restaurants(props:any) {
    const [index, setIndex] = useState(0);
    const {restaurants, setView} = props;
    
    function nextIndex() {
        if(restaurants && (index+1) < restaurants.length) {
            setIndex(index+1);
        }
    }
    function isLast():boolean {
        return index === (restaurants.length-1);
    }
    return (
        <div className="restaurant-container">
            <div className="actions">
                <button className="" onClick={() => setView('Home')}><FaHome/></button>
            </div>
            {restaurants && <Restaurant 
                data={restaurants[index]} 
                nextIndex={nextIndex} 
                isLast={isLast()}
                setView={setView}/>}
        </div>
    );
}

function Restaurant(props:any) {
    const data: Eatery = props.data;
    const nextIndex = props.nextIndex;
    const isLast = props.isLast;
    const setView = props.setView;
    const handler = !isLast ? nextIndex : () => setView('Home');
    return (
        <div className="restaurant">
            <div onClick={handler} className="restaurant-thumbnail">
                <img className="restaurant-image" src={data.image_url} alt={`${data.name} thumbnail`} />
            </div>    
            <div className="restaurant-body">
                <h1 className="name">{data.name} <small>{Math.round((data.distance/1000) * 100) / 100}km</small></h1>
                <div className="" style={{display:'flex'}}>
                    <div style={{flex:1}}>
                        <div>
                            <Rating rating={data.rating}/>
                        </div>
                        <PriceRange price={data.price}/>
                    </div>
                    <div className="" style={{flex:3}}>
                        <p style={{margin:0}}>
                            {data.location.display_address.join(' ')} <br/>
                            <a href={`tel:${data.phone}`}>{data.display_phone}</a><br/>
                            <a className="yelp" href={`${data.url}`}>Yelp <FaYelp color="white"/></a>
                        </p>
                    </div>
                </div>
                <div className="categories">
                    <Categories categories={data.categories}/>
                </div>
            </div>
        </div>
    );
}

function Rating(props: any) {
    if(props.rating) {
        let stars = [];
        for(let i = 1; i < props.rating; i++) {
            stars.push(1);
        }
        const half = props.rating % 1 !== 0;
        return (<>{stars.map(() => {
            return (<FaStar color="gold"/>);
        })}{half && <FaStarHalf color="gold"/>}</>);
    } else {
        return null;
    }
}

function PriceRange(props: any) {
    if(props.price) {
        let priceStr = props.price;
        let price = [];
        for(let i = 0; i < priceStr.length; i++) {
            price.push(1);
        }
        return (<>{price.map(() => <FaDollarSign color="green"/>)}</>);
    } else {
        return null;
    }
}

function Categories(props: any) {
    if(props.categories) {
        return (<>
            {props.categories.map((category: CategoryType) => <Category key={`${category.alias}-${category.alias}`} name={category.title}/>)}
        </>);
    } else {
        return null;
    }
}

function Category(props: any) {
    const name = props.name;
    return (
        <span className="category">{name}</span>
    );
}