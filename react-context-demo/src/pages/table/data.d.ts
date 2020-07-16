/*
 * @Author: your name
 * @Date: 2020-06-22 17:57:16
 * @LastEditTime: 2020-06-22 18:00:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \redux-ts-hook-demo\src\pages\table\data.d.ts
 */
export interface TableListItem {
  key: number;
  // disabled?: boolean;
  // href: string;
  // avatar: string;
  name: string;
  // title: string;
  // owner: string;
  // desc: string;
  // callNo: number;
  // status: number;
  // updatedAt: Date;
  // createdAt: Date;
  // progress: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter: string;
  status: string;
  name: string;
  pageSize: number;
  currentPage: number;
}
