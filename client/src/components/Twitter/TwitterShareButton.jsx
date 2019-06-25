import React, { useEffect } from 'react'
import twitterWidgetUrl from './twitterWidgetUrl'
import executionEnvironment from 'exenv'

function TwitterShareButton(props) {
  const shareButton = React.createRef();
  const options = props.options || {}

  useEffect(()=>{
    const mountTwitterButton = () =>{
      if (executionEnvironment.canUseDOM) {
        const script = require('scriptjs')
        script(twitterWidgetUrl, 'twitter-embed', ()=>{
          if (!window.twttr) {
            console.error('Failed to load window.twttr in TwitterFollowButton');
            return
          }
          if(!!shareButton.current){
            window.twttr.widgets.createShareButton(
              props.url,
              shareButton.current,
              options,
            )
          }
        })
      }
    }
    mountTwitterButton();
  }, [shareButton, options, props.url])

  return(
    <div ref={shareButton} />
  )
}

export default TwitterShareButton
