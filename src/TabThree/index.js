import React, { Component } from "react";
import TabThree from "./TabThree.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
  TabThree: { screen: TabThree },
}));
