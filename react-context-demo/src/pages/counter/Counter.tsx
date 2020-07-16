import { Button } from 'antd';
import React from 'react';
import { useStore } from '../../store';

async function asyncFetch(p: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(p);
    }, 3000);
  });
}

export default function Counter() {
  const { state, dispatch } = useStore();
  return (
    <div>
      <h1>{state.value}</h1>
      <div className="row">
        <Button
          type="primary"
          onClick={() =>
            dispatch({
              type: 'click_sync',
              payload: new Date().getTime(),
            })
          }
        >
          Add Amount
        </Button>
        -
        <Button
          type="primary"
          onClick={() =>
            dispatch({
              type: 'click_async',
              //触发异步action，注意payload里面是一个异步获取方法
              payload: asyncFetch(new Date().getTime()),
            })
          }
        >
          Add Async
        </Button>
      </div>
    </div>
  );
}
