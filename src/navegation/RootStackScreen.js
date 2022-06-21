import React from 'react';
import SplashScreen from '../screens/splash/splash_screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login/Login';
import MainTabScreen from './MainTabScreen';
import Register from '../screens/register/Register';

const RootStack = createNativeStackNavigator();

const RootStackScreen = () => (
    <RootStack.Navigator headerMode="none">
        <RootStack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
                headerShown: false,
            }}
        />
        <RootStack.Screen
            name="SignInScreen"
            component={Login}
            options={{
                headerShown: false,
            }}
        />
         <RootStack.Screen
            name="RegisterScreen"
            component={Register}
            options={{
                headerShown: false,
            }}
        />
        <RootStack.Screen
            name="Home_Invitado"
            component={MainTabScreen}
            options={{
                headerShown: false,
            }}
        />
    </RootStack.Navigator>
);

export default RootStackScreen;
