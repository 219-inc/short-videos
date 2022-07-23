import { Amplify } from 'aws-amplify'
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import tw from 'twrnc'
import awsconfig from './src/aws-exports'

import Root from 'stack/Root';

Amplify.configure(awsconfig)

export default function App() {
  return (
    <View style={tw`h-full`}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </View>
  );
}