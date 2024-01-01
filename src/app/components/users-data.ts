export class UsersData {
    public id: bigint;
    public login: string;
    public password?: string;
    public username: string;
    public photo: string;
    public many: number;
    public birthday: string;
    public phonenomber: string;
    public email: string;
    public role: string;


    public static copyFieldsValuesTo(from: UsersData, to: UsersData): void {
    to.id = from.id;
    to.photo = from.photo;
    to.password = from.password;
    to.username = from.username;
    to.login = from.login
    to.many = from.many;
    to.birthday = from.birthday;
    to.phonenomber = from.phonenomber;
    to.email = from.email; 
    to.role = from.role; 
    }
}
