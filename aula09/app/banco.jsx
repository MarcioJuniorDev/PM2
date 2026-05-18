import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";


export default function Banco() {

    // Abre uma conexão com a base de dados sqlite
    // se o arquivo "banco.db" não existeir, esta linha o cria. Se não, ele é aberto automaticamente
    const db = SQLite.openDatabaseSync("banco.db");

    // Guarda os dados em um estado local no formato json. Nesse caso, como a tabela tem os campos "id" e "valor", o objeto será no seguinte formato: { id: <id>, valor: "<texto>" }
    const [dados, setDados] = useState([]);

    // Guarda o valor do digitado no TextInput
    const [valor, setValor] = useState("");

    // Informa se o app está em mode de edição
    const [editando, setEditando] = useState(false);

    // Informa o id do objeto que está sendo editado
    // iniciamos o estado com zero pois no banco de dados relacional não há registros identificados com "0", sendo assim, "0" significa que nada está sendo editado
    const [idSendoEditado, setidSendoEditado] = useState(0);

    // Cria a tabela "dados" caso ela não exista
    // Isso é necessário para garantir que a base de dados
    // exista e tenha a tabela que esperadmos
    useEffect(() => {
        db.execSync("CREATE TABLE IF NOT EXISTS dados (id INTEGER PRIMARY KEY AUTOINCREMENT, valor TEXT);");
        carregarItems();
    }, []);

    function inserirItem(){
        // Se o valor digitado contiver apenas espaços
        // então pára a função. O comando "trim()" remove
        // os espaços em excesso no inicio e fim da expressão
        if(!valor.trim()){
            // Não há nada para salvar!
            // para a função
            return;
        }

        // Se houver algor para salvar então executa o insert na base de dados
        db.runAsync("insert into dados (valor) values (?);", [valor]).then(
            () => {
                // Avisa que a inserção foi terminada
                console.log("Inserção terminada")
            }
        )
    }


    function carregarItems(){
        db.getAllAsync("select * from dados;").then(
            (linhas) => {
                setDados(linhas)
            }
        )
    }
    
    function salvarDado() {
        // Adiciona o novo valor à lista de dados
        setDados([...dados,  ]);

        // Salva o valor no banco de dados local
        inserirItem();

        carregarItems();
        // Limpa o campo de texto
        setValor("");
    }

    function atualizaDados(id, valor){
        db.runAsync("update dados set valor = ? where id =?", 
            [ valor, id ]
        ).then(
            carregarItems()
        )
    }

    function deletarDado(item)
    {
        setidSendoEditado(item.id);

        db.runAsync("DELETE FROM dados WHERE id = ?", 
            [ idSendoEditado ]
        ).then(
            carregarItems()
        )
    }

    function iniciarEdicao(item){
        setValor(item.valor)
        setEditando(true)
        setidSendoEditado(item.id)
    }

    return (
        <View>
            <Text>Banco de dados local</Text>
            <TextInput
                placeholder="Digite algo para salvar"
                value={valor}
                onChangeText={setValor}
            />
            <Button
                title={editando ? "Atualizar" : "Salvar"}
                onPress={() => 
                        {
                            if (editando)
                            {
                                atualizaDados(idSendoEditado, valor);
                                setEditando(false);
                                setidSendoEditado(0);
                                setValor("");
                            }
                            else
                            {
                                salvarDado();
                            }
                        }}
/>
            <Text>Dados salvos aparecerão aqui</Text>
            <View>
                {/* Exibe um lista de valores salvos no estado dados */}
                <FlatList
                    data={dados}
                    keyExtractor={
                        (item) => item.id.toString()
                    }er
                    renderItem={
                        ({ item }) => (
                            <>
                                <Text>{item.valor}</Text>
                                <Button 
                                    title="Editar"
                                    onPress={
                                        () => iniciarEdicao(item)
                                    }
                                />
                                <Button
                                    title="Deletar"
                                    onPress={
                                        () => deletarDado(item)
                                    }
                                />
                            </>
                        )
                    }
                />
            </View>
        </View>
    );
}
