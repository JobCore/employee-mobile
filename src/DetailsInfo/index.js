import React from 'react'
/**
 * @template T
 * @typedef {import('react').SFC<T>} SFC
 */

/**
 * @template T, O, S
 * @typedef {import('react-navigation').NavigableComponent<T, O, S>} NavigableComponent
 */
/**
 * @typedef {import('react-navigation').NavigationScreenProp<NavigationState>} NavigationScreenProp
 */

/**
 * @typedef {import('../definitions').NavigationState} NavigationState
 */

import DetailsInfoView from './DetailsInfoView'


/**
 * @typedef {object} DetailsInfoProps
 * @prop {NavigationScreenProp} navigation Navigation screen property
 */

/**
 * @type {SFC<DetailsInfoProps>}
 */
const DetailsInfo = ({ navigation }) => {
  const html = navigation.getParam(
    'html',
    '<p>html missing in DetailsInfo/index.js'
  )

  return (
    <DetailsInfoView
      html={html}
      onShare={() => {
        if (__DEV__) {
          // eslint-disable-next-line no-console
          console.warn('SHARE BUTTON PRESSED, IMPLEMENTATION PENDING')
        }
      }}
      navigation={navigation}
    />
  )
}

export default DetailsInfo
