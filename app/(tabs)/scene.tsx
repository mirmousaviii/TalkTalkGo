import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { sentences, languageNames, sceneNames } from '@/data/sentences';

const Scene: React.FC = () => {
  const [language, setLanguage] = useState('en');
  const [scene, setScene] = useState('hotel');

  const sceneSentences = sentences[language]?.[scene] || [];

  return (
      <ThemedView style={styles.container}>
        <View style={styles.pickerContainer}>
          <Picker
              selectedValue={language}
              style={styles.picker}
              onValueChange={(itemValue) => setLanguage(itemValue)}
          >
            {Object.keys(sentences).map((lang) => (
                <Picker.Item key={lang} label={languageNames[lang]} value={lang} />
            ))}
          </Picker>
          <Picker
              selectedValue={scene}
              style={styles.picker}
              onValueChange={(itemValue) => setScene(itemValue)}
          >
            {Object.keys(sentences[language]).map((sc) => (
                <Picker.Item key={sc} label={sceneNames[sc][language]} value={sc} />
            ))}
          </Picker>
        </View>
        <ParallaxScrollView padding={0}>
          <ThemedView style={styles.content}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {sceneSentences.map((sentence, index) => (
                  <ThemedText key={index} style={styles.sentence}>
                    {index + 1}. {sentence}
                  </ThemedText>
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
    borderColor: '#505050',
  },
});

export default Scene;