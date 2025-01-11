import React from 'react';
import { View, Platform } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import LottieView from 'lottie-react-native';

import { homeStyles } from '@unistyles/homeStyles';

const Graphics: React.FC = () => {
  const { styles } = useStyles(homeStyles);

  return (
    <View style={styles.lottieContainer} pointerEvents="none">
      <LottieView
        style={styles.lottie}
        source={require('@assets/animations/event.json')}
        autoPlay
        loop={Platform.OS !== 'android'}
        hardwareAccelerationAndroid
      />
    </View>
  );
};

export default Graphics;
