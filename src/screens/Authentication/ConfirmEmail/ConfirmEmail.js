import { View, Text, TextInput, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import tw from 'twrnc'
import { useRoute, useNavigation } from '@react-navigation/native'
import {useForm, Controller} from 'react-hook-form'
import { Auth } from 'aws-amplify'

const ConfirmEmail = () => {

  const route = useRoute()
  const navigation = useNavigation()
  const {control, handleSubmit, watch} = useForm(
    {
      defaultValues: {
        username: route?.params?.username
      }
    }
  )
  const username = watch('username')

  const onConfirmPressed = async data => {
    try{
      await Auth.confirmSignUp(data.username, data.code)
      ToastAndroid.show('Confirmation successful! Please login', ToastAndroid.SHORT)
      navigation.navigate('SignIn')
    }catch(e){
      Alert.alert('Oops', e.message)
    }
  }

  const onResendPressed = async () => {
    try{
      await Auth.resendSignUp(username)
      ToastAndroid.show('Code resent!', ToastAndroid.SHORT)
    }catch(e){
      Alert.alert('Oops', e.message)
    }
  }

  return (
    <View style={tw`pt-12 px-4 bg-white h-full`}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mb-4`}>
        <Text style={tw`font-semibold text-blue-700`}>Back</Text>
      </TouchableOpacity>

      <Text style={tw`text-center font-semibold text-3xl`}>Confirm your email</Text>
      <Text style={tw`text-center`}>A verification code has been sent to <Text style={tw`text-blue-500`}>{route?.params?.email}</Text></Text>

      <View style={tw`w-full`}>

        <Controller
          control={control}
          rules={{
            required: true,
            maxLength: 6,
            minLength: 6
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={tw`bg-gray-100 py-3 px-4 rounded-lg border border-gray-200 mt-8`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='Confirmation Code'
              keyboardType='numeric'
            />
          )}
          name="code"
        />

        <TouchableOpacity style={tw`bg-black py-4 px-4 rounded-lg mt-4 flex justify-center disabled:opacity-50`} onPress={handleSubmit(onConfirmPressed)}>
          <Text style={tw`font-semibold text-center text-white text-lg`}>Verify Code</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-white border border-black py-4 px-4 rounded-lg mt-4 flex justify-center disabled:opacity-50`} onPress={onResendPressed}>
          <Text style={tw`font-semibold text-center text-black text-lg`}>Resend Code</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default ConfirmEmail