import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import tw from 'twrnc'

const Login = () => {
  return (
    <SafeAreaView style={tw`h-full pt-12 px-4 bg-white`}>
      <Text 
        style={tw`text-center text-black text-2xl font-semibold mb-4`}
      >
        SHAWTY
      </Text>
      <View style={tw`my-auto flex flex-col`}>
        <TextInput 
          style={tw`bg-gray-100 py-3 px-4 rounded-lg border border-gray-200`}
          placeholder='Username'/>
        <TextInput 
          style={tw`bg-gray-100 py-3 px-4 rounded-lg border border-gray-200 mt-2`}
          placeholder='Password' 
          secureTextEntry={true} />
        <TouchableOpacity 
          style={tw`bg-black py-3 px-4 rounded-lg mt-2 flex justify-center`}
          activeOpacity={0.7}  
        >
          <Text style={tw`text-center text-white font-semibold`}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={tw`text-green-400`}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Login