import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Library from './screens/library'
import Record from './screens/record'
import { createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'
import library from './reducers/audio'

const store = createStore(combineReducers({library}))



var BottomNavigator = createBottomTabNavigator({
  Library: Library,
  Record: Record,
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        var iconName;
        if (navigation.state.routeName == 'Library') {
          iconName = 'md-photos';
          return <Ionicons name="ios-musical-note" size={30} color={tintColor} />;
        } else if (navigation.state.routeName == 'Record') {
          iconName = 'ios-camera';
          return <Ionicons name="md-microphone" size={30} color={tintColor}/>;
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#009788',
      inactiveTintColor: 'black',
      style: { backgroundColor: "#fff", borderTopColor: "#009788", borderTopWidth: "5px"},
    
      
      


    },
  }
);


var Navigation = createAppContainer(BottomNavigator);


 function App() {
  return (
    <Provider store={store}>
     <Navigation />
     </Provider>
   
   
  );
}

export default App

