
import React from 'react';
import Dashboard from '../src/screens/Dashboard'
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

export const AppNavigator = () => {
    return(
    <AppStack.Navigator >
    <AppStack.Screen
      name="Dashboard"
      component={Dashboard}
      options={{ headerShown: false }}
    />
    </AppStack.Navigator>
  );
    }