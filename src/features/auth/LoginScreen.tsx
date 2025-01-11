import React from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { resetAndNavigate } from '@utils/NavigationUtils';
import { loginStyles } from '@unistyles/authStyles';
import CustomText from '@components/global/CustomText';
import BreakerText from '@components/ui/BreakerText';
import PhoneInput from '@components/ui/PhoneInput';
import SocialLogin from '@components/ui/SocialLogin';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';

const LoginScreen: React.FC = () => {
  const [phone, setPhone] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const keyboardOffsetHeight = useKeyboardOffsetHeight();
  const { styles } = useStyles(loginStyles);

  const handleLogin = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      resetAndNavigate('UserBottomTab');
    }, 2000);
  };

  React.useEffect(() => {
    if (keyboardOffsetHeight == 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.25,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [keyboardOffsetHeight]);

  return (
    <View style={styles.container}>
      <StatusBar hidden={Platform.OS !== 'android'} />
      <Image source={require('@assets/images/login.png')} style={styles.cover} />
      <Animated.ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={'on-drag'}
        style={{ transform: [{ translateY: animatedValue }] }}
        contentContainerStyle={styles.bottomContainer}
      >
        <CustomText fontFamily="Okra-Bold" variant="h2" style={styles.title}>
          America's #1 Food Delivery and Dining App
        </CustomText>
        <BreakerText text="Log in or sign up" />
        <PhoneInput value={phone} onChangeText={setPhone} onFocus={() => {}} onBlur={() => {}} />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin} activeOpacity={0.8}>
          {loading ? (
            <ActivityIndicator size={'small'} color={'#FFFFFF'} />
          ) : (
            <CustomText color="#FFFFFF" fontFamily="Okra-Medium" variant="h5">
              Continue
            </CustomText>
          )}
        </TouchableOpacity>
        <BreakerText text="or" />
        <SocialLogin />
      </Animated.ScrollView>
      <View style={styles.footer}>
        <CustomText>By continuing, you agree to our</CustomText>
        <View style={styles.footerTextContainer}>
          <CustomText style={styles.footerText}>Terms of Service</CustomText>
          <CustomText style={styles.footerText}>Privacy Policy</CustomText>
          <CustomText style={styles.footerText}>Content Policies</CustomText>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
