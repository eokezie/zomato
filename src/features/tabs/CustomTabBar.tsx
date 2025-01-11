import React from 'react';
import { TouchableOpacity, View, Image, Linking } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { DeliveryTabIcon, DiningTabIcon, LiveTabIcon, ReorderTabIcon } from './TabIcon';
import { useAppSelector } from '@states/reduxHook';
import { useShareState } from './SharedContext';
import { tabStyles } from '@unistyles/tabStyles';
import { Colors, screenWidth } from '@unistyles/Constants';
import ScalePress from '@components/ui/ScalePress';

const CustomTabBar: React.FC<BottomTabBarProps> = (props) => {
  const isVegMode = useAppSelector((state) => state.user.isVegMode);

  const { scrollY } = useShareState();
  const { styles } = useStyles(tabStyles);
  const { state, navigation } = props;
  const bottom = useSafeAreaInsets();

  const isLiveTabFocused = state.routes[state.index]?.name === 'Live';
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY:
            scrollY.value === 1
              ? withTiming(100, { duration: 300 })
              : withTiming(0, { duration: 300 }),
        },
      ],
    };
  });
  const indicatorStyle = useAnimatedStyle(() => {
    const baseLeft = 10;
    let slideValue = state.index == 3 ? 0.23 : 0.24;

    return {
      left: withTiming(baseLeft + state.index * screenWidth * slideValue),
    };
  });

  return (
    <>
      <Animated.View
        style={[
          styles.tabBarContainer,
          animatedStyle,
          {
            paddingBottom: bottom.bottom,
            backgroundColor: isLiveTabFocused ? Colors.dark : Colors.background,
          },
        ]}
      >
        <View style={styles.tabContainer}>
          {state?.routes?.map((route, index) => {
            const isFocused = state.index === index;
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route?.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route?.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route?.key,
              });
            };

            return (
              <ScalePress
                key={index}
                style={[styles.tabItem, isFocused ? styles.focusedTabItem : {}]}
                onPress={onPress}
                onLongPress={onLongPress}
              >
                {route?.name === 'Delivery' && <DeliveryTabIcon focused={isFocused} />}
                {route?.name === 'Reorder' && <ReorderTabIcon focused={isFocused} />}
                {route?.name === 'Dining' && <DiningTabIcon focused={isFocused} />}
                {route?.name === 'Live' && <LiveTabIcon focused={isFocused} />}
              </ScalePress>
            );
          })}
          <View style={styles.verticalLine} />
        </View>
        <Animated.View
          style={[
            styles.slidingIndicator,
            indicatorStyle,
            {
              backgroundColor: isLiveTabFocused
                ? '#FFFFFF'
                : isVegMode
                ? Colors.active
                : Colors.primary,
            },
          ]}
        />
        <TouchableOpacity
          onPress={() => Linking.openURL('https://staunch.dev')}
          activeOpacity={0.9}
          style={styles.blinkitLogoContainer}
        >
          <Image source={require('@assets/icons/blinkit.png')} style={styles.blinkitLogo} />
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default CustomTabBar;
