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
    public bronirovhotel_id:bigint;
    public vhod: string;


    public static copyFieldsValuesTo(from: UsersData, to: UsersData): void {
        to.id = from.id;
        to.rol = from.rol;
        to.photo = from.photo;
        to.name = from.name;
        to.login = from.login
        to.many = from.many;
        to.birthday = from.birthday;
        to.phonenomber = from.phonenomber;
        to.email = from.email;
        to.bronirovhotel = from.bronirovhotel;
        to.bronirovhotel_id = from.bronirovhotel_id;
        to.vhod = from.vhod;
        // to.feedback = from.feedback;
    }

}
