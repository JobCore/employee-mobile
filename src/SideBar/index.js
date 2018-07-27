import React, { Component } from "react";
import DetailsInfo from "../DetailsInfo/DetailsInfo.js";
import ProfileScreen from "../ProfileScreen/Profile.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
  DetailsInfo: { screen: DetailsInfo },
  ProfileScreen: { screen: ProfileScreen },
}));
