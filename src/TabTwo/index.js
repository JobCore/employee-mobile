import React, { Component } from "react";
import TabTwo from "./TabTwo.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
  TabTwo: { screen: TabTwo },
}));
