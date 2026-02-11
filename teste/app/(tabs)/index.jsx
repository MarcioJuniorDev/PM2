import { Image } from 'expo-image';
import { Platform, StyleSheet, Text, TextInput, View} from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    // painel com fundo branco e texto preto
    <View style={{ backgroundColor: 'white', color: 'black', padding: 16, borderRadius: 10, boxShadow: '5px 4px 6px rgba(214, 207, 207, 0.6)'}}>
      <Text>Olá mundo!</Text>
      <TextInput placeholder='digite algo' style={{ height: 40, borderColor: 'gray', borderRadius: 5, borderWidth: 1, marginTop: 8, paddingLeft: 8
       }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
