import { FC, useMemo } from 'react';
import { Column, useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';

import styles from './BasicTable.module.scss';
import IBasicTable from './BasicTable.interface';
import ColumnFilter from './ColumnFilter';
import GlobalFilter from './GlobalFilter';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import { useSticky } from 'react-table-sticky';



const BasicTable: FC<IBasicTable> = (props) => {

  const { 
    cols, 
    data,

    tableWrapperClassName='',
    tableClassName='',
    globalFilterClassName='',
    tableHeadClassName='',
    paginationClassName='',
    currentPageClassName='',
    goToPageClassName='',
    pageSizeClassName='',
    firstPageClassName='',
    previousPageClassName='',
    nextPageClassName='',
    lastPageClassName='',

  } = props;

  const columns = useMemo<readonly Column<any>[]>(() => cols, []);
  const tableData = useMemo(() => data, []);

  const defaultColumn = useMemo(() => {
    return { Filter: ColumnFilter }
  }, []);

  const {
    getTableProps, // props for passing into `table`
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    page, // in place of `rows`
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    selectedFlatRows, // flat array of currently selected rows
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: tableData,
      defaultColumn,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          ),
        },
        ...columns,
      ]);
    }
    // useSticky
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <GlobalFilter
        className={globalFilterClassName}
        filter={globalFilter} 
        setFilter={setGlobalFilter} 
      />

      <div className={tableWrapperClassName}>
        <table 
          className={tableClassName}
          aria-label='customer data table' 
          {...getTableProps()}
        >
          <thead className={tableHeadClassName}>
            {headerGroups.map((headerGroup) => (
              <tr
                
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{ padding: 10, position: 'sticky', top: 0 }}
                  >
                    <div

                      {...column.getSortByToggleProps()}
                    >
                      <span>{column.render('Header')}</span>
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <svg fill='white' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">{/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                          ) : (
                            <svg fill='white' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">{/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" /></svg>
                          )
                        ) : (
                          <svg style={{ visibility: 'hidden' }} fill='white' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">{/*! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" /></svg>
                        )}
                      </span>
                    </div>
                    <div>
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} style={{ padding: 20 }}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={paginationClassName}>
        <span className={currentPageClassName}>
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
        &nbsp;
        <span className={goToPageClassName}>
          | Go to page&nbsp;
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? parseInt(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
          />
        </span>
        &nbsp;
        <select
          className={pageSizeClassName}
          value={pageSize}
          onChange={(e) => setPageSize(parseInt(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        &nbsp;
        <button 
          className={firstPageClassName}
          onClick={() => gotoPage(0)} disabled={!canPreviousPage}
        >
          {'<<'}
        </button>
        <button
          className={previousPageClassName}
          onClick={() => previousPage()} disabled={!canPreviousPage}
        >
          Previous
        </button>
        <button
          className={nextPageClassName}
          onClick={() => nextPage()} disabled={!canNextPage}
        >
          Next
        </button>
        <button 
          className={lastPageClassName}
          onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}
        >
          {'>>'}
        </button>
      </div>

      <pre>
        <code>
          {/* {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => row.original), // selected rows
            },
            null,
            2
          )} */}
        </code>
      </pre>

    </>
  );


};

export default BasicTable;
