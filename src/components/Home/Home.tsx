export default function Home(props: any) {
    const {getAllRestaurants} = props;
    return (
        <div className="home">
            <h1>Foodie</h1>
            <p style={{padding:'0 3em', textAlign:'center'}}>Spoiled for choices? We'll pick a restaurant for you.</p>
            <p>Pick from...</p>
            <div className="actions">
                <button onClick={() => getAllRestaurants(false, false, 'meal')}>Meals</button>
                <button style={{marginLeft:'0.25em'}} onClick={() => getAllRestaurants(false, false, 'dessert')}>Desserts</button>
            </div>
        </div>
    );
}