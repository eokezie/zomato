import React from 'react';
import { Image, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { splashStyles } from '@unistyles/authStyles';
import { resetAndNavigate } from '@utils/NavigationUtils';
import CustomText from '@components/global/CustomText';

const SplashScreen: React.FC = () => {
  const { styles } = useStyles(splashStyles);

  React.useLayoutEffect(() => {
    const timeoutId = setTimeout(() => {
      resetAndNavigate('LoginScreen');
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden={Platform.OS !== 'android'} />
      <Image source={require('@assets/images/logo.png')} style={styles.logoImage} />
      <Animated.View
        style={styles.animatedContainer}
        entering={FadeInDown.delay(400).duration(800)}
      >
        <Image source={require('@assets/images/tree.png')} style={styles.treeImage} />
        <CustomText variant="h5" style={styles.msgText} fontFamily="Okra-Medium" color="#FFFFFF">
          Carbon and Plastic Neutral Deliveries in America
        </CustomText>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
