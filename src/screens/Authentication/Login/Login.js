import { useState } from 'react'
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import tw from 'twrnc'
import {useNavigation} from '@react-navigation/native'
import { useForm, Controller } from "react-hook-form";
import { Auth } from 'aws-amplify'

const Login = () => {

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation()

  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSignInPressed = async data => {

    if(isLoading) return;
    setIsLoading(true)
    setIsButtonDisabled(true)

    try{
      await Auth.signIn(data.username, data.password)
      ToastAndroid.show('Welcome Back', ToastAndroid.SHORT)
    }catch(err){
      Alert.alert('Oops', err.message)
    }

    setIsLoading(false)
    setIsButtonDisabled(false)
  }

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword')
  }

  const onSignUpPressed = () => {
    try{
      navigation.navigate('SignUp')
    }catch(err){
      Alert.alert('Oops', err.message)
    }
  }

  return (
    <SafeAreaView style={tw`h-full pt-12 px-4 bg-white`}>
      <View style={tw`my-auto flex flex-col`}>
        <Text 
          style={tw`text-center text-black text-2xl font-semibold mb-8 italic`}
        >
          SHAWTY
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={tw`bg-gray-100 py-3 px-4 rounded-lg border border-gray-200`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='Username'
            />
          )}
          name="username"
        />
        {errors.username && <Text>This is required.</Text>}

        <Controller
          control={control}
          rules={{
          maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={tw`bg-gray-100 py-3 px-4 rounded-lg border border-gray-200 mt-4`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='Password' 
              secureTextEntry={true} 
            />
          )}
          name="password"
        />
        {errors.password && <Text>This is required.</Text>}
        <TouchableOpacity 
          style={tw`bg-black py-4 px-4 rounded-lg mt-4 flex justify-center disabled:opacity-50`}
          activeOpacity={0.7}  
          onPress={handleSubmit(onSignInPressed)}
          disabled={isButtonDisabled}
        >
          <Text style={tw`text-center text-white font-semibold`}>
            {isLoading ? 'Loading...' : 'Sign In'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`mt-3`} onPress={onForgotPasswordPressed}>
          <Text style={tw`text-blue-600 font-semibold text-center`}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`absolute bottom-0 w-full h-16 mx-4 pt-2 items-center border-t border-gray-200`}>
        <TouchableOpacity style={tw`mt-3`} onPress={onSignUpPressed}>
          <Text style={tw`font-semibold text-center`}>Dont have an account? <Text style={tw`text-blue-600 `}>Sign up.</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Login