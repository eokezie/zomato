import React from 'react';
import { View, Image } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { restaurantStyles } from '@unistyles/restuarantStyles';
import { navigate } from '@utils/NavigationUtils';
import CustomText from '@components/global/CustomText';
import ScalePress from '@components/ui/ScalePress';
import StartRating from '@components/ui/StartRating';

const RestaurantCard: React.FC<{ item: any }> = ({ item }) => {
  const { styles } = useStyles(restaurantStyles);

  return (
    <ScalePress
      onPress={() => {
        navigate('RestaurantScreen', {
          item: item,
        });
      }}
    >
      <View style={styles.card}>
        <Image source={{ uri: item?.imageUrl }} style={styles.image} />
        <View style={styles.info}>
          <View style={styles.textContainer}>
            <View style={styles.textPart}>
              <CustomText variant="h5" style={styles.name} numberOfLines={1} fontFamily="Okra-Bold">
                {item?.name}
              </CustomText>
              <CustomText>
                {item?.time} • {item?.distance} • ₦10,500 for one
              </CustomText>
            </View>
            <StartRating rating={item?.rating} />
          </View>
        </View>
      </View>
    </ScalePress>
  );
};

export default RestaurantCard;
