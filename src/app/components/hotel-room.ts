export class HotelRoom {
    id:bigint;
    name:string;
    hotel_id:bigint;
    number: string;
    description :string;
    price: number;
    path_picture:string;
    public static copyFieldsValuesTo(from: HotelRoom, to: HotelRoom): void {
        to.id = from.id;
        to.name = from.name;
        to.hotel_id = from.hotel_id;
        to.number = from.number;
        to.description = from.description;
        to.price = from.price;
        to.path_picture = from.path_picture;
    }
}
