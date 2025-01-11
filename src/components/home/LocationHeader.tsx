import React from 'react';
import { View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { useShareState } from '@features/tabs/SharedContext';
import { homeStyles } from '@unistyles/homeStyles';
import Icon from '@components/global/Icon';
import CustomText from '@components/global/CustomText';

const LocationHeader: React.FC = () => {
  const { scrollYGlobal } = useShareState();
  const { styles } = useStyles(homeStyles);

  const textColor = '#FFFF';

  const opacityFadingStyles = useAnimatedStyle(() => {
    const opacity = interpolate(scrollYGlobal.value, [0, 80], [1, 0]);

    return {
      opacity: opacity,
    };
  });

  return (
    <Animated.View style={[opacityFadingStyles]}>
      <SafeAreaView />
      <View style={styles.flexRowBetween}>
        <View style={styles.flexRowGap}>
          <Icon name="map-marker" color={textColor} iconFamily="MaterialCommunityIcons" size={32} />
          <View>
            <TouchableOpacity style={styles.flexRow}>
              <CustomText variant="h5" color={textColor} fontFamily="Okra-Bold">
                Lagos, Nigeria
              </CustomText>
              <Icon
                name="chevron-down"
                color={textColor}
                iconFamily="MaterialCommunityIcons"
                size={18}
              />
            </TouchableOpacity>
            <CustomText color={textColor} fontFamily="Okra-Medium">
              Isaac Johnson, Ikeja
            </CustomText>
          </View>
        </View>

        <View style={styles.flexRowGap}>
          <TouchableOpacity style={styles.translation}>
            <Image
              source={require('@assets/icons/translation.png')}
              style={styles.translationIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileAvatar}>
            <Image
              source={require('@assets/icons/golden_circle.png')}
              style={styles.goldenCircle}
            />
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/a/ACg8ocI4AJYWhjovZK95cjoBofFHT148qAJWrJiEIS91BzhKbN_s7aZq=s576-c-no',
              }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default LocationHeader;
