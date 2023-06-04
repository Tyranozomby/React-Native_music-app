import {StyleSheet, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {Music} from "./music";
import * as Storage from "../utils/storage";

type RatingProps = {
    music: Music;
}

const Rating: React.FunctionComponent<RatingProps> = ({music}) => {
    const [stars, setStars] = React.useState<number[]>([]);
    const [ratingValue, setRatingValue] = React.useState<number>(music.rating ?? 0);

    useEffect(() => {
        setStars(Array.from(Array(5).keys()));
    }, []);

    const handleRating = (rating: number) => {
        setRatingValue(rating);
        music.rating = rating;
        Storage.saveMusic(music).then(() => console.log("Music saved"));
    }

    return (
        <View style={styles.container}>
            {stars.map((star, index) => {
                return (
                    <TouchableOpacity key={index} onPress={() => handleRating(index + 1)}>
                        <Icon name={index < ratingValue ? "star" : "star-outline"} size={20} color="black"/>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 150,
    }
});

export default Rating;