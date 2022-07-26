import { View, Text, TouchableOpacity, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import tw from 'twrnc'
import { FontAwesome } from '@expo/vector-icons';

const TopNav = () => {
  return (
    <View style={tw`bg-black h-16 absolute top-8 w-full`}>
        <StatusBar style="dark" backgroundColor='black' />
        <View style={tw`px-4 w-full h-full flex flex-row`}>
            <View style={tw`w-1/4 my-auto flex flex-row`}>
                <TouchableOpacity>
                    <FontAwesome name="user-circle" size={32} color="#E5E7EB" />
                </TouchableOpacity>
                <TouchableOpacity style={tw`mx-4`}>
                    <FontAwesome name="search" size={28} color="#E5E7EB" />
                </TouchableOpacity>
            </View>
            <View style={tw`w-full pr-18`}>
                <Image 
                    source={{
                        uri: "https://www.scrolldroll.com/wp-content/uploads/2021/04/best-zomato-ads-7.jpg"
                    }}
                    style={tw`h-full w-full`}
                />
            </View>
        </View>
    </View>
  )
}

export default TopNav