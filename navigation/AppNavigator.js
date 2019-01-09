import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

const AppNavigator = createStackNavigator({
  Login: LoginScreen,
  SignUp: SignUpScreen,
  ForgotPassword: ForgotPasswordScreen,
},{
  initialRouteName: 'Login',
  headerMode: 'none',
});

export default createAppContainer(AppNavigator);