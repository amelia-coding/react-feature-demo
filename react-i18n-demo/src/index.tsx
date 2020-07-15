import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { I18nProvider } from './i18n';

import CtModel from '@ctrip/ctweb-util/esm/ctmodel'

import { getSharkData } from '@ctrip/nfes-ui/lib/common/utils/getSharkDefault';

import l10n from '@ctrip/shark-l10n/dist/components/l10n'
import { DateTimeFormatter } from '@ctrip/shark-l10n/lib/datetime'
import { NumberFormatter } from '@ctrip/shark-l10n/lib/number'

import RModal from './ResponsiveModal/index'


export default function loadScript (src: any, attrs?: any, onload?: any) {
  attrs = attrs || {}
  var script = document.createElement('script')
  script.src = src
  script.async = typeof attrs.async === 'undefined' ? true : attrs.async

  if (attrs.crossOrigin !== false) {
    script.crossOrigin = 'anonymous'
  }

  delete attrs.src
  delete attrs.async
  delete attrs.crossOrigin

  Object.keys(attrs).forEach(function(attr) {
    script.setAttribute(attr, attrs[attr])
  })
  if (typeof onload === 'function') {
    script.addEventListener('load', onload)
  }
  script.addEventListener('error', function () {
    console && console.error && console.error('loadscript error: ' + script.src)
  //   throw(new Error('loadscript error: ' + script.src))
  })
  document.getElementsByTagName('HEAD')[0].appendChild(script)
}


async function loadScriptPromise (src: any, attrs?: any) {
  attrs = attrs || {}
  var script = document.createElement('script')
  script.src = src
  script.async = typeof attrs.async === 'undefined' ? true : attrs.async

  if (attrs.crossOrigin !== false) {
    script.crossOrigin = 'anonymous'
  }

  delete attrs.src
  delete attrs.async
  delete attrs.crossOrigin

  Object.keys(attrs).forEach(function(attr) {
    script.setAttribute(attr, attrs[attr])
  })

  let promise = new Promise((resolve, reject) => {
    script.addEventListener('load', resolve)
    script.addEventListener('error', reject)
  })

  document.getElementsByTagName('HEAD')[0].appendChild(script)

  return promise

  // if (typeof onload === 'function') {
  //   script.addEventListener('load', onload)
  // }
  // script.addEventListener('error', function () {
  //   console && console.error && console.error('loadscript error: ' + script.src)
  // //   throw(new Error('loadscript error: ' + script.src))
  // })
  
}

getSharkData({
        appId: '100023727',
        pageId: '100001',
        locale: 'zh-CN'
}).then((data: any) => {
    console.log('xxx', data);
}).catch((error: any) => {
    console.log('yyy', error);
});

loadScriptPromise('https://ct.ctrip.com/m/i18n/6002/en-US.js').then(() => {
  console.log('kkkkkk', window.i18n_6002, l10n)

  l10n.l10n = window.i18n_6002

  // key.datetime.d.full: "dd日"
  // key.datetime.d.short: "d日"
  // key.datetime.de.full: "d日(EEEE)"
  // key.datetime.de.short: "d日(EEE)"
  // key.datetime.e.full: "EEEE"
  // key.datetime.e.short: "EEE"
  // key.datetime.ehm.full: "EEEE, HH:mm"
  // key.datetime.ehm.short: "EEE, HH:mm"
  // key.datetime.ehms.full: "EEEE, HH:mm:ss"
  // key.datetime.ehms.short: "EEE, HH:mm:ss"
  // key.datetime.hm: "HH:mm"
  // key.datetime.hme.full: "EEEE, HH:mm"
  // key.datetime.hme.short: "EEE, HH:mm"
  // key.datetime.hms: "HH:mm:ss"
  // key.datetime.hmse.full: "EEEE, HH:mm:ss"
  // key.datetime.hmse.short: "EEE, HH:mm:ss"
  // key.datetime.m.full: "M月"
  // key.datetime.m.short: "M月"
  // key.datetime.md.calendar: "M月d日"
  // key.datetime.md.full: "M月d日"
  // key.datetime.md.short: "M月d日"
  // key.datetime.mde.full: "M月d日, EEE"
  // key.datetime.mde.full.m.full.e: "M月d日(EEEE)"
  // key.datetime.mde.full.m.short.e: "M月d日, EEE"
  // key.datetime.mde.short: "M月d日(EEE)"
  // key.datetime.mde.short.m.full.e: "M月d日, EEEE"
  // key.datetime.mde.short.m.short.e: "M月d日(EEE)"
  // key.datetime.mdhm.full: "M月d日HH:mm"
  // key.datetime.mdhm.short: "M月d日 HH:mm"
  // key.datetime.mdhme.full: "M月d日(EEEE) HH:mm"
  // key.datetime.mdhme.full.m.full.e: "M月d日(EEEE) HH:mm"
  // key.datetime.mdhme.short: "M月d日(EEEE) HH:mm"
  // key.datetime.mdhme.short.m.short.e: "M月d日(EEEE) HH:mm"
  // key.datetime.mdhms.full: "M月d日, HH:mm:ss"
  // key.datetime.mdhms.short: "M月d日, HH:mm:ss"
  // key.datetime.y: "yyyy"
  // key.datetime.ym.calendar: "yyyy年M月"
  // key.datetime.ym.full: "yyyy年M月"
  // key.datetime.ym.short: "yyyy年M月"
  // key.datetime.ymd.full: "yyyy年M月d日"
  // key.datetime.ymd.short: "yyyy年M月d日"
  // key.datetime.ymde.full: "yyyy年M月d日(EEEE)"
  // key.datetime.ymde.full.m.full.e: "yyyy年M月d日(EEEE)"
  // key.datetime.ymde.full.m.short.e: "yyyy年M月d日, EEE"
  // key.datetime.ymde.short: "yyyy年M月d日(EEEE)"
  // key.datetime.ymde.short.m.full.e: "yyyy年M月d日, EEEE"
  // key.datetime.ymde.short.m.short.e: "yyyy年M月d日(EEE)"
  // key.datetime.ymdhm.full: "yyyy年M月d日HH:mm"
  // key.datetime.ymdhm.short: "yyyy年M月d日HH:mm"
  // key.datetime.ymdhme.full: "yyyy年M月d日, EEEE, HH:mm"
  // key.datetime.ymdhme.full.m.full.e: "yyyy年M月d日, EEEE, HH:mm"
  // key.datetime.ymdhme.full.m.short.e: "yyyy年M月d日, EEEE, HH:mm"
  // key.datetime.ymdhme.short: "yyyy年M月d日, EEE, HH:mm"
  // key.datetime.ymdhme.short.m.full.e: "yyyy年M月d日, EEE, HH:mm"
  // key.datetime.ymdhme.short.m.short.e: "yyyy年M月d日, EEE, HH:mm"
  // key.datetime.ymdhms.full: "yyyy年M月d日, HH:mm:ss"
  // key.datetime.ymdhms.short: "yyyy年M月d日, HH:mm:ss"
  // key.datetime.ymdhmse.full: "yyyy年M月d日, EEEE, HH:mm:ss"
  // key.datetime.ymdhmse.full.m.full.e: "yyyy年M月d日, EEEE, HH:mm:ss"
  // key.datetime.ymdhmse.full.m.short.e: "yyyy年M月d日, EEE, HH:mm:ss"
  // key.datetime.ymdhmse.short: "yyyy年M月d日, EEE, HH:mm:ss"
  // key.datetime.ymdhmse.short.m.full.e: "yyyy年M月d日, EEEE, HH:mm:ss"
  // key.datetime.ymdhmse.short.m.short.e: "yyyy年M月d日, EEE, HH:mm:ss"

  var formatter = new DateTimeFormatter(window.i18n_6002);
  console.log('test' + formatter.ymdhmFullString('2019/01/01 00:00:00'))

  console.log(formatter.mdShortString('2019-01-01 00:00:00'))
  console.log(formatter.mdFullString('2019-01-01 00:00:00'))
  console.log(formatter.mdCalendarString('2019-01-01 00:00:00'))
  console.log(formatter.mdeFullString('2019-01-01 00:00:00'))
  console.log(formatter.mdeShortString('2019-01-01 00:00:00'))
  console.log(formatter.mdhmFullString('2019-01-01 00:00:00'))
  console.log(formatter.mdhmShortString('2019-01-01 00:00:00'))
  console.log(formatter.mdhmsFullString('2019-01-01 00:00:00'))
  console.log(formatter.mdhmsShortString('2019-01-01 00:00:00'))
  console.log(formatter.ymCalendarString('2019-01-01 00:00:00'))
  console.log(formatter.ymFullString('2019-01-01 00:00:00'))
  console.log(formatter.ymShortString('2019-01-01 00:00:00'))
  console.log(formatter.ymdFullString('2019-01-01 00:00:00'))
  console.log(formatter.ymdShortString('2019-01-01 00:00:00'))
  console.log(formatter.ymdhmFullString('2019-01-01 00:00:00'))
  console.log(formatter.ymdhmShortString('2019-01-01 00:00:00'))
  console.log(formatter.ymdhmsFullString('2019-01-01 00:00:00'))
  console.log(formatter.ymdhmsShortString('2019-01-01 00:00:00'))
  console.log(formatter.ymdeFullString('2019-01-01 00:00:00'))
  console.log(formatter.ymdeShortString('2019-01-01 00:00:00'))
  console.log(formatter.ymdhmeFullString('2019-01-01 00:00:00'))
  console.log(formatter.ymdhmeShortString('2019-01-01 00:00:00'))
  console.log(formatter.ymdhmseFullString('2019-01-01 00:00:00'))
  console.log(formatter.ymdhmseShortString('2019-01-01 00:00:00'))
  console.log(formatter.hmeShortString('2019-01-01 00:00:00'))
  console.log(formatter.hmeFullString('2019-01-01 00:00:00'))
  console.log(formatter.hmseShortString('2019-01-01 00:00:00'))
  console.log(formatter.hmseFullString('2019-01-01 00:00:00'))
  console.log(formatter.eFullString('2019-01-01 00:00:00'))
  console.log(formatter.eShortString('2019-01-01 00:00:00'))
  console.log(formatter.mFullString('2019-01-01 00:00:00'))
  console.log(formatter.mShortString('2019-01-01 00:00:00'))
  console.log(formatter.hmString('2019-01-01 00:00:00'))
  console.log(formatter.hmsString('2019-01-01 00:00:00'))
  console.log(formatter.yString('2019-01-01 00:00:00'))
  console.log(formatter.mdhmeShortString('2019-01-01 00:00:00'))
  console.log(formatter.mdhmeFullString('2019-01-01 00:00:00'))
  console.log(formatter.dFullString('2019-01-01 00:00:00'))
  console.log(formatter.dShortString('2019-01-01 00:00:00'))

  var formatter2 = new NumberFormatter(window.i18n_6002);
  // formatter2.minimumFractionDigits = 0;
  // formatter2.maximumFractionDigits = 2;
  console.log('人民币', '¥' + formatter2.decimalString(12345.50, true, 0, 2))
  console.log('其他', 'USD' + formatter2.decimalString(12345.50, true, 2, 2))
})

interface IRootProp {

}

interface IRootState {
  translations: any,
  locales: any
}

class RootApp extends React.Component<IRootProp, IRootState> {
  constructor (props: any) {
    super(props)
    this.state = {
      locales: [ 'en-us', 'zh-cn' ],
      translations: {
        'en-us': require('./locales/en-us').default,
        'zh-cn': require('./locales/zh-cn').default,
      }
    }
  }
  loadSharkScript (appid: string, pageid: any, locale: any) {
    let url = ''
    if (pageid) {
      url = `https://ct.ctrip.com/m/i18n/${appid}/${pageid}/${locale}.js`
    } else {
      url = `https://ct.ctrip.com/m/i18n/${appid}/${locale}.js`
    }
    let setTranslationState = (source: any) => {
      this.setState({
        'translations': Object.assign({}, this.state.translations, {
          // @ts-ignore
          [locale]: Object.assign({}, this.state.translations[locale], source)
        })
      })
    }
    loadScript(url, {}, () => {
      if (window.i18n_apps) {
        for (let app in window.i18n_apps) {
          if (typeof window.i18n_apps[app] !== 'object') return
          setTranslationState(window.i18n_apps[app])
        }
      } else {
        // @ts-ignore
        setTranslationState(window[`i18n_${appid}`])
      }
    })
  }
  componentDidMount () {
    // this.loadSharkScript('6002', '', 'zh-cn')
    // this.loadSharkScript('100003842', '', 'zh-cn')
    // this.loadSharkScript('100003842-330152-330151-330153', '', 'en-us')

    // RModal.show({
    //   header: 'header',
    //   title: '我是标题我是标题我是标题我是标题我是标题我是标题'
    // })

    // let hideModel1 = RModal.show({
    //   type: 'modal',
    //   icon: 'warning',
    //   header: '我是标题我是标题我是标题我是标题我是标题我是标题',
    //   content: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    //   actions: [{
    //     name: 'error',
    //     style: 'error',
    //     callback: () => {
    //      return true
    //     }
    //   }, {
    //     name: 'disabled',
    //     style: 'error disabled',
    //     callback: () => {
    //      return true
    //     }
    //   }]
    // })

    // RModal.show({
    //   type: 'modal',
    //   icon: 'info',
    //   title: '我是标题我是标题我是标题我是标题我是标题我是标题',
    //   content: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    //   actions: [{
    //     name: '知道了',
    //     style: 'primary',
    //     callback: () => {
    //       return true
    //     }
    //   }, {
    //     name: '知道了',
    //     style: 'primary disabled',
    //     callback: () => {
    //       return false
    //     }
    //   }, {
    //     name: '知道了',
    //     style: 'secondary',
    //     callback: () => {
    //       return true
    //     }
    //   }, {
    //     name: '知道了',
    //     style: 'secondary disabled',
    //     callback: () => {
    //       return false
    //     }
    //   }]
    // })

    // let hideModel3 = RModal.show({
    //   type: 'confirm',
    //   icon: 'error',
    //   title: '我是标题我是标题我是标题我是标题我是标题我是标题',
    //   showClose: false,
    //   actions: [{
    //     name: '知道了',
    //     style: '',
    //     callback: () => {
    //       return true
    //     }
    //   }, {
    //     name: '知道了',
    //     style: 'disabled',
    //     callback: () => {
    //       return true
    //     }
    //   }]
    // })

    // let hideModel4 = RModal.show({
    //   type: 'confirm',
    //   icon: 'success',
    //   title: '我是标题我是标题我是标题我是标题我是标题我是标题',
    //   content: '我是标题我是标题我是标题我是标题我是标题我是标题',
    //   showClose: false,
    //   actions: [{
    //     name: '取消',
    //     callback: () => {
    //       return true
    //     }
    //   }, {
    //     name: '知道了',
    //     style: 'disabled',
    //     callback: () => {
    //       return true
    //     }
    //   }]
    // })
  }
  render () {
    let { t } = this.context
    return (
      <I18nProvider locales={this.state.locales} translations={this.state.translations}>
        <App />
      </I18nProvider>
    );
  }
}

ReactDOM.render(
  <RootApp/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
