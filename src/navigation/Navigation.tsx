import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { navigationRef } from '@utils/NavigationUtils';
import SplashScreen from '@features/auth/SplashScreen';
import LoginScreen from '@features/auth/LoginScreen';
import AnimatedTabs from '@features/tabs/AnimatedTabs';

const Stack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="UserBottomTab"
          component={AnimatedTabs}
          options={{
            animation: 'fade',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
