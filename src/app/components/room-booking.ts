export class RoomBooking {
    id: bigint;
    room_id: bigint;
    booked_by_user_id: bigint;
    date_from: string;
    date_to: string;
    payed: boolean;
    number:string
    name:string;
    
    public static copyFieldsValuesTo(from: RoomBooking, to: RoomBooking): void {
    to.id = from.id;
    to.room_id = from.room_id;
    to.booked_by_user_id = from.booked_by_user_id;
    to.date_from = from.date_from;
    to.date_to = from.date_to;
    to.payed = from.payed;
    to.number = from.number;
    to.name = from.name;
}
}
