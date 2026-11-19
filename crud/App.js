// import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import api from './api';

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    carregaDados();
  });

  const carregaDados = async () => {
    const produto = await api.get("/listar");
    setData(produto.data);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Produtos</Text>

      <ScrollView horizontal>
        <View style={styles.tabela}>

          {/* Cabeçalho */}
          <View style={styles.header}>
            <Text style={[styles.coluna, styles.id]}>ID</Text>
            <Text style={[styles.coluna, styles.descricao]}>
              DESCRIÇÃO
            </Text>
            <Text style={[styles.coluna, styles.preco]}>
              PREÇO
            </Text>
          </View>

          {/* Dados */}
          {data.map((item) => {
            return (
              <View style={styles.linha} key={item.ID}>
                <Text style={[styles.celula, styles.id]}>
                  {item.ID}
                </Text>

                <Text style={[styles.celula, styles.descricao]}>
                  {item.DESCRICAO}
                </Text>

                <Text style={[styles.celula, styles.preco]}>
                  R$ {String(item.PRECO).replace('.',',')}
                </Text>
              </View>
            )
          })}


        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    paddingTop: 100,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  tabela: {
    minWidth: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
  },

  header: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    paddingVertical: 15,
  },

  linha: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 15,
  },

  coluna: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },

  celula: {
    fontSize: 14,
    color: '#374151',
  },

  id: {
    width: 60,
    textAlign: 'center',
  },

  descricao: {
    width: 180,
    paddingLeft: 10,
  },

  preco: {
    width: 110,
    textAlign: 'right',
    paddingRight: 10,
  },
});