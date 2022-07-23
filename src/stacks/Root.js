import { createStackNavigator } from "@react-navigation/stack";

import Login from "screen/Login";

const Stack = createStackNavigator();

export default function Root() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignIn" component={Login} />
        </Stack.Navigator>
    )
}