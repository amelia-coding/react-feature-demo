import { useContext } from 'react';
import StoreContext from './storeContext';

function useStore() {
  const store = useContext(StoreContext);
  return store;
}

export default useStore;
