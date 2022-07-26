import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import tw from 'twrnc'

import Home from 'screen/Home';

const Tab = createBottomTabNavigator();

function HomeStack(){
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} />
        </Tab.Navigator>
    )
}

export default HomeStack;