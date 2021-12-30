
import React from 'react';
import Login from '../src/screens/Login'
import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

export const AuthNavigator = () => {
    return(
    <AuthStack.Navigator >
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    </AuthStack.Navigator>
  );
    }