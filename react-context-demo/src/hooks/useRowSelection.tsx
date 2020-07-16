import { useCallback, useMemo, useState } from 'react';

export interface IOptions {
  selectedList?: [];
  selectedRowKeys?: [];
  onChange?: (selectedRowKeys: any, selectedRows: any) => void;
}

export default function useRowSelection(options: IOptions = {}) {
  const [selectedList, setSelectedList] = useState(options.selectedList || []);
  const [selectedRowKeys, setSelectedRowKeys] = useState(options.selectedRowKeys || []);
  const rowSelection = useMemo(() => {
    return {
      columnWidth: '44px',
      ...options,
      selectedList,
      selectedRowKeys,
      onChange: (selectedRowKeys: any, selectedRows: any) => {
        setSelectedRowKeys(selectedRowKeys);
        setSelectedList(selectedRows);
        if (options.onChange) {
          options.onChange(selectedRowKeys, selectedRows);
        }
      },
    };
  }, [selectedList, selectedRowKeys, options]);
  // 操作完取消选中
  const resetSelection = useCallback(() => {
    setSelectedList([]);
    setSelectedRowKeys([]);
  }, []);
  return { rowSelection, selectedList, selectedRowKeys, resetSelection };
}
