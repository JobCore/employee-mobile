import React from 'react'
import { Image, View, Text, TouchableOpacity, Linking } from 'react-native'

import styles from './style'
import Instagram from './embeds/Instagram'
import Soundcloud from './embeds/Soundcloud'
import Tweet from './embeds/Tweet'

import moment from 'moment'

import { flatten } from 'ramda'
import { LEE_TAMBIEN_RED, PITAZO_GRAY, PITAZO_RED, ARTICLE_HEADER_GRAY } from '../constants/colors';

/**
 * @typedef {'img'|'instagram'|'soundcloud'|'twitter'} TagName
 */

/**
 * @typedef {object} Attribs
 * @prop {string} src For images
 * @prop {string} url For tweets, instagram and soundcloud
 */

/**
 * @typedef {(attribs: Attribs) => React.ReactElement<any>} Renderer
 */

const childrenUntilString = (stringChildOrOther) => {
  return stringChildOrOther
}

/**
 * @type {{ [k in TagName]: Renderer }}
 */

const renderers = {

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

  p: ({photocaption}, children) => {
    if (photocaption) {
      return (
        <Text
          style={{
            flex: 1,
            flexWrap: 'wrap',
            textAlign: 'left',
            fontSize: 15,
            fontWeight: 'bold',
            color: ARTICLE_HEADER_GRAY,
            fontStyle: 'italic',
            paddingLeft: 15,
            paddingRight: 15,
          }}
        >
          {g(children).join(' ')}
        </Text>
      )
    }
    return g(children).map(text => (
      <Text
        style={{
          textAlign: 'justify',
          marginTop: 10,
          marginBottom: 10,
          paddingLeft: 15,
          paddingRight: 15,
          lineHeight: 20,
        }}
      >
        {text}
      </Text>
    ))
      },
  date: ({ formatted }) => (
    <Text
      style={{
        paddingLeft: 15,
        paddingRight: 15,
        color: ARTICLE_HEADER_GRAY,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left'
      }}
    >
      {formatted}
    </Text>
  ),
  title: ({ text, category }) => (
    <Text
      style={{
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 24,
        textAlign: 'left',
        flexWrap: 'wrap',
      }}
    >
      <Text
        style={{
          color: ARTICLE_HEADER_GRAY,
          textAlign: 'left',
        }}
      >
        {`${category} | `}
      </Text>
      <Text
        style={{
          color: 'black',
          textAlign: 'left',
        }}
      >
        {text}
      </Text>    
    </Text>
  ),
  blockquote: ({ url , text }, children) => (
    <TouchableOpacity
      style={{
        backgroundColor: PITAZO_GRAY,
        flexDirection: 'row',
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 15,
        marginRight: 15,

      }}
      onPress={() => {
        Linking.canOpenURL('http://elpitazo.ml/ultimas-noticias/videos-medicos-y-trabajadores-de-salud-protestan-por-situacion-hospitalaria-en-el-pais').then((supported) => {
          if (supported) {
            Linking.openURL('http://elpitazo.ml/ultimas-noticias/videos-medicos-y-trabajadores-de-salud-protestan-por-situacion-hospitalaria-en-el-pais')
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
          style={{
            fontWeight: "bold",
            color: PITAZO_RED,
          }}
        >
          Lee también:
        </Text>
        <Text
          style={{
            flex: 1,
            flexWrap: 'wrap', // make text wrap
            fontWeight: 'bold',
            paddingLeft: 2,
          }}
        >
        {
          g(children)
            .join(' ').replace('Lee también:', '').trim()
          }
        </Text>
    </TouchableOpacity>
  )
}



function g(children) {
  const a = flatten(children)
    .filter(object => typeof object.props != 'undefined')
    .map(o => o.props)
    .filter(props => typeof props.children != 'undefined')
    .map(props => props.children)
  return flatten(a.map(children => {
    if (typeof children === 'string') return children
    return g(children)
  }))
  
}

export default renderers
