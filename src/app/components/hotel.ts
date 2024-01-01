export class Hotel {
    id: bigint;
    manager_name:string;
    manager_id: bigint;
    path_picture: string[];
    name: string;
    location: string;
    services: string[];
    public static copyFieldsValuesTo( from: Hotel, to: Hotel ): void {
        to.id = from.id;
        to.manager_id = from.manager_id;
        to.path_picture = from.path_picture;
        to.name = from.name;
        to.location = from.location;
        to.services = from.services;

    }
}
