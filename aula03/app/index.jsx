import { View, Text, Button } from "react-native";
import { useEffect, useState } from 'react';
import { useRouter } from "expo-router";

export default function HomeScreen() 
{
  const [count, setCount] = useState(0);
  const [multiplo, setMultiplo] = useState(false);

  const router = useRouter();

  function renderMultiplo(valor)
  {
    if(valor)
    {
      return <Text>É múltiplo de 7</Text>
    }
    else
    {
      return <Text>Não é múltiplo de 7</Text>
    }
  }

  function renderPlus(valor)
  {
    return(
      <Text style={{fontSize: 20, backgroundColor: valor ? "green" : "yellow", padding: 10, marginTop: 10, borderRadius: 10}}> { valor ? "O número é múltiplo de 7" : "O número não é múltiplo de 7"} </Text>
    )
  }

  useEffect(
    // função executada toda vez que o valor de count for alterado
    () => {
        if (count % 7 === 0){
          setMultiplo(true);
        } else {
          setMultiplo(false);
        }
    }, 
    // lista de valores monitorados
    [count]
  );

  return ( 
   <View style={{ flex: 1, justifyContent: "center", alignItems: "center",}}>
      <Text>{count}</Text>
      <Button title="incrementar" onPress={() => setCount(count + 1)}/>

      {renderPlus(multiplo)}
      <Button title="tela 2" onPress={() => router.push("./tela2")}></Button>
   </View>
  );
}