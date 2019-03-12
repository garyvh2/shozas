export class User {
    public name: string;
    public userImage: string;
    public stars: number;
}

export class Home {
    public id: number;
    public title: string;
    public addr: string;
    public image: string;
    public beds: number;
    public baths: number;
    public gar: number;
    public size: number;
    public price: number;
    public user: User;
}

export class ApiRequest<T> {
    public Time: Date;
    public SearchType: string;
    public Result: T[];
}
