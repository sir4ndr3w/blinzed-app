import React from 'react';
import { createMaterialTopTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation';

import PrivateProfileScreen from "../screens/auth/PrivateProfileScreen";
import MatchScreen from "../screens/auth/MatchScreen";
import ChatListScreen from "../screens/auth/ChatListScreen";
import EditPrivateProfileScreen from "../screens/auth/EditPrivateProfileScreen";
import ChatScreen from '../screens/auth/ChatScreen';
import EditPrivateProfileEmail from "../screens/auth/EditPrivateProfileEmail";
import EditPrivateProfilePassword from "../screens/auth/EditPrivateProfilePassword";

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
      gesturesEnabled: false,
    }
  },
  EditPrivateProfileEmail: {
    screen: EditPrivateProfileEmail,
    navigationOptions: {
      gesturesEnabled: false,
    }
  },
  EditPrivateProfilePassword: {
    screen: EditPrivateProfilePassword,
    navigationOptions: {
      gesturesEnabled: false,
    }
  },
  Chat: {
    screen: ChatScreen,
  }
},{
  headerMode: 'none',
  initialRouteName: 'tabNavigation',
  swipeEnabled: false,
});

export default createAppContainer(MainNavigator);