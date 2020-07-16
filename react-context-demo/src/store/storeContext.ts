import React from 'react';
import { RootState } from './reducer';

export interface IStoreContext {
  state: RootState;
  dispatch: (action: object) => void;
}

// 初始化 context，具体的方法在 provider 中实现
export const initContext: IStoreContext = {
  state: {
    value: 0,
    loading: false,
  },
  dispatch: () => {},
};

const StoreContext = React.createContext<IStoreContext>(initContext);

export default StoreContext;
