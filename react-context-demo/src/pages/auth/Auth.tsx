import { Button } from 'antd';
import React from 'react';
import useAuth from '../../hooks/useAuth';

interface Dictionary<T> {
  [key: string]: T;
}

type StrDict = Dictionary<string>;

type DictMember<T> = T extends Dictionary<infer V> ? V : never;
type StrDictMember = DictMember<StrDict>; // string

export default function Auth() {
  const auth = useAuth();
  return (
    <div>
      <div>
        <Button type="primary">Primary</Button>
        <p>{auth}</p>
      </div>
    </div>
  );
}
