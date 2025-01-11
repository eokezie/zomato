import React from 'react';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Icon from '@components/global/Icon';
import CustomText from '@components/global/CustomText';

const BackToTopButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
      onPress={onPress}
    >
      <Icon
        name="arrow-up-circle-outline"
        iconFamily="Ionicons"
        color="#FFFFFF"
        size={RFValue(12)}
      />
      <CustomText variant="h6" style={{ color: '#FFFFFF' }} fontFamily="Okra-Bold">
        Back to top
      </CustomText>
    </TouchableOpacity>
  );
};

export default BackToTopButton;
