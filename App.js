// Find out why eslint is complaining here
/* eslint-disable react/no-unused-state */

import React, { Component } from 'react'

import HomeScreen from './src/HomeScreen'

export default class AwesomeApp extends Component {
  constructor() {
    super()
    this.state = {
      isReady: false,
    }
  }

  async componentWillMount() {
    this.setState({ isReady: true })
  }

  render() {
    return <HomeScreen />
  }
}
