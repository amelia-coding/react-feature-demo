import { Button } from 'antd';
import React, { useMemo } from 'react';
import useFetch, { getSsq } from '../../hooks/useFetch';

interface Dictionary<T> {
  [key: string]: T;
}

type StrDict = Dictionary<string>;

type DictMember<T> = T extends Dictionary<infer V> ? V : never;

const val: DictMember<StrDict> = '11';

export default function UseFetch() {
  const params = useMemo(() => ({ code: 'ssq' }), []);
  const data = useFetch(getSsq, params);
  return (
    <div>
      <div>
        <Button type="primary">UseFetch DEMO</Button>
        <p>{JSON.stringify(data)}</p>
      </div>
    </div>
  );
}
