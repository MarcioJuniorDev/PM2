import { Text } from "react-native";

export default function TextColorido({ texto, cor })
{
    return(
        <Text style={{ color: cor }}>{texto}</Text>
    );
}