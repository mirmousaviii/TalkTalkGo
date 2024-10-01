import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
    headerImage?: ReactElement;
    padding?: number;
}>;

export default function ParallaxScrollView({
                                               children,
                                               headerImage,
                                               padding = 32,
                                           }: Props) {
    const colorScheme = useColorScheme() ?? 'light';
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
                    ),
                },
                {
                    scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
                },
            ],
        };
    });

    const headerBackgroundColor = colorScheme === 'dark' ? '#1D3D47' : '#A1CEDC';

    return (
        <ThemedView style={styles.container}>
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                <Animated.View
                    style={[
                        styles.header,
                        {
                            backgroundColor: headerBackgroundColor,
                            height: headerImage ? HEADER_HEIGHT : 0,
                        },
                        headerAnimatedStyle,
                    ]}>
                    {headerImage && headerImage}
                </Animated.View>
                <ThemedView style={[styles.content, { padding }]}>{children}</ThemedView>
            </Animated.ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        gap: 16,
        overflow: 'hidden',
    },
});