export class CarData {

    public id: string;
    public name: string;
    public speed: string;
    public path_picturs: string;
    public path_icons: string;
    public path_json: string;
    public cost: string;
    public feedback: string;
    
    


    public static copyFieldsValuesTo(from: CarData, to: CarData): void {
        to.id = from.id;
        to.name = from.name;
        to.speed = from.speed;
        to.path_picturs = from.path_picturs;
        to.path_icons = from.path_icons;
        to.path_json = from.path_json;
        to.cost = from.cost;
        to.feedback = from.feedback;

    }

}
