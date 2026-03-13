import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import TextColorido from "./component/TextColorido";

export default function Index() {

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [autenticado, setAutenticado] = useState(false);

  // objeto que permite navegar entre as paginas
  const router = useRouter();

  useEffect(
    () => {
      if (nome === 'admin' & senha === '123456')
      {
        setAutenticado(true);
      }
      else
      {
        setAutenticado(false);
      }
    }, [nome, senha]
  )

  return (
    <View>
      <Text>Tela inicial</Text>
      <View>
        <Button
          title="Ir para detalhes"
          onPress={
            () => alert("Navegar para detalhes")
          } />
          <TextColorido
            texto="Texto colorido"
            cor="red"
          />
      </View>

      <View>
        {/* campos de texto */}
        <View style={{ backgroundColor: autenticado ? 'green' : 'yellow', padding: 10, borderRadius: 5, marginBottom: 10}}>
          <Text style={{color: autenticado ? "white" : "black"}}>{autenticado ? "autenticado" : "não autenticado"}</Text>
        </View>
        <Text>Login</Text>
        <TextInput placeholder="Digite seu nome" value={nome} onChangeText={setNome}/>
        <TextInput placeholder="Digite sua senha" value={senha} onChangeText={setSenha} secureTextEntry/>
      </View>
        
      {/* links */}
      <Button title="ir para sobre" onPress={() => router.push("./pages/sobre")}/>
    </View>
  );
}
