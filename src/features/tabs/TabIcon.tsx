import React from 'react';
import { View, ViewStyle, TextStyle, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useAppSelector } from '@states/reduxHook';
import { Colors } from '@unistyles/Constants';
import CustomText from '@components/global/CustomText';
import DeliveryFocused from '@assets/tabicons/delivery_focused.png';
import Delivery from '@assets/tabicons/delivery.png';
import ReorderFocused from '@assets/tabicons/reorder_focused.png';
import Reorder from '@assets/tabicons/reorder.png';
import LiveFocused from '@assets/tabicons/live_focused.png';
import Live from '@assets/tabicons/live.png';
import DiningFocused from '@assets/tabicons/dining_focused.png';
import Dining from '@assets/tabicons/dining.png';

interface TabProps {
  name: string;
}

interface IconProps {
  focused: boolean;
}

const styles = {
  width: RFValue(18),
  height: RFValue(18),
};

const tabStyles: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const textStylesInActive: TextStyle = {
  textAlign: 'center',
  marginTop: 4,
  color: Colors.lightText,
  fontSize: RFValue(9.5),
};

const textStylesActive: TextStyle = {
  textAlign: 'center',
  marginTop: 4,
  color: Colors.active,
  fontSize: RFValue(9.5),
};

const TabIcon: React.FC<TabProps> = React.memo(({ name }) => {
  return (
    <View style={tabStyles}>
      <Image
        source={
          name === 'Delivery'
            ? Delivery
            : name === 'Dining'
            ? Dining
            : name === 'Reorder'
            ? Reorder
            : Live
        }
        style={styles}
      />
      <CustomText style={textStylesInActive}>{name}</CustomText>
    </View>
  );
});

const TabIconFocused: React.FC<TabProps> = React.memo(({ name }) => {
  const isVegMode = useAppSelector((state) => state.user.isVegMode);

  return (
    <View style={tabStyles}>
      <Image
        source={
          name === 'Delivery'
            ? DeliveryFocused
            : name === 'Dining'
            ? DiningFocused
            : name === 'Reorder'
            ? ReorderFocused
            : LiveFocused
        }
        style={[
          styles,
          {
            tintColor: name === 'Live' ? undefined : isVegMode ? Colors.active : Colors.primary,
          },
        ]}
      />
      <CustomText style={textStylesActive}>{name}</CustomText>
    </View>
  );
});

export const DeliveryTabIcon: React.FC<IconProps> = ({ focused }) => {
  return focused ? <TabIconFocused name="Delivery" /> : <TabIcon name="Delivery" />;
};

export const ReorderTabIcon: React.FC<IconProps> = ({ focused }) => {
  return focused ? <TabIconFocused name="Reorder" /> : <TabIcon name="Reorder" />;
};

export const DiningTabIcon: React.FC<IconProps> = ({ focused }) => {
  return focused ? <TabIconFocused name="Dining" /> : <TabIcon name="Dining" />;
};

export const LiveTabIcon: React.FC<IconProps> = ({ focused }) => {
  return focused ? <TabIconFocused name="Live" /> : <TabIcon name="Live" />;
};
