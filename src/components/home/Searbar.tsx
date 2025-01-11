import React from 'react';
import { View, SafeAreaView, TouchableOpacity, Pressable, Image } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { RFValue } from 'react-native-responsive-fontsize';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import RollingContent from 'react-native-rolling-bar';

import { homeStyles } from '@unistyles/homeStyles';
import { useAppDispatch, useAppSelector } from '@states/reduxHook';
import { useShareState } from '@features/tabs/SharedContext';
import { Colors } from '@unistyles/Constants';
import { setVegMode } from '@states/reducers/userSlice';
import Icon from '@components/global/Icon';
import CustomText from '@components/global/CustomText';

const searchItems: string[] = ['Search "amosa"', 'Search "cake"', 'Search "ice cream"'];

const Searbar: React.FC = () => {
  const isVegMode = useAppSelector((state) => state.user.isVegMode);

  const dispatch = useAppDispatch();
  const { styles } = useStyles(homeStyles);
  const { scrollYGlobal } = useShareState();

  const textColorAnimation = useAnimatedStyle(() => {
    const textColor = interpolate(scrollYGlobal.value, [0, 80], [255, 0]);

    return {
      color: `rgb(${textColor},${textColor},${textColor})`,
    };
  });

  return (
    <>
      <SafeAreaView />
      <View style={[styles.flexRowBetween, styles.padding]}>
        <TouchableOpacity style={styles.searchInputContainer} activeOpacity={0.8}>
          <Icon
            name="search"
            color={isVegMode ? Colors.active : Colors.primary}
            size={RFValue(20)}
            iconFamily="Ionicons"
          />
          <RollingContent interval={3000} defaultStyle={false} customStyle={styles.textContainer}>
            {searchItems?.map((item: string, index: number) => {
              return (
                <CustomText
                  fontSize={12}
                  fontFamily="Okra-Medium"
                  key={index}
                  style={styles.rollingText}
                >
                  {item}
                </CustomText>
              );
            })}
          </RollingContent>
          <Icon
            name="mic-outline"
            color={isVegMode ? Colors.active : Colors.primary}
            size={RFValue(20)}
            iconFamily="Ionicons"
          />
        </TouchableOpacity>
        <Pressable style={styles.vegMode} onPress={() => dispatch(setVegMode(!isVegMode))}>
          <Animated.Text style={[textColorAnimation, styles.animatedText]}>VEG</Animated.Text>
          <Animated.Text style={[textColorAnimation, styles.animatedSubText]}>MODE</Animated.Text>
          <Image
            source={
              isVegMode
                ? require('@assets/icons/switch_on.png')
                : require('@assets/icons/switch_off.png')
            }
            style={styles.switch}
          />
        </Pressable>
      </View>
    </>
  );
};

export default Searbar;
