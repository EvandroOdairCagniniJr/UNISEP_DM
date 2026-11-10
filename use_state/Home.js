import { use, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    Alert
} from "react-native";

export default function Home() {

    const [usuario, setUsuario] = useState();
    const [senha, setSenha] = useState();

    function entrar(){

        if(usuario == "admin"  && senha == "12345"){
            window.alert("Usuário logado com sucesso!");
        }else{  
            window.alert("Usuario ou senha invalida");
            setUsuario("");
            setSenha("");
        }
    }


    return (
        <View style={styles.home}>

            <Text style={styles.texto}>
                Usuario: {usuario}
            </Text>

            <Text style={styles.texto}>
                Senha: {senha}
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Usuário"
                onChangeText={setUsuario}
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                onChangeText={setSenha}
                secureTextEntry={true}
            />

            <View style={styles.btn}>
                <Button title="Entrar"
                    onPress={()=>{
                        entrar()
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 500,
        backgroundColor: '#204CC7'
    },
    texto: {
        fontSize: 20,
        color: '#ffff'
    },
    btn: {
        height: 40,
        width: 100,
    },
    input: {
        height: 40,
        width: 500,
        margin: 12,
        borderWidth: 1,
        padding: 10
    }
});