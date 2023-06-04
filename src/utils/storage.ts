import {Music} from "../components/music";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function queryAllMusics() {
    const stringMusic = await AsyncStorage.getItem('movies')

    if (stringMusic) {
        return JSON.parse(stringMusic) as Music[];
    } else {
        return [] as Music[];
    }
}

export async function saveMusic(music: Music) {
    let storedMusics = await queryAllMusics();

    if (storedMusics.find(m => m.trackId === music.trackId)) {
        const filtered = storedMusics.filter(m => m.trackId !== music.trackId);
        filtered.push(music)
        storedMusics = filtered
    } else {
        storedMusics.push(music);
    }

    await AsyncStorage.setItem('movies', JSON.stringify(storedMusics));
}

export async function deleteMusic(music: Music) {
    const storedMusics = await queryAllMusics();

    const filtered = storedMusics.filter(m => m.trackId !== music.trackId)

    await AsyncStorage.setItem('movies', JSON.stringify(filtered));
}

export async function isSavedMusic(music: Music) {
    return (await queryAllMusics()).some(storedMovie => storedMovie.trackId === music.trackId);
}
