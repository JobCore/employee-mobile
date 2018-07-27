import React, { Component } from "react";
import Profile from "./Profile.js";
import DetailsInfo from "../DetailsInfo/DetailsInfo.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
  Profile: { screen: Profile },
  DetailsInfo: { screen: DetailsInfo },
}));
