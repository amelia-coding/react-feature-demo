import { useState, useMemo } from 'react';
import { TablePaginationConfig } from 'antd/es/table/interface';
export const defaultPagination = {
  pageSize: 10,
  current: 1,
};

// export interface IPaginationConfig {
//   current?: number;
//   pageSize?: number;
//   defaultCurrent?: number;
//   onChange?: (current: number, pageSize: number) => void;
//   pagination?: boolean;
// }

export default function usePagination(config: TablePaginationConfig = defaultPagination) {
  const [pagination, setPagination] = useState({
    pageSize: config.pageSize || defaultPagination.pageSize,
    current: config.current || config.defaultCurrent || defaultPagination.current,
  });

  const paginationConfig = useMemo(() => {
    return {
      ...defaultPagination,
      showTotal: (total: number) => `每页 ${pagination.pageSize} 条  第 ${pagination.current}页 共 ${total}`,
      ...config,
      pageSize: pagination.pageSize,
      current: pagination.current,
      onChange: (current: number, pageSize: number) => {
        if (config.onChange) {
          config.onChange(current, pageSize);
        }
        setPagination({ pageSize, current });
      },
      onShowSizeChange: (current: number, pageSize: number) => {
        if (config.onChange) {
          config.onChange(current, pageSize);
        }
        setPagination({ pageSize, current });
      },
    } as TablePaginationConfig;
  }, [config, pagination]);

  return { paginationConfig, setPagination };
}
