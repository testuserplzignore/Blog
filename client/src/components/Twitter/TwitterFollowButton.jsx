import React, { useEffect } from 'react'
import twitterWidgetUrl from './twitterWidgetUrl'
import executionEnvironment from 'exenv'

function TwitterFollowButton(props){
  const followButton = React.createRef();
  const options = props.options || {};

  useEffect(()=>{
    const mountTwitterButton = () =>{
      if (executionEnvironment.canUseDOM) {
        const script = require('scriptjs')
        script(twitterWidgetUrl, 'twitter-embed', ()=>{
          if (!window.twttr) {
            console.error('Failed to load window.twttr in TwitterFollowButton');
            return
          }
          if (!!followButton.current) {
            window.twttr.widgets.createFollowButton(
              props.screenName,
              followButton.current,
              options,
            )
          }
        })
      }
    }
    mountTwitterButton();
  }, [followButton, options, props.screenName])

  return(
    <div ref={followButton} />
  )
}

export default TwitterFollowButton
