import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useMemo } from 'react';
import { getList } from '../../hooks/useFetch';
import useTable from '../../hooks/useTable';
import { TableListItem } from './data';

const WrapTable: React.FC = () => {
  const params = useMemo(() => ({ code: 'ssq' }), []);
  const { tableProps, doFetch } = useTable<TableListItem>({
    fetch: getList,
    params: params,
    onChange: (pagination: any, filters: any, sorter: any, extra: { currentDataSource: [] }) => {
      // doFetch({ page: pagination.current, ...filters });
      console.log('onChange', pagination, filters, sorter, extra);
    },
    // pagination: false
    //pagination: true,
    pagination: {
      onChange: (page: number, pageSize: number) => {
        console.log('pagination', page, pageSize);
        doFetch({ page, pageSize });
      },
    },
    //rowSelection: false,
    // rowSelection: true
    rowSelection: {
      onChange: (rowKey: any, rows: any) => {
        console.log('rowSelection', rowKey, rows);
      },
    },
  });

  const columns: ColumnsType<TableListItem> = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
    },
  ];

  return <Table columns={columns} {...tableProps} />;
};

export default WrapTable;
