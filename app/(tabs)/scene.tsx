import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { sentences, languageNames, sceneNames } from '@/data/sentences';

const Scene: React.FC = () => {
  const [language, setLanguage] = useState('en');
  const [scene, setScene] = useState(Object.keys(sceneNames)[0]);
  const [showEnglish, setShowEnglish] = useState<number | null>(null);

  const sceneSentences = sentences[scene];

  return (
      <ThemedView style={styles.container}>
        <View style={styles.pickerContainer}>
          <Picker
              selectedValue={language}
              style={styles.picker}
              onValueChange={(itemValue) => setLanguage(itemValue)}
          >
            {Object.keys(languageNames).map((lang) => (
                <Picker.Item key={lang} label={languageNames[lang]} value={lang} />
            ))}
          </Picker>
          <Picker
              selectedValue={scene}
              style={styles.picker}
              onValueChange={(itemValue) => setScene(itemValue)}
          >
            {Object.keys(sceneNames).map((scene) => (
                <Picker.Item key={scene} label={sceneNames[scene][language]} value={scene} />
            ))}
          </Picker>
        </View>
        <ParallaxScrollView padding={0}>
          <ThemedView style={styles.content}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {sceneSentences.map((sentence, index) => (
                  <TouchableOpacity
                      key={index}
                      onPress={() => setShowEnglish(showEnglish === index ? null : index)}
                  >
                    <ThemedText style={[styles.sentence, showEnglish === index && styles.highlightedSentence]}>
                      {showEnglish === index ? (index + 1) + ". " + sentence['en'] : (index + 1) + ". " + sentence[language]}
                    </ThemedText>
                  </TouchableOpacity>
              ))}
            </ScrollView>
          </ThemedView>
        </ParallaxScrollView>
      </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pickerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    paddingTop: 32,
    zIndex: 1,
    backgroundColor: '#a1cedc',
  },
  content: {
    flex: 1,
    marginTop: 100,
  },
  scrollViewContent: {
    padding: 16,
  },
  picker: {
    flex: 1,
    height: 50,
    marginHorizontal: 5,
  },
  sentence: {
    marginBottom: 8,
    padding: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#a1cedc',
  },
  highlightedSentence: {
    backgroundColor: '#a1cedc', // Change this color as needed
  },
});

export default Scene;