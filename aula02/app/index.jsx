import { Button, Text, View } from "react-native";
import { TextColorido } from "./components/TextoColorido";

export default function HomeScreen() {
  return (
   <View>
      <Text>Tela inicial</Text>

      <View>
          <Button title="Ir para detalhes" onPress={() => alert("Navegar para detalhes")}/>

          <TextColorido texto="Texto colorido" cor="red"/>
      </View>
   </View>
  );
}
