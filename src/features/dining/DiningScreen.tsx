import React from 'react';
import { View, Image } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { emptyStyles } from '@unistyles/emptyStyles';

const DiningScreen = () => {
  const { styles } = useStyles(emptyStyles);

  return (
    <View style={styles.container}>
      <Image source={require('@assets/images/coming_soon.jpg')} style={styles.emptyImage} />
    </View>
  );
};

export default DiningScreen;
