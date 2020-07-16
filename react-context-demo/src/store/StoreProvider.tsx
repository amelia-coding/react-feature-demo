import React, { useReducer } from 'react';
import isPromise from '../utils/isPromise';
import reducer from './reducer';
import StoreContext, { IStoreContext } from './storeContext';

type IProviderProps = {
  children: any;
};

function wrapperDispatch(dispatch: any) {
  return function (action: any) {
    if (isPromise(action.payload)) {
      dispatch({ type: 'loading_start' });
      action.payload.then((v: any) => {
        dispatch({ type: action.type, payload: v });
        dispatch({ type: 'loading_end' });
      });
    } else {
      dispatch(action);
    }
  };
}

const StoreProvider: React.FC<IProviderProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, { value: 0, loading: false });
  const store: IStoreContext = {
    state: state,
    dispatch: wrapperDispatch(dispatch),
  };

  return <StoreContext.Provider value={store}>{props.children}</StoreContext.Provider>;
};

export default StoreProvider;
