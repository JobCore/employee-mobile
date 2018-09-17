/**
 * https://raw.githubusercontent.com/scazzy/react-native-webview-autoheight
 * Custom WebView with autoHeight feature
 *
 * @prop source: Same as WebView
 * @prop autoHeight: true|false
 * @prop defaultHeight: 100
 * @prop width: device Width
 * @prop ...props
 *
 * @author Elton Jain
 * @version v1.0.2
 */
/**
 * Typings, linting, add functionToInject, onMessage props
 * props
 * @author danlugo92
 */


import React, { Component } from 'react'
import { Dimensions, WebView } from 'react-native'
/**
 * @template T
 * @typedef {import('react-native').NativeSyntheticEvent<T>} NativeSyntheticEvent<T>
 */
/**
 * @typedef {import('react-native').WebViewMessageEventData} WebViewMessageEventData
 */
/**
 * @template T
 * @typedef {import('react-native').StyleProp<T>} StyleProp<T>
 */
/**
 * @typedef {import('react-native').ViewStyle} ViewStyle
 */
/**
 * @typedef {import('react-native').WebViewProperties} WebViewProps
 */


/**
 * @typedef {object} AutoHeightWebViewProps
 * @prop {number} defaultHeight
 * @prop {number=} width
 * @prop {boolean=} autoHeight
 * @prop {boolean=} scrollEnabled
 * @prop {StyleProp<ViewStyle>} style
 * @prop {Function} functionToInject Javascript function to be injected
 * @prop {(height: number) => void} onScriptMessage
 */

/**
 * @typedef {object} AutoHeightWebViewState
 * @prop {number} webViewHeight
 */

/**
 * @augments Component<AutoHeightWebViewProps & WebViewProps, AutoHeightWebViewState>
 */
export default class AutoHeightWebView extends Component {
  /**
   * @param {AutoHeightWebViewProps} props
   */
  constructor(props) {
    super(props)
    /**
     * @type {AutoHeightWebViewState}
     */
    this.state = {
      webViewHeight: this.props.defaultHeight,
    }

    this._onMessage = this._onMessage.bind(this)
  }


  componentDidMount() {
    this.mounted = true
    if (this.webView) {
      this.webView.reload()
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  /**
   * @param {NativeSyntheticEvent<WebViewMessageEventData>} e
   */
  _onMessage(e) {
    const height = parseInt(e.nativeEvent.data, 10)
    this.setState({
      webViewHeight: height,
    })
    this.props.onScriptMessage(height)
  }

  render() {
    const _w = this.props.width || Dimensions.get('window').width
    const _h = this.props.autoHeight
      ? this.state.webViewHeight
      : this.props.defaultHeight

    const { functionToInject } = this.props

    return (
      <WebView
        ref={(ref) => { this.webView = ref }}
        injectedJavaScript={
          // eslint-disable-next-line prefer-template
          '(' + String(functionToInject) + ')(); window.postMessage = String(Object.hasOwnProperty).replace(\'hasOwnProperty\', \'postMessage\');'
        }
        scrollEnabled={this.props.scrollEnabled || false}
        onMessage={this._onMessage}
        javaScriptEnabled
        automaticallyAdjustContentInsets
        {...this.props}
        style={[this.props.style, { width: _w }, { height: _h }]}
      />
    )
  }
}

AutoHeightWebView.defaultProps = {
  autoHeight: true,
}
