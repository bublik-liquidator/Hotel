export class UsersData {
    public id: bigint;
    public login: string;
    public password: string;
    // public money: string;

    public rol: string;
    public photo: string;
    public name: string;
    public many: string;
    public birthday: string;
    public phonenomber: string;
    public email: string;
    public bronirovhotel: string;

    public static copyFieldsValuesTo(from: UsersData, to: UsersData): void {
        to.id = from.id;
        to.photo = from.photo;
        to.name = from.name;
        to.many = from.many;
        to.birthday = from.birthday;
        to.phonenomber = from.phonenomber;
        to.email = from.email;
        to.bronirovhotel = from.bronirovhotel;
        // to.feedback = from.feedback;
    }

}
