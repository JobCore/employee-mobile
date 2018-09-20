/* eslint-disable */

const js = function () {
  function waitForBridge() {
    // @ts-ignore
    if (window.postMessage.length !== 1 || typeof window.twttr.ready !== 'function'){
      setTimeout(waitForBridge, 200);
    }
    else {
      // @ts-ignore
      twttr.ready((twttr) => {
        twttr.events.bind('click', (e) => e.preventDefault())
        twttr.events.bind('tweet', (e) => e.preventDefault())
        twttr.events.bind('follow', (e) => e.preventDefault())
        twttr.events.bind('retweet', (e) => e.preventDefault())
        twttr.events.bind('like', (e) => e.preventDefault())
        twttr.events.bind('rendered', () => {
          let height = 0;
          // @ts-ignore
          if(document.documentElement.clientHeight>document.body.clientHeight)
          {
            // @ts-ignore
            height = document.documentElement.clientHeight
          }
          else
          {
            // @ts-ignore
            height = document.body.clientHeight
          }
          // @ts-ignore
          postMessage(height)
        })
      })
    }
  }

  waitForBridge();
};

export default js
