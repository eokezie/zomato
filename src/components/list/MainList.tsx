import React from 'react';
import { NativeSyntheticEvent, NativeScrollEvent, SectionList, ViewToken } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useShareState } from '@features/tabs/SharedContext';
import { restaurantStyles } from '@unistyles/restuarantStyles';
import RestaurantList from './RestaurantList';
import ExploreSection from '@components/home/ExploreSection';
import BackToTopButton from '@components/ui/BackToTopButton';
import { filtersOption } from '@utils/dummyData';
import SortingAndFilters from '@components/home/SortingAndFilters';

const sectionedData = [
  {
    title: 'Explore',
    data: [{}],
    renderItem: () => <ExploreSection />,
  },
  {
    title: 'Restaurants',
    data: [{}],
    renderItem: () => <RestaurantList />,
  },
];

const MainList: React.FC = () => {
  const [isRestaurantVisible, setIsRestaurantVisible] = React.useState<boolean>(false);
  const [isNearEnd, setIsNearEnd] = React.useState<boolean>(false);

  const { scrollToTop, scrollY, scrollYGlobal } = useShareState();
  const { styles } = useStyles(restaurantStyles);

  const previousScrollYTopButton = React.useRef<number>(0);
  const prevScrollY = React.useRef<number>(0);
  const sectionListRef = React.useRef<SectionList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event?.nativeEvent?.contentOffset.y;
    const isScrollingDown = currentScrollY > prevScrollY.current;

    scrollY.value = isScrollingDown
      ? withTiming(1, { duration: 300 })
      : withTiming(0, { duration: 300 });

    scrollYGlobal.value = currentScrollY;
    prevScrollY.current = currentScrollY;

    const containerHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event?.nativeEvent?.layoutMeasurement?.height;
    const offset = event?.nativeEvent?.contentOffset?.y;

    setIsNearEnd(offset + layoutHeight >= containerHeight - 500);
  };

  const handleScrollToTop = () => {
    scrollToTop();
    sectionListRef.current?.scrollToLocation({
      sectionIndex: 0,
      itemIndex: 0,
      animated: true,
      viewPosition: 0,
    });
  };

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollYGlobal?.value < previousScrollYTopButton.current && scrollYGlobal.value > 180;
    const opacity = withTiming(isScrollingUp && (isRestaurantVisible || isNearEnd) ? 1 : 0, {
      duration: 300,
    });
    const translateY = withTiming(isScrollingUp && (isRestaurantVisible || isNearEnd) ? 0 : 10, {
      duration: 300,
    });

    previousScrollYTopButton.current = scrollYGlobal.value;

    return {
      opacity: opacity,
      transform: [{ translateY }],
    };
  });

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 80,
  };

  const onViewAbleItemChanged = ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
    const restaurantVisible = viewableItems.some(
      (item) => item?.section?.title === 'Restaurants' && item?.isViewable
    );

    setIsRestaurantVisible(restaurantVisible);
  };

  return (
    <>
      <Animated.View style={[styles.backToTopButton, backToTopStyle]}>
        <BackToTopButton onPress={handleScrollToTop} />
      </Animated.View>
      <SectionList
        sections={sectionedData}
        overScrollMode="always"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
        ref={sectionListRef}
        renderSectionHeader={({ section }) => {
          if (section.title !== 'Restaurants') {
            return null;
          }

          return (
            <Animated.View style={[isRestaurantVisible || isNearEnd ? styles.shadowBottom : null]}>
              <SortingAndFilters menuTitle="Sort" options={filtersOption} />
            </Animated.View>
          );
        }}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={(_item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        stickySectionHeadersEnabled={true}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewAbleItemChanged}
      />
    </>
  );
};

export default MainList;
