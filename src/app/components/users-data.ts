export class UsersData {
    public login: string;
    public password: string;
    // public money: string;

    public photo: string;
    public name: string;
    public many: string;
    public birthday: string;
    public phoneNomber: string;
    public email: string;
    public BronirovHotel: string;

    public static copyFieldsValuesTo(from: UsersData, to: UsersData): void {
        to.photo = from.photo;
        to.name = from.name;
        to.many = from.many;
        to.birthday = from.birthday;
        to.phoneNomber = from.phoneNomber;
        to.email = from.email;
        to.BronirovHotel = from.BronirovHotel;
        // to.feedback = from.feedback;
    }

}
