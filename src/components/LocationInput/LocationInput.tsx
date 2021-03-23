import { GiCakeSlice as Cake } from 'react-icons/gi';

export default function LocationInput(props:any) {
    const getRestaurant = props.getRestaurant;
    return (
        <>
            <h2>What are you looking for?</h2>
            <button onClick={() => getRestaurant('dessert')}>Dessert</button>
            <button onClick={() => getRestaurant('drive')}>Drive-Thru</button>
            <button onClick={() => getRestaurant('dine')}>Dine-in</button>

        </>
    );
}