import { useState, useCallback, useEffect } from 'react';

type DataType = {
  list?: [];
  totalCount?: number;
};

type fetchReturn = {
  loading: boolean;
  data: DataType;
  doFetch: (params: any) => void;
  reFetch: () => void;
};
export default function useFetch(fetch: any, params: any, visible = true): fetchReturn {
  const [data, setData] = useState<DataType>({});
  const [loading, setLoading] = useState(false);
  const [newParams, setNewParams] = useState(params);
  const fetchApi = useCallback(async () => {
    console.log('fetch....');
    if (visible) {
      setLoading(true);
      const res = await fetch(newParams);
      if (res && res.code === 1) {
        setData(res.data);
      }
      setLoading(false);
    }
  }, [fetch, newParams, visible]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const doFetch = useCallback((rest) => {
    setNewParams(rest);
  }, []);

  const reFetch = () => {
    setNewParams(Object.assign({}, newParams));
  };
  return {
    loading,
    data,
    doFetch,
    reFetch,
  };
}
// api导出方法
export const getSsq = (params: any) => {
  //const url = 'https://www.mxnzp.com/api/lottery/common/latest?' + JSON.stringify(params);
  return {
    code: 1,
    data: {
      openCode: 8,
    },
  };
};

// api导出方法
export const getList = (params: any) => {
  //const url = 'https://www.mxnzp.com/api/lottery/common/latest?' + JSON.stringify(params);
  return {
    code: 1,
    data: {
      list: Array(1000)
        .fill({
          key: 0,
          name: 'Jack0',
        })
        .map((item, index) => {
          return {
            key: index,
            name: 'Jack' + index,
          };
        }),
    },
  };
};
