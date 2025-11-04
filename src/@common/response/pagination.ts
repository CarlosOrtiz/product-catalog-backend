interface Meta {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export class Pagination {
  items: any[];

  meta: Meta;

  otherData?: any[];

  constructor(items: any[], meta: Meta, otherData?: any[]) {
    this.items = items;
    this.meta = meta;
    this.otherData = otherData;
  }
}
