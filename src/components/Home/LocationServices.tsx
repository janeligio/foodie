export default function LocationServices(props: any) {
    const address = props.address;
    const setAddress = props.setAddress;
    const getAllRestaurants = props.getAllRestaurants;


    let isDisabled = !(address);
    return (
        <div className="home">
            <h1>Foodie</h1>
            <p style={{padding:'0 3em', textAlign:'center'}}>Enable location services and refresh to use this application.</p>
            
                <p className="address-input-label">Or enter an address:</p>
                <input className="address-input" placeholder="Ex. Honolulu" value={address} onChange={(e) => setAddress(e.target.value)}/>
           
            <p>Pick from...</p>
            <div className="actions">
                <button 
                    className={`${isDisabled&&'not-'}disabled-button`} 
                    disabled={isDisabled}
                    onClick={() => getAllRestaurants(false, false, 'meal')}>
                        Meals
                </button>
                <button 
                    className={`${isDisabled&&'not-'}disabled-button`} 
                    disabled={isDisabled}
                    style={{marginLeft:'0.25em'}} onClick={() => getAllRestaurants(false, false, 'dessert')}>
                        Desserts
                </button>
            </div>
        </div>
    );
}