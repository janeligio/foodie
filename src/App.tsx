import { useEffect, useState} from 'react';
import Eatery from './types/Eatery';
import View from './types/View';
import LocationInput from './components/LocationInput/LocationInput';
import Restaurants from './components/Restaurants/Restaurants';
import Home from './components/Home/Home';
import axios from 'axios';
import './App.css';

const location = navigator.geolocation;


function App(): JSX.Element {
    const [position, setPosition] = useState<any>();
    const [restaurants, setRestaurants] = useState<Eatery[]>();
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
        // navigator.permissions.query({ name: 'geolocation' })
        //     .then(console.log)
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

    function getAllRestaurants() {
        if(position) {
            console.log(`Coords: ${position[0]},${position[1]}`);
            axios({
                method:'get',
                url: `http://localhost:8080/foodie?lat=${position[0]}&lng=${position[1]}`,
            }).then(res => {
                console.log(res);
                setRestaurants(res.data);
                setView('Restaurants');
            }).catch(err => {
                console.log(err);
            })
        }
    }
    return (
	<>
	<main>
        {
            view === 'Home' &&
                (
                    position 
                    ? <Home getAllRestaurants={getAllRestaurants}/>
                    : <LocationServicesButton getCurrentLocation={getCoordinates}/>
                ) 
                
        }
        { 
            view === 'Restaurants' &&
            <Restaurants restaurants={restaurants} setView={setView}/>
        }
	</main>
	</>
    );
}

function LocationServicesButton(props: any) {
    return (<button onClick={() => props.getCurrentLocation()}>Enable Location Services</button>);
}

export default App;