import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Modal, { ModalProps } from './Modal'

const RModal = (props: ModalProps) => {
    const [visible, setIsVisible] = useState(true)
    const onClose = () => setIsVisible(false)
    const actions = props.actions || []
    const newProps = Object.assign({}, props, {
        onClose: () => {
            props.onClose && props.onClose()
            onClose()
        },
        actions: actions.map(action => {
            var oldCallback = action.callback
            action.callback = () => {
                let ret = oldCallback && oldCallback()
                if (ret) {
                    if (typeof ret === 'object' && typeof ret.then === 'function') {
                        ret.then(resolveRet => {
                            resolveRet && onClose()
                        })
                    } else {
                        onClose()
                    }
                }
            }
            return action
        })
    })
    return (
        <Modal visible={visible} {...newProps}>
            {props.children}
        </Modal>
    )
}

const RModalUtil = {
    show: (props?: ModalProps) => {
        const parent = document.createElement('div')

        parent.id = 'modal-' + Date.now()

        ReactDOM.render(
            <RModal {...props}/>
        , parent)
    },
    showConfirm: (props?: ModalProps) => {
        RModalUtil.show({
            type: 'confirm',
            icon: 'warning',
            ...props
        })
    },
    showModal: (props?: ModalProps) => {
        RModalUtil.show({
            type: 'modal',
            ...props
        })
    },
    showPopover: (props?: ModalProps) => {
        RModalUtil.show({
            type: 'popover',
            ...props
        })
    }
}

export default RModalUtil