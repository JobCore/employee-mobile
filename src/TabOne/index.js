import React, { Component } from "react";
import TabOne from "./TabOne.js";
import DetailsInfo from "../DetailsInfo/DetailsInfo.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
  DetailsInfo: { screen: DetailsInfo },
  TabOne: { screen: TabOne },

}));
