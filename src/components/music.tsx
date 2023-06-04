import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";

type Music = {
    trackId: number;
    trackName: string;
    collectionName: string;
    artistName: string;
    releaseDate: string;
    primaryGenreName: string;
    rating?: number;
};

type MusicItemProps = {
    music: Music;
    navigation: NativeStackNavigationProp<RootStackParamList, any>;
};

const MusicItem: React.FunctionComponent<MusicItemProps> = ({music, navigation}) => {

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("Music", {music: music})}>
            <View style={styles.movieItem}>
                <Text style={styles.movieItemText}>{music.trackName}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    movieItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    movieItemText: {
        fontSize: 18,
    }
});

export {Music, MusicItem};
