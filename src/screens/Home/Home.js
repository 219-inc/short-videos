import { View, Button, Text } from 'react-native'
import tw from 'twrnc'
import {Auth} from 'aws-amplify'

import TopNav from 'component/TopNav'

const Home = () => {
  return (
    <View style={tw`pt-12`}>
      <TopNav /> 
      <View style={tw`mt-12 bg-black`}>
        <Button onPress={() => Auth.signOut()} title={"Sign Out"}/>
      </View>
    </View>
  )
}

export default Home