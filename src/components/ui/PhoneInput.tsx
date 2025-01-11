import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { phoneStyles } from '@unistyles/phoneStyles';
import { Colors } from '@unistyles/Constants';
import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ onChangeText, value, onBlur, onFocus }) => {
  const { styles } = useStyles(phoneStyles);
  return (
    <View style={styles.container}>
      <Pressable style={styles.countryPickerContainer}>
        <CustomText variant="h2">🇺🇸</CustomText>
        <Icon iconFamily="Ionicons" name="caret-down-sharp" color={Colors.lightText} size={18} />
      </Pressable>
      <View style={styles.phoneInputContainer}>
        <CustomText fontFamily="Okra-Bold">+1</CustomText>
        <TextInput
          placeholder="Enter Mobile Number"
          keyboardType="phone-pad"
          value={value}
          placeholderTextColor={Colors.lightText}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          style={styles.input}
        />
      </View>
    </View>
  );
};

export default PhoneInput;
