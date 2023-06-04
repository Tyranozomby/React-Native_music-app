import {FlatList, StyleSheet, View} from "react-native";
import React, {useEffect} from "react";
import {Music, MusicItem} from "../components/music";
import {queryAllMusics} from "../utils/storage";
import {RootStackParamList} from "../../App";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

type MyMusicsScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "MyMusics">;
};

const MyMusicsScreen: React.FunctionComponent<MyMusicsScreenProps> = ({navigation}) => {

    const [musics, setMusics] = React.useState<Music[]>([]);

    useEffect(() => {
        queryAllMusics().then(setMusics);
    });

    return (
        <View style={styles.container}>
            <FlatList style={{width: "100%"}} data={musics} renderItem={({item, index}) => (
                <MusicItem music={item} navigation={navigation} key={index}/>
            )}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default MyMusicsScreen;