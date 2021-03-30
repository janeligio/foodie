import { BiArrowBack } from 'react-icons/bi';

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
        <>
        <button className="home-button" style={{padding:'0.5em'}} onClick={() => setView('Home')}><BiArrowBack size="2em"/></button>
        <div className="home try-harder">
            <h1>Foodie</h1>
            <Message/>
            <div className="actions">
                <button style={{ marginLeft:'0.25em'}} onClick={() => getAllRestaurants(false, true)}>Try Harder</button>
                <button style={{ marginLeft:'0.25em'}} onClick={() => getAllRestaurants(true)}>Explore</button>
            </div>
        </div>
        </>
    );
}