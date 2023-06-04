import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import MusicScreen from "./src/screens/MusicScreen";
import {Music} from "./src/components/music";
import MyMusicsScreen from "./src/screens/MyMusicsScreen";

export type RootStackParamList = {
    Home: undefined;
    MyMusics: undefined;
    Music: { music: Music };
}

// noinspection JSUnusedGlobalSymbols
export default function App() {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"Home"} component={HomeScreen}/>
                <Stack.Screen name={"MyMusics"} component={MyMusicsScreen} options={() => ({title: "My Musics"})}/>
                <Stack.Screen name={"Music"} component={MusicScreen} options={({route}) => ({title: route.params.music.trackName})}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}