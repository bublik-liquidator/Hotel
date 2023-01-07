export class CarData {

    public id: string;
    public name: string;
    public speed: string;
    public path_picturs: string;


    public static copyFieldsValuesTo(from: CarData, to: CarData): void {
        to.id = from.id;
        to.name = from.name;
        to.speed = from.speed;
        to.path_picturs = from.path_picturs;
    }

}
