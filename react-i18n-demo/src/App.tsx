import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useI18n, withI18n } from './i18n';
import I18nContext, { I18nContextProps } from './i18n/I18nContext';
import { stringify } from 'querystring';

import RModal from './ResponsiveModal/index'


// import React from 'react'

import Modal from './ResponsiveModal/Modal'

// const App = React.memo(() => {
//   const { show, hide, RenderModal } = useModal()
//   return (
//     <div>
//       <div>
//         <p>some content...</p>
//         <button onClick={show}>打开</button>
//         <button onClick={hide}>关闭</button>
//         <RenderModal>
//           <p>这里面的内容将会被渲染到'modal-root'容器里.</p>
//         </RenderModal>
//       </div>
//       <div id='modal-root' />
//     </div>
//   )
// })

// export default App

interface IProps {
  name: string;
}
class Welcome extends React.Component<IProps & I18nContextProps> {
  render() {
    let { t, name } = this.props
    return (
      <>
        <h1>Hello, {t('learn_react')}</h1>
        <h1>Hello, {name}</h1>
        <h1>Hello, {t('i18n_100003842.Booking.Date')}</h1>
        <h1>Hello, {t('i18n_100003842.Hotel_ApprovalNo', {'♂♀': '1234'}, '默认值')}</h1>
        <h1>Hello, {t('i18n_100003842.Hotel_ApprovalNo', (ret: string) => ret.replace('♂♀', '1234'), '默认值')}</h1>
      </>
    );
  }
}

const withI18nComponent = withI18n()

const I18nWelcome = withI18nComponent(Welcome)

// class App extends React.Component {
//   static contextType = I18nContext
//   render () {
//     let { t } = this.context
//     return (
//       <div className="App">
//         <h1 style={{ fontSize: '11px' }}>测试字体</h1>
//         <h1 style={{ fontSize: '13px' }}>测试字体</h1>
//         <h1 style={{ fontSize: '14px' }}>测试字体</h1>
//         <h1 style={{ fontSize: '26px' }}>测试字体</h1>
//         <I18nWelcome {...this.context} name={t('learn_react')}></I18nWelcome>
//       </div>
//     );
//   }
// }

type RectResult = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
};

function getRect<T extends HTMLElement>(element?: T | null): RectResult {
  let rect: RectResult = {
    bottom: 0,
    height: 0,
    left: 100,
    right: 0,
    top: 100,
    width: 0
  };
  if (element) rect = element.getBoundingClientRect();
  return rect;
}

function getPosition (popoverRef: any) {
  const rect = popoverRef && popoverRef.current ? getRect(popoverRef.current) : getRect()

  const position = {
    top: rect.top + rect.height + 20 + 'px',
    left: rect.left + 'px'
  }

  return position
}

const App: React.FC = () => {
  const { t, setLocale } = useI18n();

  const [ visible, setIsVisible ] = useState(true)

  const [ visiblePopover, setVisiblePopover ] = useState(false)
  const [ responsiveVisiblePopover, setResponsiveVisiblePopover ] = useState(false)

  const popoverRef = useRef(null)

  const position = getPosition(popoverRef)

  return (
    <div className="App">
      {/* <header className="App-header"> */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('learn_react')}
        </a>
      {/* </header> */}
      <footer className="App-Footer">
        <span className="App-Locale" onClick={() => setLocale('en-us')}>English</span>
        {' | '}
        <span className="App-Locale" onClick={() => setLocale('zh-cn')}>正體中文</span>
      </footer>

      <button onClick={() => setIsVisible(true)}>打开</button>
      <button onClick={() => setIsVisible(false)}>关闭</button>

      <button onClick={() => {
        RModal.showModal({
          responsive: true,
          title: 'Hello World',
          content: 'test'
        })
      }}>ResponsiveModal</button>

      <button onClick={() => {
        RModal.showModal({
          responsive: false,
          type: 'modal',
          title: 'Hello World',
          content: 'test'
        })
      }}>Non-ResponsiveModal</button>

      <button onClick={() => {
        RModal.showModal({
          responsive: true,
          type: 'popup',
          title: 'Hello World',
          content: 'test'
        })
      }}>ResponsivePopup</button>

      <button onClick={() => {
        RModal.showModal({
          responsive: false,
          type: 'popup',
          title: 'Hello World',
          content: 'test'
        })
      }}>Non-ResponsivePopup</button>

      <button ref={popoverRef} onMouseOver={() => setVisiblePopover(true)} onMouseOut={() => setVisiblePopover(false)}>Non-ResponsivePopover</button>

      <button onClick={() => {
        RModal.showConfirm({
          title: 'Hello World',
          actions: [{
            name: 'test',
            style: 'primary',
            callback: () => true
          }, {
            name: 'test',
            style: 'primary',
            callback: () => true
          }]
        })
      }}>Confirm</button>

      <button onClick={() => {
        RModal.showConfirm({
          title: '点击5s后关闭',
          actions: [{
            name: '关闭',
            style: 'primary',
            callback: () => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(true)
                }, 5000)
              })
            }
          }]
        })
      }}>Resolve</button>

      <Modal type="modal" responsive={false} visible={false} title="退改签政策" onClose={() => setIsVisible(false)} actions={[{ name: '知道了', callback: () => setIsVisible(false) }]}>
        <>
          <p>这里面的内容将会被渲染到'modal-root'容器里.</p>
          <p>这里面的内容将会被渲染到'modal-root'容器里.</p>
          <p>这里面的内容将会被渲染到'modal-root'容器里.</p>
          <p>这里面的内容将会被渲染到'modal-root'容器里.</p>
          <p>这里面的内容将会被渲染到'modal-root'容器里.</p>
          <p>这里面的内容将会被渲染到'modal-root'容器里.</p>
        </>
      </Modal>

      <Modal responsive={false} type="popover" placement="top-left" visible={visiblePopover} position={position}>
        <>
          <p>这里面的内容将会被渲染到'modal-root'容器里.</p>
          <p>这里面的内容将会被渲染到'modal-root'容器里.</p>
          <p>这里面的内容将会被渲染到'modal-root'容器里.</p>
          <p>这里面的内容将会被渲染到'modal-root'容器里.</p>
          <p>这里面的内容将会被渲染到'modal-root'容器里.</p>
          <p>这里面的内容将会被渲染到'modal-root'容器里.</p>
        </>
      </Modal>
    </div>
  );
}

export default App;
