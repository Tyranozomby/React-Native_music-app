import {Button, StyleSheet, Text, View} from "react-native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";
import * as Storage from "../utils/storage";
import React, {useEffect} from "react";
import {RouteProp} from "@react-navigation/native";
import Rating from "../components/rating";

type MusicScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Music">;
    route: RouteProp<RootStackParamList, "Music">;
}

const MusicScreen: React.FunctionComponent<MusicScreenProps> = ({navigation, route}) => {

    const music = route.params.music;

    const [isSaved, setIsSaved] = React.useState(false);

    useEffect(() => {
        Storage.isSavedMusic(music).then((isSaved) => {
            setIsSaved(isSaved);
        });
    }, []);

    const saveMusic = () => {
        if (isSaved) {
            Storage.deleteMusic(music).then(() => console.log("Music deleted"));
        } else {
            Storage.saveMusic(music).then(() => console.log("Music saved"));
        }
        setIsSaved(!isSaved);
    }

    return (
        <View style={styles.container}>
            <Text>{music.trackName}</Text>
            <Text>{music.collectionName}</Text>
            <Text>{music.artistName}</Text>
            <Text>{new Date(music.releaseDate).toLocaleDateString("fr-FR")}</Text>
            <Text>{music.primaryGenreName}</Text>
            {
                isSaved && <Rating music={music}/>
            }
            <Button color={isSaved ? "red" : "blue"} title={isSaved ? "Remove from favorites" : "Add to favorites"}
                    onPress={saveMusic}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default MusicScreen;
