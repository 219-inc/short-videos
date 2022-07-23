import { View, Text, SafeAreaView } from 'react-native'
import tw from 'twrnc'

import { withAuthenticator } from 'aws-amplify-react-native';

const Login = ({ signOut, user }) => {
  return (
    <SafeAreaView style={tw`bg-red-300 h-full pt-12 px-4`}>
      <Text>Login</Text>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
    </SafeAreaView>
  )
}

export default withAuthenticator(Login)