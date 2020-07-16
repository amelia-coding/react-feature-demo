import { useCallback } from 'react';
import usePagination from './usePagination';
import useFetch from './useFetch';
import useRowSelection from './useRowSelection';
import { TableProps } from 'antd/lib/table';
import { TablePaginationConfig, SorterResult, TableCurrentDataSource, Key } from 'antd/es/table/interface';

function useTable<RecordType>(options: any) {
  const { data = {}, loading, doFetch: dofetch, reFetch } = useFetch(options.fetch, options.params);

  const { paginationConfig, setPagination } = usePagination({
    total: data.totalCount,
    ...(options.pagination || {}),
    onChange: (page, pageSize) => {
      if (options.pagination && options.pagination.onChange) {
        options.pagination.onChange(page, pageSize);
      } else {
        doFetch({ page, pageSize });
      }
    },
  });

  const tableProps: TableProps<RecordType> = {
    dataSource: data.list,
    loading,
    onChange: (
      pagination: TablePaginationConfig,
      filters: Record<string, Key[] | null>,
      sorter: SorterResult<RecordType> | SorterResult<RecordType>[],
      extra: TableCurrentDataSource<RecordType>,
    ) => {
      if (options.onChange) {
        options.onChange(pagination, filters, sorter, extra);
      }
    },
    pagination: {},
    rowSelection: {},
  };

  if (options.pagination === false) {
    tableProps.pagination = false;
  } else {
    tableProps.pagination = paginationConfig;
  }

  const { rowSelection, selectedList, selectedRowKeys, resetSelection } = useRowSelection(
    typeof options.rowSelection === 'object' ? options.rowSelection : {},
  );
  if (options.rowSelection) {
    tableProps.rowSelection = rowSelection;
  }

  const doFetch = useCallback(
    (params) => {
      console.log('doFetch', params);
      dofetch(params);
      if (params.page) {
        setPagination({
          pageSize: paginationConfig.pageSize as number,
          current: params.page,
        });
      }
    },
    [paginationConfig, setPagination, dofetch],
  );

  return {
    tableProps,
    resetSelection,
    selectedList,
    selectedRowKeys,
    doFetch,
    reFetch,
  };
}
export default useTable;
