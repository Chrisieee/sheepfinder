import {View, Text, Pressable} from 'react-native';
import {useNavigation} from "@react-navigation/native";

function Title({title}) {
    return (
        <View>
            <Text className="font-bold text-3xl dark:text-white">Sheepfinder | <Text
                className="text-lg">{title}</Text></Text>
        </View>
    );
}

export default Title