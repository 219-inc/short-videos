import { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, Alert, ToastAndroid } from 'react-native'
import tw from 'twrnc'
import {useNavigation, useRoute} from '@react-navigation/native'
import {useForm, Controller} from 'react-hook-form'
import {Auth} from 'aws-amplify'

const ChangePassword = () => {
  const navigation = useNavigation()
  const route = useRoute()

  const [isLoading, setIsLoading] = useState(false)

  const {control, handleSubmit} = useForm({defaultValues: {username: route?.params?.username}})

  const onSubmitPressed = async data => {
    if(isLoading) return;
    setIsLoading(true)
    try{
        await Auth.forgotPasswordSubmit(data.username, data.code, data.password)
        ToastAndroid.show('Password changed successfully', ToastAndroid.SHORT)
        navigation.navigate('SignIn')
    }catch(e){
        Alert.alert('Oops', e.message)
    }
    setIsLoading(false)
  }

  return (
    <View style={tw`h-full bg-white pt-12 px-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mb-4`}>
            <Text style={tw`font-semibold text-blue-700`}>Back</Text>
        </TouchableOpacity>

        <Text style={tw`text-center font-semibold text-3xl`}>Reset your password</Text>
        <Text style={tw`text-center`}>Enter the code sent to your email{"\n"}and reset your password</Text>

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
                    placeholder='Confirmation code'
                    keyboardType='numeric'
                />
            )}
            name="code"
            />

            <Controller
            control={control}
            rules={{
                required: true,
                minLength: 8,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                style={tw`bg-gray-100 py-3 px-4 rounded-lg border border-gray-200 mt-4`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder='New password'
                secureTextEntry={true}
                />
            )}
            name="password"
            />

            <TouchableOpacity style={tw`bg-black py-4 px-4 rounded-lg mt-4 flex justify-center disabled:opacity-50`} disabled={isLoading} onPress={handleSubmit(onSubmitPressed)}>
                <Text style={tw`font-semibold text-center text-white text-lg`}>
                    {isLoading ? 'Please wait...' : 'Change password'}
                </Text>
            </TouchableOpacity>
        </View>

    </View>
  )
}

export default ChangePassword