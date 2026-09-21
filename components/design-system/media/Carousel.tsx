import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import { useBazarifyTheme } from "@/components/design-system/theme";

export type CarouselProps<T> = {
  data: readonly T[];
  renderItem: (info: ListRenderItemInfo<T>) => ReactNode;
  autoplayInterval?: number;
  height: number;
  style?: StyleProp<ViewStyle>;
  keyExtractor?: (item: T, index: number) => string;
};

export function Carousel<T>({
  data,
  renderItem,
  autoplayInterval,
  height,
  style,
  keyExtractor,
}: CarouselProps<T>) {
  const theme = useBazarifyTheme();
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<T>>(null);
  const currentIndexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    currentIndexRef.current = 0;
    setCurrentIndex(0);
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [data.length]);

  useEffect(() => {
    if (!autoplayInterval || data.length < 2) return;

    const intervalId = setInterval(() => {
      const nextIndex = (currentIndexRef.current + 1) % data.length;
      currentIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex);
      listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, autoplayInterval);

    return () => clearInterval(intervalId);
  }, [autoplayInterval, data.length]);

  if (data.length === 0) return null;

  return (
    <View style={[styles.container, { height }, style]}>
      <FlatList
        ref={listRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={(info) => (
          <View style={[styles.page, { width }]}>{renderItem(info)}</View>
        )}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onMomentumScrollEnd={(event) => {
          const nextIndex = Math.round(
            event.nativeEvent.contentOffset.x / width,
          );
          currentIndexRef.current = nextIndex;
          setCurrentIndex(nextIndex);
        }}
        testID="bazarify-carousel"
      />
      {data.length > 1 ? (
        <View
          accessibilityRole="adjustable"
          accessibilityLabel={`Slide ${currentIndex + 1} of ${data.length}`}
          style={styles.pagination}
        >
          {data.map((_, index) => (
            <View
              key={keyExtractor?.(data[index], index) ?? String(index)}
              style={[
                styles.dot,
                { backgroundColor: theme.colors.overlay },
                index === currentIndex && [
                  styles.activeDot,
                  { backgroundColor: theme.colors.textInverted },
                ],
              ]}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  page: {
    alignItems: "center",
    justifyContent: "center",
  },
  pagination: {
    alignItems: "center",
    bottom: 8,
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    position: "absolute",
    width: "100%",
  },
  dot: {
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  activeDot: {
    width: 18,
  },
});
