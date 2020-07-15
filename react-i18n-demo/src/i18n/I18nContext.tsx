import { createContext } from 'react';

export type I18nContextProps = {
  t: (key: string, template?: any, d?: string) => string,
  getLocale: () => void,
  setLocale: (locale: string) => void,
};

const I18nContext = createContext<I18nContextProps>({
  t: () => '',
  getLocale: () => {},
  setLocale: () => {},
});

export default I18nContext;
