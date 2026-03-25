import { useState } from 'react'
import { View, TextInput, Button, Text } from 'react-native'

export default function Cep()
{

    const [cep, setCep] = useState('');
    const [dados, setDados] = useState(null);

    async function buscarCep()
    {
        // fetch: visita o endereço (com nosso cep)
        await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            // pega a resposta do fetch e converte ele pra json
            .then(resposta => resposta.json())
            .then(
                dadoEmJson => {
                    if (dadoEmJson.erro)
                    {
                        setCep('CEP não existe');
                    }
                    else
                    {
                        setDados(dadoEmJson);
                    }
            
                 }
            );
        }
    return(
        <View>
            <TextInput placeholder='Digite o CEP' value={cep} onChangeText={setCep}/>
            <Button title='Buscar CEP' onPress={buscarCep}/>     
                {/* verifica se dados é válido apenas uma vez */}
                {dados && (
                // tag vazia: elemento raiz
                    <View>
                        <Text>Logradouro: {dados.logradouro}</Text>
                        <Text>Bairro: {dados.bairro}</Text>
                        <Text>Cidade: {dados.localidade}</Text>
                        <Text>Estado: {dados.uf}</Text>
                    </View>
                )}
        </View>
    )
}