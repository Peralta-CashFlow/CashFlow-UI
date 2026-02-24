export class PageResponse<T> {
  constructor(
    public response: T[],
    public pageNumber: number,
    public pageSize: number,
    public totalElements: number,
    public totalPages: number
  ) {}

  get hasNextPage(): boolean {
    return this.pageNumber < this.totalPages - 1;
  }

  get hasPreviousPage(): boolean {
    return this.pageNumber > 0;
  }
}