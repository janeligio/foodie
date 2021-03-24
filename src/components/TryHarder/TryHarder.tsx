
export default function TryHarder(props: any) {
    const getAllRestaurants = props.getAllRestaurants;
    const setView = props.setView;
    const total = props.total;
    const offset = props.offset;

    function Message() {
        if(total === 0) {
            return (<p>Looks like most places are closed right now.</p>);
        }
        if(offset === total) {
            // TODO
        }
        return (<p>Something went wrong.</p>);
    }
    return (
        <div className="home try-harder">
            <h1>Foodie</h1>
            <Message/>
            <button style={{padding: '0.5em'}} className="actions" onClick={() => setView('Home')}>Back</button>
            <div className="actions">
                <button style={{padding: '0.5em'}} onClick={() => getAllRestaurants(false, true)}>Try Harder</button>
                <button style={{padding: '0.5em', marginLeft:'0.5em'}} onClick={() => getAllRestaurants(true)}>View Closed</button>
            </div>
        </div>
    );
}