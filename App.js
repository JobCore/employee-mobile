/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, { Component } from "react";
 import HomeScreen from "./src/HomeScreen/index.js";
 export default class AwesomeApp extends Component {
   constructor() {
     super();
     this.state = {
       isReady: false
     };
   }
   async componentWillMount() {
     this.setState({ isReady: true });
   }
   render() {
     return <HomeScreen />;
   }
 }
