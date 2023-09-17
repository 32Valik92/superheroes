export interface IPagination<T> {
    page: number;
    itemsCount: number;
    data: T;
}