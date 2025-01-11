import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import LocationHeader from './LocationHeader';
import Searbar from './Searbar';

const HeaderSection: React.FC = () => {
  const { styles } = useStyles();

  return (
    <View>
      <LocationHeader />
      <Searbar />
    </View>
  );
};

export default HeaderSection;
