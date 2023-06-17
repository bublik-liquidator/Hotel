export class RoomBooking {
    id:bigint;
    room_id: bigint;
    booked_by_user_id: bigint;
    date_from: string;
    date_to: string;
    payed: boolean;
}
