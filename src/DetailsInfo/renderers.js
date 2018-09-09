import React from 'react'

import { flatten } from 'ramda'
import { Text, TouchableOpacity, Linking } from 'react-native'

import { SMALL_FONT_SIZE, MEDIUM_FONT_SIZE, LARGE_FONT_SIZE } from '../constants/config'

import styles from './style'
import Instagram from './embeds/Instagram'
import Soundcloud from './embeds/Soundcloud'
import Tweet from './embeds/Tweet'


/**
 * @typedef {'instagram'|'soundcloud'|'twitter'|'author'|'p'|'date'|'title'|'blockquote'|'connect'} TagName
 */

/**
 * @typedef {object} Attribs
 * @prop {string} src For images
 * @prop {string} url For tweets, instagram and soundcloud
 * @prop {boolean} photocaption For <p>
 * @prop {string} formatted For <date>
 * @prop {string} text For <title> and <connect>
 * @prop {string} category For <title>
 * @prop {string} name For <author>
 */

/**
 * @typedef {(attribs: Attribs, children: any[]) => JSX.Element|JSX.Element[]} Renderer
 */


/**
 * Recurses the react native tree created by react-native-render-html until
 * it finds raw strings, returns an array of only those raw strings.
 * @param {ReadonlyArray<any>} children
 * @returns {string[]}
 */
const recurseUntilStringChildren = (children) => {
  const a = flatten(children)
    .filter(object => typeof object.props !== 'undefined')
    .map(o => o.props)
    .filter(props => typeof props.children !== 'undefined')
    .map(props => props.children)
  // @ts-ignore
  return flatten(a.map((otherChildren) => {
    if (typeof otherChildren === 'string') return otherChildren
    return recurseUntilStringChildren(otherChildren)
  }))
}


/**
 * @type {(fontSize: number) => { [k in TagName]: Renderer }}
 */
const renderers = (fontSize) => {
  /**
   * @type {typeof styles.pSmallFontSize}
   */
  let pStyle
  if (fontSize === SMALL_FONT_SIZE) {
    pStyle = styles.pSmallFontSize
  }

  if (fontSize === MEDIUM_FONT_SIZE) {
    pStyle = styles.pMediumFontSize
  }

  if (fontSize === LARGE_FONT_SIZE) {
    pStyle = styles.pLargeFontSize
  }

  /**
   * @type {typeof styles.pSmallFontSize}
   */
  let linkTextStyle
  if (fontSize === SMALL_FONT_SIZE) {
    linkTextStyle = styles.linkTextSmall
  }

  if (fontSize === MEDIUM_FONT_SIZE) {
    linkTextStyle = styles.linkTextMedium
  }

  if (fontSize === LARGE_FONT_SIZE) {
    linkTextStyle = styles.linkTextLarge
  }

  return {
    instagram: ({ url }) => (
      <Instagram
        url={url}
      />
    ),
    soundcloud: ({ url }) => (
      <Soundcloud
        url={url}
      />
    ),
    twitter: ({ url }) => (
      <Tweet
        url={url}
      />
    ),

    author: ({ name }) => (
      <Text
        style={styles.photocaption}
      >
        {`Autor: ${name}`}
      </Text>
    ),

    p: ({ photocaption }, children) => {
      if (photocaption) {
        return (
          <Text
            style={styles.photocaption}
          >
            {recurseUntilStringChildren(children).join(' ')}
          </Text>
        )
      }
      return recurseUntilStringChildren(children).map(text => (
        <Text
          style={pStyle}
        >
          {text}
        </Text>
      ))
    },
    date: ({ formatted }) => (
      <Text
        style={styles.date}
      >
        {formatted}
      </Text>
    ),
    title: ({ text, category }) => (
      <Text
        style={styles.title}
      >
        <Text
          style={styles.titleCategoryText}
        >
          {`${category} | `}
        </Text>
        <Text
          style={styles.titleText}
        >
          {text}
        </Text>
      </Text>
    ),
    connect: ({ text, url }) => (
      <TouchableOpacity
        style={styles.linkTouchableOpacity}
        onPress={() => {
          Linking.canOpenURL(url).then((supported) => {
            if (supported) {
              Linking.openURL(url)
            }
            if (__DEV__) {
              throw new Error(
                `React native's Linking reports not being able to open this link's url, found url: ${url}`
              )
            }
          })
        }}
      >
        <Text
          style={linkTextStyle}
        >
          <Text
            style={styles.redText}
          >
            Lee tambien:
          </Text>
          <Text>
            {text.replace('Lee también', '').replace('Lea también', '')}
          </Text>
        </Text>
      </TouchableOpacity>
    ),
    // backend might not catch all connects so we fallback to blockquote
    // processing here
    blockquote: ({ url }, children) => (
      <TouchableOpacity
        style={styles.linkTouchableOpacity}
        onPress={() => {
          Linking.canOpenURL(url).then((supported) => {
            if (supported) {
              Linking.openURL(url)
            }
            if (__DEV__) {
              throw new Error(
                `React native's Linking reports not being able to open this link's url, found url: ${url}`
              )
            }
          })
        }}
      >
        <Text
          style={linkTextStyle}
        >
          <Text
            style={styles.redText}
          >
            Lee tambien:
          </Text>
          <Text>
            {recurseUntilStringChildren(children)
              .join('')
              .replace('Lee también', '')
              .replace('Lea también', '')
            }
          </Text>
        </Text>
      </TouchableOpacity>
    ),
  }
}


export default renderers
