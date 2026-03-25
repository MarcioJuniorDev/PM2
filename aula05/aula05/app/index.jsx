import { Text, View, Button } from "react-native";
import { useRouter } from 'expo-router';

export default function Index() {

  const roteador = useRouter();

  return (
    <View style={{ flex: 1,justifyContent: "center", alignItems: "center", }}>
      <Text>Navegue nos elementos abaixo:</Text>
      <Button title="veriicação de CEP" onPress={() => roteador.push("./cep")}/>
    </View>
  )
}