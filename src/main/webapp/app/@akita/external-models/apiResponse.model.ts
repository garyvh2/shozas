export class ApiResponse<T> {
    public time: string;
    public status: string;
    public result: T;
    public exception: string;
    public message: string;
}
