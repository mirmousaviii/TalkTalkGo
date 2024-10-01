import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { version } from '../../package.json';

export default function TabTwoScreen() {
    return (
        <ParallaxScrollView
            headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">About</ThemedText>
            </ThemedView>
            <ThemedText>
                This app is under development. you can contribute to this project by adding new features or fixing bugs by reporting them.
            </ThemedText>
            <ThemedText type="highlight">Version: {version}</ThemedText>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});