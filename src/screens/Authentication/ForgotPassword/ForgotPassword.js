import { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import tw from 'twrnc'
import {useNavigation} from '@react-navigation/native'
import { useForm, Controller, set } from 'react-hook-form'
import { Auth } from 'aws-amplify'

const ForgotPassword = () => {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)

    const {control, handleSubmit} = useForm()

    const onNextPressed = async data => {

        if(isLoading) return;
        setIsLoading(true)

        try{
            await Auth.forgotPassword(data.username)
            navigation.navigate('ChangePassword', {username: data.username})
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
            <Text style={tw`text-center font-semibold text-3xl`}>Find your account</Text>
            <Text style={tw`text-center`}>Enter your username{"\n"}A code will be sent to your email</Text>

            <View style={tw`w-full`}>

                <Controller
                control={control}
                rules={{
                    required: false,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                    style={tw`bg-gray-100 py-3 px-4 rounded-lg border border-gray-200 mt-8`}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder='Username'
                    />
                )}
                name="username"
                />

                <TouchableOpacity style={tw`bg-black py-4 px-4 rounded-lg mt-4 flex justify-center disabled:opacity-50`} disabled={isLoading} onPress={handleSubmit(onNextPressed)}>
                    <Text style={tw`font-semibold text-center text-white text-lg`}>
                        {isLoading ? 'Please wait...' : 'Next'}
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ForgotPassword