type QueryParameters = {
    lat: number|string|undefined,
    lng: number|string|undefined,
    address: string | undefined,
    offset: number,
    open_now: true | false,
    harder: true | false
}

export default QueryParameters;