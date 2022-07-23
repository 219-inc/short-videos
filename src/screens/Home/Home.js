import { View, Text, TouchableOpacity } from 'react-native'
import {Auth} from 'aws-amplify'
import tw from 'twrnc'

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={async () => await Auth.signOut()}>
        <Text style={tw`text-lg text-red-400`}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home