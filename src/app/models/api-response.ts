export interface ApiResponse<T> {
    succeeded: any;

    recordsFiltered: number;
    recordsTotal: number;
   
    statusCode:number;
    message:string
    data: any[];

    
    }