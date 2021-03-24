export default function LocationServices(props: any) {

    return (
        <div className="home">
            <h1>Foodie</h1>
            <p style={{padding:'0 3em', textAlign:'center'}}>Enable location services and refresh to use this application.</p>
            <button className="disabled-button" disabled={true}>Choose For Me</button>
        </div>
    );
}