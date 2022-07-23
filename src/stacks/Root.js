import { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Auth, Hub } from "aws-amplify";
import { ActivityIndicator, View } from "react-native";
import tw from 'twrnc'

import Login from "screen/Authentication/Login";
import SignUp from "screen/Authentication/SignupScreen";
import ConfirmEmail from "screen/Authentication/ConfirmEmail";
import ForgotPassword from 'screen/Authentication/ForgotPassword';
import ChangePassword from 'screen/Authentication/ChangePassword';
import Home from "screen/Home";

const Stack = createStackNavigator();

export default function Root() {

    const [user, setUser] = useState(undefined);
    const checkIfSignedIn = async () => {
        try{
            const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
            setUser(authUser);
        }catch(e){
            setUser(null);
        }
    }

    useEffect(() => {
        checkIfSignedIn()
    }, [])

    useEffect(() => {
        const listner = (data) => {
            if(data.payload.event === 'signIn' || data.payload.event === 'signOut'){
                checkIfSignedIn();
            }
        }

        Hub.listen('auth', listner)
        return () => Hub.remove('auth', listner)
    }, [])

    if(user === undefined){
        return (
            <View  style={tw`my-auto mx-auto`}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                <Stack.Screen name="Home" component={Home} />
            ) : (
                <>
                    <Stack.Screen name="SignIn" component={Login} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                    <Stack.Screen name="ChangePassword" component={ChangePassword} />
                </>
            )}
        </Stack.Navigator>
    )
}