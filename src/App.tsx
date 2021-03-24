import { useEffect, useState} from 'react';
import Eatery from './types/Eatery';
import View from './types/View';
import QueryParameters from './types/QueryParameters';
import Restaurants from './components/Restaurants/Restaurants';
import TryHarder from './components/TryHarder/TryHarder';
import Home from './components/Home/Home';
import axios from 'axios';
import './App.css';

const location = navigator.geolocation;


function App(): JSX.Element {
    const [position, setPosition] = useState<any>();
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
    },[])

    function getCoordinates() {
        if(location) {
            location.getCurrentPosition((position: GeolocationPosition) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setPosition([latitude,longitude]);
                console.log('yo')
            });
        }
        console.log('fuck')
    }

    function getAllRestaurants(notOpen: boolean|undefined, harder: boolean|undefined) {
        if(position) {
            console.log(`Coords: ${position[0]},${position[1]}`);

            const open_now = notOpen ? false : true;
            const tryHarder = harder ? true : false;
            const queries: QueryParameters = {
                lat: position[0],
                lng: position[1],
                offset,
                open_now,
                harder: tryHarder
            };
            let queryParams = '';
            for(const [key, value] of Object.entries(queries)) {
                queryParams += `${key}=${value}&`;
            }
            axios({
                method:'get',
                url: `http://localhost:8080/foodie?${queryParams}`,
            }).then(res => {
                console.log(res.data);
                setOffset(res.data.offset);
                setRestaurants(res.data.businesses);
                if(res.data.total > 0) {
                    setView('Restaurants');
                } else {
                    setTotal(res.data.total);
                    setView('Try Harder');
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }
    return (
	<>
	<main>
        { view === 'Home' &&
                (
                    position 
                    ? <Home getAllRestaurants={getAllRestaurants}/>
                    : <LocationServicesButton getCurrentLocation={getCoordinates}/>
                )      
        }
        { view === 'Try Harder' &&
            <TryHarder getAllRestaurants={getAllRestaurants} setView={setView} total={total} offset={offset}/>}
        { view === 'Restaurants' &&
            <Restaurants restaurants={restaurants} setView={setView} getAllRestaurants={getAllRestaurants}/>
        }
	</main>
	</>
    );
}

function LocationServicesButton(props: any) {
    return (<button onClick={() => props.getCurrentLocation()}>Enable Location Services</button>);
}

export default App;