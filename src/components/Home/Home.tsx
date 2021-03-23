export default function Home(props: any) {
    const {getAllRestaurants} = props;
    return (
        <div className="home">
            <h1>Foodie</h1>
            <p>Spoiled for choices? We'll pick a restaurant for you.</p>
            <button onClick={() => getAllRestaurants()}>Choose For Me</button>
        </div>
    );
}