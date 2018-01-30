import React from 'react';
import {
  TabNavigator,
  StackNavigator,
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import Landing from '../screens/landing.js'
import Feed from '../screens/feed.js';
import Settings from '../screens/settings.js';
import Profile from '../screens/profile.js';
import UserDetail from '../screens/userdetail.js';
import Chat from '../screens/chat.js'

export const FeedStack = StackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: ({navigation}) => ({
      title: 'Feed',
    }),
  },
  Details: {
    screen: UserDetail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.detailsProps.name}`,//'User Detail'//`${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`,
    }),
  },
},
{
  headerMode: 'screen',
});

export const ChatStack = StackNavigator({
  Chat: {
    screen: Chat,
    navigationOptions: {
      title: 'Chat',
    },
  },
  Details: {
    screen: UserDetail,
    navigationOptions: ({navigation}) => ({
      title: 'User Detailz'
    }),
  },
});

export const ProfileStack = StackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Profile',
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
    },
  },
});

export const Tabs = TabNavigator({
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />,
    },
  },
  Feed: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  Chat: {
    screen: ChatStack,
    navigationOptions: {
      tabBarLabel: 'Chat',
      tabBarIcon: ({ tintColor }) => <Icon name="chat" size={35} color={tintColor} />,
    },
  },
},
{
  initialRouteName: 'Feed',
});

export const Root = StackNavigator({
  LandingScreen: {
    screen: Landing,
  },
  Tabs: {
    screen: Tabs,
  },
  // Settings: {
  //   screen: SettingsStack,
  // },
}, {
  mode: 'modal',
  headerMode: 'none',
});
