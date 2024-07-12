import { CSSProperties, useState } from 'react'
import { createPortal } from 'react-dom'
import { Platform, View } from 'react-native'

export const IFrameWebView = ({
  ...props
}) => {

    if (Platform.OS === 'web') {
        const [contentRef, setContentRef] = useState('')
        const mountNode =
          contentRef?.contentWindow?.document?.body
      
        return (
            <iframe {...props} ref={setContentRef}>
              {mountNode && createPortal(mountNode)}
            </iframe>
          )
    };
    return (<View {...props}/>);
};

export default IFrameWebView;

const styles: CSSProperties = {
    height: 600,
    width: 800
};