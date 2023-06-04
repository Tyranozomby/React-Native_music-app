import {FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Music, MusicItem} from "../components/music";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";
import Icon from "react-native-vector-icons/Ionicons";

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

const HomeScreen: React.FunctionComponent<HomeScreenProps> = ({navigation}) => {
    const [musics, setMusics] = useState<Music[]>([]);
    const [input, setInput] = useState<string>("");

    useEffect(() => {
        // Fetch musics from ITunes API
        const fetchMusics = async () => {
            const response = await fetch("https://itunes.apple.com/search?limit=100" + (input ? "&term=" + input : ""));
            const data = await response.json();
            // Clear weird musics without name, artist or album
            setMusics(data.results.filter((music: Music) => music.trackName && music.artistName && music.collectionName) as Music[]);
        }

        fetchMusics().then(_ => console.log("Musics fetched"));
    }, [input]);

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder={"Search ..."} onChangeText={text => setInput(text)}/>
            <FlatList
                style={styles.list}
                data={musics}
                renderItem={({item, index}) => (
                    <MusicItem music={item} navigation={navigation} key={index}/>
                )}
            />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MyMusics")}>
                <Icon name={"heart"} size={30} color={"red"}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    list: {
        width: "100%",
    },
    button: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "lightgray",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 30,
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "lightgray",
        padding: 10,
    }
});

export default HomeScreen;
