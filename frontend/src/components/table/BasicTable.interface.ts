export default interface IBasicTable {
  cols: any;
  data: any;
  tableClassName?: string;
  globalFilterClassName?: string;
  tableHeadClassName?: string;
  tableWrapperClassName?: string;
  paginationClassName?: string;
  currentPageClassName?: string;
  goToPageClassName?: string;
  pageSizeClassName?: string;
  firstPageClassName?: string;
  previousPageClassName?: string;
  nextPageClassName?: string;
  lastPageClassName?: string;
}