import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';

export default function App() {
  const [valor1, setValor1] = useState(0);
  const [valor2, setValor2] = useState(0);
  const [resultado, setResultado] = useState();

  const adicao = () => {
    setResultado(Number(valor1) + Number(valor2));
  }

  const subtracao = () => {
    setResultado(Number(valor1) - Number(valor2));
  }

  const multiplicacoa = () => {
    setResultado(Number(valor1) * Number(valor2));
  }

  const divisao = () => {
    setResultado(Number(valor1) / Number(valor2));
  }


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora 🧮</Text>

      <View>
        <Text style={styles.label}>Valor 1</Text>
        <TextInput
          style={styles.input}
          onChangeText={setValor1}
        />
        <Text style={styles.label}>Valor 2</Text>
        <TextInput style={styles.input}
          onChangeText={setValor2}
        />
      </View>

      <View style={styles.grupoBotoes}>
        <View style={styles.btn}>
          <Button title='+' color="#fff"
            onPress={() => { adicao() }}
          />
        </View>
        <View style={styles.btn}>
          <Button title='-' color="#fff"
            onPress={() => { subtracao() }}
          />
        </View>
        <View style={styles.btn}>
          <Button title='*' color="#fff"
            onPress={() => { multiplicacoa() }}
          />
        </View>
        <View style={styles.btn}>
          <Button title='/' color="#fff"
            onPress={() => { divisao() }}
          />
        </View>
      </View>

      <Text>{resultado}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titulo: {
    fontSize: 50,
    fontWeight: 'bold'
  },
  input: {
    width: 350,
    height: 50,
    borderWidth: 1,
    borderColor: "#6f6d6d",
    margin: 5,
    borderRadius: 50,
    paddingLeft: 25
  },
  label: {
    fontWeight: 'bold',
    marginLeft: 10
  },
  grupoBotoes: {
    flexDirection: "row"
  },
  btn: {
    backgroundColor: "#6057e0",
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 10
  }
});
