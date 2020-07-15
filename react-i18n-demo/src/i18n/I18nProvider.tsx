import React, { useState } from 'react';
import I18nContext, { I18nContextProps } from './I18nContext';

type I18nProviderProps = {
  locales: string[],
  translations: any;
};

const I18nProvider: React.FC<I18nProviderProps> = (props) => {
  const [ locale, setLocale ] = useState('zh-cn');

  const i18n: I18nContextProps = {
    // t: key => props.translations[locale][key],
    t: (key: any, template: any, d: string = '') => {
      let keyArr = key.split('.')
      let appid: any = ''
      // 如果key以i18n开头，默认格式为appid.key
      if (key.indexOf('i18n_') === 0) {
        appid = keyArr[0]
        key = keyArr.slice(1).join('.')
      }
      // 获取当前语言的所有翻译
      let transition = props.translations[locale]
      let ret = ''
      // 优先取appid下的翻译，没有直接取语言的翻译
      if (appid) {
        ret = (transition ? (transition[appid] ? transition[appid][key] : transition[key]) : d) || d
      } else {
        ret = transition ? transition[key] : d
      }
      // 指定占位符或者自定义格式化函数
      if (ret && template) {
        if (typeof template === 'function') {
          ret = template(ret)
        }
        if (typeof template === 'object') {
          for (let prop in template) {
            let re = new RegExp(prop, 'g')
            ret = ret.replace(re, template[prop])
          }
        }
      }
      return ret
    },
    getLocale: () => locale,
    setLocale: locale => setLocale(locale),
  };

  return (
    <I18nContext.Provider value={i18n}>
      {props.children}
    </I18nContext.Provider>
  );
};

export default I18nProvider;
