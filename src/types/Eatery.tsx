export default interface Eatery {
    id: string,
    alias: string,
    name: string,
    image_url: string,
    is_closed: boolean,
    url: string,
    review_count: number,
    rating: number,
    transaction: string[],
    price: string,
    location: {
        address1: string,
        address2: string,
        address3: string,
        city: string,
        zip_code: string,
        country: string,
        state: string,
        display_address: string[]
    },
    phone: string,
    display_phone: string,
    distance: number,
    categories: [{
        alias: string,
        title: string
    }]
}