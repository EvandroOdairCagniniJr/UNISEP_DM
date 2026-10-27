import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput
} from "react-native";

export default function Home() {
    return (
        <View style={styles.home}>

            <Text style={styles.texto}>
                Tela Home
            </Text>

            <TextInput style={styles.input}/>
            <TextInput style={styles.input}/>
            

            <View style={styles.btn}>
                <Button title="Entrar"/>
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
        backgroundColor: '#ffff',
    },
    input:{
        height: 40,
        width: 500,
        margin: 12,
        borderWidth: 1,
        padding: 10

    }
});