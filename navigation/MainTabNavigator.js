import React from 'react';
import { createMaterialTopTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation';

import PrivateProfileScreen from "../screens/auth/PrivateProfileScreen";
import MatchScreen from "../screens/auth/MatchScreen";
import ChatListScreen from "../screens/auth/ChatListScreen";
import EditPrivateProfileScreen from "../screens/auth/EditPrivateProfileScreen";
import ChatScreen from '../screens/auth/ChatScreen';

const tabNavigator = createMaterialTopTabNavigator({
  Matches: MatchScreen,
  Profile: PrivateProfileScreen,
  ChatList: ChatListScreen,
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  order: ['ChatList', 'Matches', 'Profile'],
  initialRouteName: 'Matches',
  animationsAreEnabled: true,
  lazy: true,
  indicatorStyle: {
    display: 'none',
  },
  tabBarOptions: {
    activeTintColor: '#000',
    style: {
      backgroundColor: '#fff',
    }
  }
});

const tabNavigation = createAppContainer(tabNavigator);

const MainNavigator = createStackNavigator({
  tabNavigation: {
    screen: tabNavigation,
    navigationOptions: {},
  },
  EditPrivateProfile: {
    screen: EditPrivateProfileScreen,
    navigationOptions: {
      gestureEnabled: false,
    }
  },
  Chat: {
    screen: ChatScreen,
  }
},{
  headerMode: 'none',
  initialRouteName: 'tabNavigation',
});

export default createAppContainer(MainNavigator);