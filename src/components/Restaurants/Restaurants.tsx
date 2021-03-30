import {useState} from 'react';
import Eatery from '../../types/Eatery';
import CategoryType from '../../types/Category';
import  { FaStar, FaStarHalf, FaDollarSign, FaYelp } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi';
import { MdNavigateNext } from 'react-icons/md';

export default function Restaurants(props:any) {
    const [index, setIndex] = useState(0);
    const {restaurants, setView, getAllRestaurants} = props;
    
    function nextIndex() {
        if(restaurants && (index+1) < restaurants.length) {
            setIndex(index+1);
        }
    }
    function isLast():boolean {
        return index === (restaurants.length-1);
    }
    function nextRestaurants() {
        // Query API with offset
        getAllRestaurants();
        setIndex(0);
    }
    return (<>
        <button className="home-button" onClick={() => setView('Home')}><BiArrowBack size="2em"/></button>
        <div className="restaurant-container">
            {/* <div className="actions">
                <button className="" onClick={() => setView('Home')}><FaHome/></button>
            </div> */}
            {restaurants && <Restaurant 
                data={restaurants[index]} 
                nextIndex={nextIndex} 
                isLast={isLast()}
                nextRestaurants={nextRestaurants}
                />}
        </div></>
    );
}

function Restaurant(props:any) {
    const data: Eatery = props.data;
    const nextIndex = props.nextIndex;
    const isLast = props.isLast;
    const nextRestaurants = props.nextRestaurants;
    const handler = !isLast ? nextIndex : () => nextRestaurants();
    return (
        <div className="restaurant">
            <div onClick={handler} className="restaurant-thumbnail">
                <img className="restaurant-image" src={data.image_url} alt={`${data.name} thumbnail`} />
                <MdNavigateNext size="2em" className="next-button"/>
            </div>    
            <div className="restaurant-body">
                <h1 className="name">{data.name} <small className="distance">{metersToMiles(data.distance)}</small></h1>
                <div className="" style={{}}>
                    <div style={{display:'flex', marginTop: '0.2em'}}>
                        <div style={{flex:1}}>
                            <Rating rating={data.rating} reviews={data.review_count}/>
                            <div>
                                <PriceRange price={data.price}/>
                            </div>
                        </div>
                        <address className="no-italics" style={{flex:1}}>
                            <a className="yelp" href={`${data.url}`}>Yelp <FaYelp color="white"/></a>
                                <br/>
                            <a className="bussiness-info" href={`tel:${data.phone}`}>{data.display_phone}</a><br/>

                        </address>
                    </div>
                    <div className="" style={{}}>
                        <address className="no-italics" style={{margin:0}}>
                            <a className="bussiness-info" href={`http://maps.google.com/?q=${data.location.display_address.join(' ')}`}>
                                {data.location.display_address.join(' ')}
                            </a>
                        </address>
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
        return (
            <div>
                {stars.map(() => <FaStar key={Math.random()} color="gold"/>)}
                {half && <FaStarHalf color="gold"/>}
                <span style={{fontSize:'0.75em', fontWeight:100}}>({props.reviews})</span>
            </div>);
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
        return (<>{price.map(() => <FaDollarSign key={Math.random()} color="green"/>)}</>);
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
        <div className="category">{name}</div>
    );
}

function metersToMiles(meters: number): string {
    const km = meters/1000;
    const mi = km * 0.62137119223733;
    return `${Math.round(mi * 10) / 10} mi`
}