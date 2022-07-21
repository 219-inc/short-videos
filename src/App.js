import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={tw`font-bold text-lg`}>🌟 This is a short video consuming app 🦑</Text>
      <TouchableOpacity style={tw`border-blue-300`}>
        <Text>Hello World 🙌</Text>
        <Text>Another Text</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
