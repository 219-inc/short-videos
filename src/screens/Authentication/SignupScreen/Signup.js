import { View, Text, TouchableOpacity, TextInput, SafeAreaView, Alert } from 'react-native'
import {useForm, Controller} from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { Auth } from 'aws-amplify'
import tw from 'twrnc'

const Signup = () => {
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const {control, handleSubmit, watch, formState: { errors }} = useForm()
  const pwd = watch('password')
  const navigation = useNavigation()

  const onRegisterPressed = async data => {
    try{
      let {username, email, password, gender, birthdate, fullname} = data
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          given_name: fullname,
          gender,
          birthdate,
          preferred_username: username
        }
      }) 
      navigation.navigate('ConfirmEmail', { username, email })

    }catch(err){
      Alert.alert('Oops', err.message)
    }
  }

  return (
    <SafeAreaView style={tw`h-full pt-12 px-4 bg-white`}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mb-4`}>
        <Text style={tw`font-semibold text-blue-700`}>Back</Text>
      </TouchableOpacity>

      <Text style={tw`text-center font-semibold text-3xl`}>Create an account</Text>
      <Text style={tw`text-center`}>Fill the details to proceed</Text>

      <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={tw`bg-gray-100 py-3 px-4 rounded-lg border border-gray-200 mt-4`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='Full Name'
            />
          )}
          name="fullname"
        />

      <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={tw`bg-gray-100 py-3 px-4 rounded-lg border border-gray-200 mt-4`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='Gender'
            />
          )}
          name="gender"
        />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={tw`bg-gray-100 py-3 px-4 rounded-lg border border-gray-200 mt-4`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='Birthdate'
            />
          )}
          name="birthdate"
        />

      <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={tw`bg-gray-100 py-3 px-4 rounded-lg border border-gray-200 mt-4`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='Username'
            />
          )}
          name="username"
        />

        <Controller
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: EMAIL_REGEX,
              message: 'Invalid email address',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={tw`bg-gray-100 py-3 px-4 rounded-lg border border-gray-200 mt-4 ${errors.email?.message?.length > 0 ? 'border-red-500 bg-red-100' : ''}`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='Email'
            />
          )}
          name="email"
        />
        {errors.email?.message?.length > 0 && <Text style={tw`text-red-500`}>{errors.email?.message}</Text>}

        <Controller
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={tw`bg-gray-100 py-3 px-4 rounded-lg border border-gray-200 mt-4 ${errors.password?.message?.length > 0 ? 'border-red-500 bg-red-100' : ''}`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='Password' 
              secureTextEntry={true} 
            />
          )}
          name="password"
        />
        {errors.password?.message?.length > 0 && <Text style={tw`text-red-500`}>{errors.password?.message}</Text>}

        <Controller
          control={control}
          rules={{
            validate: value => value === pwd || 'Passwords do not match',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={tw`bg-gray-100 py-3 px-4 rounded-lg border border-gray-200 mt-4 ${errors.repeat_password?.message?.length > 0 ? 'border-red-500 bg-red-100' : ''}`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='Repeat Password' 
              secureTextEntry={true} 
            />
          )}
          name="repeat_password"
        />
        {errors.repeat_password?.message?.length > 0 && <Text style={tw`text-red-500`}>{errors.repeat_password?.message}</Text>}


      <TouchableOpacity 
          style={tw`bg-black py-4 px-4 rounded-lg mt-4 flex justify-center disabled:opacity-50`}
          activeOpacity={0.7}  
          onPress={handleSubmit(onRegisterPressed)}
        >
          <Text style={tw`text-center text-lg text-white font-semibold`}>
            Sign up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={tw`bg-white border border-black py-4 px-4 rounded-lg mt-4 flex justify-center disabled:opacity-50`}
          activeOpacity={0.7}  
          onPress={() => navigation.goBack()}
        >
          <Text style={tw`text-center text-lg text-black font-semibold`}>
            Sign in
          </Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Signup