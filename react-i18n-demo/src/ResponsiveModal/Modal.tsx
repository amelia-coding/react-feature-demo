import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { CSSTransition } from 'react-transition-group'

import './modal.scss'

export interface ModalAction {
  // 按钮文案
  name: string;
  // '' | 'primary' | 'secondary' | 'error' | 'disabled'
  style?: string;
  // true - 关闭浮层
  callback: () => boolean | void | Promise<boolean>;
}

export interface ModalPosition {
  top: string;
  left: string;
}

export interface ModalProps {
  // 是否显示
  visible?: boolean;
  // 是否响应式
  responsive?: boolean;
  // 响应式规则
  responsiveRule?: 'modal-popup';
  // 弹窗类型
  type?: 'confirm' | 'modal' | 'popover' | 'popup';
  // popover箭头方向
  placement?: 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'right-top' | 'right-bottom' | 'bottom-left' | 'bottom-right' | 'left-top' | 'left-bottom';
  // 父级元素，默认body
  parent?: HTMLElement;
  // 标题栏
  header?: React.ReactChild | string;
  // 标题
  title?: React.ReactChild | string;
  // 是否显示关闭按钮
  showClose?: boolean;
  // 是否显示遮罩
  showMask?: boolean;
  // 标题前的icon类型
  icon?: 'warning' | 'error' | 'info' | 'success';
  // 弹框内容
  content?: React.ReactChild | string;
  // 弹框内容
  children?: React.ReactChild;
  // 按钮列表
  actions?: ModalAction[];
  // 位置，popover
  position?: ModalPosition;
  // 关闭回调
  onClose?: () => void;
}

const Icon = () => {
  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <symbol id="icon-close" viewBox="0 0 256 256">
            <path d="M200.2 37.35l18.45 18.45-72.2 72.2 72.2 72.2-18.45 18.45-72.2-72.2-72.2 72.2-18.45-18.45 72.2-72.2-72.2-72.2L55.8 37.35l72.2 72.2 72.2-72.2z"/>
          </symbol>
          <symbol id="icon-warning" viewBox="0 0 256 256">
            <path d="M128 10.65c64.8 0 117.35 52.55 117.35 117.35S192.8 245.35 128 245.35 10.65 192.8 10.65 128 63.2 10.65 128 10.65zm10.65 154.7H117.3v21.35h21.35v-21.35zm0-96H117.3v80h21.35v-80z" fill="#f27900"/>
          </symbol>
          <symbol id="icon-error" viewBox="0 0 256 256">
            <path d="M128 10.65c64.8 0 117.35 52.55 117.35 117.35S192.8 245.35 128 245.35 10.65 192.8 10.65 128 63.2 10.65 128 10.65zm10.65 154.7H117.3v21.35h21.35v-21.35zm0-96H117.3v80h21.35v-80z" fill="rgb(221, 38, 36)"/>
          </symbol>
          <symbol id="icon-info" viewBox="0 0 256 256">
            <path d="M128 245.35c64.8 0 117.35-52.55 117.35-117.35S192.8 10.65 128 10.65 10.65 63.2 10.65 128 63.2 245.35 128 245.35zm0-21.35c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96zm8-133.35V64h-21.35v26.65H136zM154.65 192v-16h-16v-74.65H101.3v16h16V176h-16v16h53.35z" fill="rgb(65, 80, 208)"/>
          </symbol>
          <symbol id="icon-success" viewBox="0 0 256 256">
            <path d="M128 10.65c64.8 0 117.35 52.55 117.35 117.35S192.8 245.35 128 245.35 10.65 192.8 10.65 128 63.2 10.65 128 10.65zm55.3 64l-72.4 69.5-38.2-36.65-19.35 18.55 57.55 55.25 91.75-88.1-19.35-18.55z" fill="rgb(18, 148, 164)"/>
          </symbol>
        </defs>
      </svg>
    </>
  )
}

const Modal = (props: ModalProps) => {
  const { header, title, content, children, showClose = true, icon, actions = [], onClose, visible, position, placement } = props
  const responsive = props.responsive !== false
  const type = props.type || 'modal'
  const showMask = props.type !== 'popover' &&  props.showMask !== false
  const responsiveRule = props.responsiveRule || type
  const parent = props.parent || document.body

  const specialStyle = { 'no-header': !header, 'no-title': !title, 'no-content': !content && !children, 'no-footer': actions.length === 0 }
  const responsiveStyle = { 'responsive': responsive, ['responsive-' + responsiveRule]: responsive }
  const placementStyle = type === 'popover' && placement ? 'modal-placement-' + placement : 'modal-placement-top'

  let modalPositionStyle = {}
  if (position) {
    modalPositionStyle = {...position}
  }

  return ReactDOM.createPortal(
    <>
      {
        showMask && (
          <CSSTransition in={visible} unmountOnExit={true} timeout={300} appear={true} classNames="modal-animate-mask">
          <div className={classnames('modal-mask', 'modal-' + type + '-mask', responsiveStyle)}></div>
          </CSSTransition>
        )
      }
      <CSSTransition in={visible} unmountOnExit={true} timeout={300} appear={true} classNames={classnames('modal-animate-' + responsiveRule)}>
      <div className={classnames('modal-wrap', 'modal-' + type + '-wrap', responsiveStyle)} style={modalPositionStyle}>
        <div className={classnames('modal', 'modal-' + type, specialStyle, placementStyle, responsiveStyle)}>
          <div className="modal-header">
            {header}
            {header && showClose ?
            (
            <svg className="modal-icon-close modal-symbol" onClick={onClose}>
              <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#icon-close"></use>
            </svg>
            ) : null
            }
          </div>
          <div className="modal-inner">
            <div className="modal-title">
              {
                icon ?
                (
                <svg className={classnames('modal-icon-' + icon, 'modal-title-icon', 'modal-symbol')}>
                  <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref={"#icon-" + icon}></use>
                </svg>
                ) : null
              }
              {title}
              {
                !header && showClose ?
                (
                  <svg className="modal-icon-close modal-symbol" onClick={onClose}>
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#icon-close"></use>
                  </svg>
                ) : null
              }
            </div>
            <div className="modal-content">
              <div className="modal-content-header"></div>
              <div className="modal-content-body">
                {children || content}
              </div>
              <div className="modal-content-footer"></div>
            </div>
            <div className="modal-footer">
              {
                actions.map((action, idx) => {
                  return <div key={idx + action.name} className={classnames('modal-action', action.style || '')} onClick={action.callback}>{action.name}</div>
                })
              }
            </div>
          </div>
        </div>
        <Icon/>
      </div>
      </CSSTransition>
    </>,
    parent
  )
}

export default Modal