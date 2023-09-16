export interface IPaginationResponse<T> {
    page: number;
    itemsCount: number;
    data: T[];
}