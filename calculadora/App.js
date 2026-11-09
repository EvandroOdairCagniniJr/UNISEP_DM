
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';

export default function App() {
  const [valor1, setValor1] = useState('');
  const [valor2, setValor2] = useState('');
  const [resultado, setResultado] = useState('0');

  const calcular = (operacao) => {
    const n1 = Number(valor1.replace(',', '.'));
    const n2 = Number(valor2.replace(',', '.'));

    if (valor1 === '' || valor2 === '') {
      setResultado('Preencha os valores');
      return;
    }

    let res;

    switch (operacao) {
      case '+':
        res = n1 + n2;
        break;

      case '-':
        res = n1 - n2;
        break;

      case '*':
        res = n1 * n2;
        break;

      case '/':
        if (n2 === 0) {
          setResultado('Erro: divisão por zero');
          return;
        }
        res = n1 / n2;
        break;
    }

    setResultado(String(res));
  };

  const limpar = () => {
    setValor1('');
    setValor2('');
    setResultado('0');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.titulo}>Calculadora</Text>

      <View style={styles.calculadora}>
        <TextInput
          style={styles.input}
          placeholder="Digite o primeiro valor"
          placeholderTextColor="#888"
          keyboardType="decimal-pad"
          value={valor1}
          onChangeText={setValor1}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite o segundo valor"
          placeholderTextColor="#888"
          keyboardType="decimal-pad"
          value={valor2}
          onChangeText={setValor2}
        />

        <View style={styles.operacoes}>
          <Pressable
            style={styles.botao}
            onPress={() => calcular('+')}
          >
            <Text style={styles.textoBotao}>+</Text>
          </Pressable>

          <Pressable
            style={styles.botao}
            onPress={() => calcular('-')}
          >
            <Text style={styles.textoBotao}>-</Text>
          </Pressable>

          <Pressable
            style={styles.botao}
            onPress={() => calcular('*')}
          >
            <Text style={styles.textoBotao}>×</Text>
          </Pressable>

          <Pressable
            style={styles.botao}
            onPress={() => calcular('/')}
          >
            <Text style={styles.textoBotao}>÷</Text>
          </Pressable>
        </View>

        <Text style={styles.label}>Resultado</Text>

        <View style={styles.resultado}>
          <Text style={styles.textoResultado}>{resultado}</Text>
        </View>

        <Pressable
          style={styles.botaoLimpar}
          onPress={limpar}
        >
          <Text style={styles.textoBotao}>Limpar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  titulo: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  calculadora: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 15,
  },

  input: {
    backgroundColor: '#fff',
    color: '#000',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 18,
  },

  operacoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  botao: {
    backgroundColor: '#6200EE',
    width: '22%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  label: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },

  resultado: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    minHeight: 65,
    justifyContent: 'center',
  },

  textoResultado: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
  },

  botaoLimpar: {
    backgroundColor: '#D32F2F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
});
