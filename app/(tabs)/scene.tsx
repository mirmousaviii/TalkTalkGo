import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '@/components/ThemedText';
import { sentences, languageNames, sceneNames } from '@/data/sentences';

const Scene: React.FC = () => {
  const [language, setLanguage] = useState('en');
  const [scene, setScene] = useState('hotel');

  const sceneSentences = sentences[language]?.[scene] || [];

  return (
      <View style={styles.container}>
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
                <Picker.Item key={sc} label={sceneNames[sc]} value={sc} />
            ))}
          </Picker>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {sceneSentences.map((sentence, index) => (
              <ThemedText key={index} style={styles.sentence}>
                {index + 1}. {sentence}
              </ThemedText>
          ))}
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    backgroundColor: '#ffffff',
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1,
  },
  scrollViewContent: {
    paddingTop: 100, // Adjust this value based on the height of the pickerContainer
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
    backgroundColor: '#ffffff',
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default Scene;