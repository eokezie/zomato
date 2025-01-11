import React from 'react';
import { View, Image } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { emptyStyles } from '@unistyles/emptyStyles';

const LiveScreen = () => {
  const { styles } = useStyles(emptyStyles);

  return (
    <View style={styles.live_container}>
      <Image source={require('@assets/images/coming_soon2.jpg')} style={styles.emptyImage} />
    </View>
  );
};

export default LiveScreen;
