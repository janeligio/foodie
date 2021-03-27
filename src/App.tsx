import { useEffect, useState} from 'react';
import Eatery from './types/Eatery';
import View from './types/View';
import QueryParameters from './types/QueryParameters';
import Restaurants from './components/Restaurants/Restaurants';
import TryHarder from './components/TryHarder/TryHarder';
import Home from './components/Home/Home';
import LocationServices from './components/Home/LocationServices';
import Loader from './components/Loader/Loader';
import axios from 'axios';
import './App.css';

const location = navigator.geolocation;

function App(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(true);
    const [position, setPosition] = useState<any>();
    const [address, setAddress] = useState<string>('');
    const [foodType, setFoodType] = useState<string>('');
    const [restaurants, setRestaurants] = useState<Eatery[]>();
    const [offset, setOffset] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [view, setView] = useState<View>('Home');

    useEffect(() => {
        if(location) {
            location.getCurrentPosition((position: GeolocationPosition) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setPosition([latitude,longitude]);
            }, (err) => {
                console.log(`code:${err.code} ${err.message}`);
            });
        } else {
        }
        setLoading(false);
    },[])

    function getAllRestaurants(notOpen: boolean|undefined, harder: boolean|undefined, food:string|undefined) {
        setLoading(true);
        if(position) {
            console.log(`Coords: ${position[0]},${position[1]}`);

            let open_now = notOpen ? false : true;
            let tryHarder = harder ? true : false;

            const queries: QueryParameters = {
                lat: position[0],
                lng: position[1],
                address,
                offset,
                open_now,
                harder: tryHarder
            };
            let queryParams = '';
            for(const [key, value] of Object.entries(queries)) {
                queryParams += `${key}=${value}&`;
            }
            let category;
            if(food) {
                category = food;
                setFoodType(food);
            } else if(foodType) {
                category = foodType;
            } else {
                category = 'dessert';
            }

            axios({
                method:'get',
                url: `${process.env.REACT_APP_SERVER_API}/foodie/${category}?${queryParams}`,
            }).then(res => {
                console.log(res.data);
                setOffset(res.data.offset);
                if(res.data.total > 0) {
                    setRestaurants(res.data.businesses);
                    setView('Restaurants');
                } else {
                    setTotal(res.data.total);
                    setView('Try Harder');
                }
                setLoading(false);
            }).catch(err => {
                console.log(err);
                setLoading(false);
            })
        } else if(address) {
            let open_now = notOpen ? false : true;
            let tryHarder = harder ? true : false;

            const queries: QueryParameters = {
                lat: '',
                lng: '',
                address,
                offset,
                open_now,
                harder: tryHarder
            };
            let queryParams = '';
            for(const [key, value] of Object.entries(queries)) {
                queryParams += `${key}=${value}&`;
            }
            let category;
            if(food) {
                category = food;
                setFoodType(food);
            } else if(foodType) {
                category = foodType;
            } else {
                category = 'dessert';
            }

            axios({
                method:'get',
                url: `${process.env.REACT_APP_SERVER_API}/foodie/${category}?${queryParams}`,
            }).then(res => {
                console.log(res.data);
                setOffset(res.data.offset);
                if(res.data.total > 0) {
                    setRestaurants(res.data.businesses);
                    setView('Restaurants');
                } else {
                    setTotal(res.data.total);
                    setView('Try Harder');
                }
                setLoading(false);
            }).catch(err => {
                console.log(err);
                setLoading(false);
            })
        }
    }
    return (
	<>
	<main>
        {
            loading ? <Loader/> :
            <>
                { view === 'Home' &&
                        (
                            position 
                            ? <Home getAllRestaurants={getAllRestaurants}/>
                            : <LocationServices address={address} setAddress={setAddress} getAllRestaurants={getAllRestaurants}/>
                        )      
                }
                { view === 'Try Harder' &&
                    <TryHarder getAllRestaurants={getAllRestaurants} setView={setView} total={total} offset={offset}/>}
                { view === 'Restaurants' &&
                    <Restaurants restaurants={restaurants} setView={setView} getAllRestaurants={getAllRestaurants}/>
                }
            </>
        }

	</main>
	</>
    );
}

export default App;