// import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import api from './api';

export default function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [qtdEstoque, setQtdEstoque] = useState('');

  useEffect(() => {
    carregaDados();
  }, []);

  const carregaDados = async () => {
    const produto = await api.get("/listar");
    setData(produto.data);
  }

  const salvar = async () => {
    const produto = {
      nome: nome,
      preco: preco.replace(',', '.'),
      qtd_estoque: qtdEstoque
    };

    if (id) {
      await api.put("/atualizar", { id: id, ...produto });
    } else {
      await api.post("/cadastrar", produto);
    }

    setId(null);
    setNome('');
    setPreco('');
    setQtdEstoque('');
    carregaDados();
  }

  const editar = (item) => {
    setId(item.id);
    setNome(item.nome);
    setPreco(String(item.preco));
    setQtdEstoque(String(item.qtd_estoque));
  }

  const excluir = async (id) => {
    await api.delete("/excluir/" + id);
    carregaDados();
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Produtos</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        keyboardType="numeric"
        value={preco}
        onChangeText={setPreco}
      />
      <TextInput
        style={styles.input}
        placeholder="Estoque"
        keyboardType="numeric"
        value={qtdEstoque}
        onChangeText={setQtdEstoque}
      />

      <TouchableOpacity style={styles.botao} onPress={salvar}>
        <Text style={styles.textoBotao}>{id ? 'Atualizar' : 'Cadastrar'}</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Lista de Produtos</Text>

      <ScrollView horizontal>
        <View style={styles.tabela}>

          {/* Cabeçalho */}
          <View style={styles.header}>
            <Text style={[styles.coluna, styles.id]}>ID</Text>
            <Text style={[styles.coluna, styles.descricao]}>NOME</Text>
            <Text style={[styles.coluna, styles.preco]}>PREÇO</Text>
            <Text style={[styles.coluna, styles.estoque]}>ESTOQUE</Text>
            <Text style={[styles.coluna, styles.acoes]}>AÇÕES</Text>
          </View>

          {/* Dados */}
          {data.map((item) => {
            return (
              <View style={styles.linha} key={item.id}>
                <Text style={[styles.celula, styles.id]}>{item.id}</Text>
                <Text style={[styles.celula, styles.descricao]}>{item.nome}</Text>
                <Text style={[styles.celula, styles.preco]}>
                  R$ {String(item.preco).replace('.', ',')}
                </Text>
                <Text style={[styles.celula, styles.estoque]}>{item.qtd_estoque}</Text>

                <View style={[styles.acoes, styles.botoes]}>
                  <TouchableOpacity style={styles.botaoEditar} onPress={() => editar(item)}>
                    <Text style={styles.textoBotao}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.botaoExcluir} onPress={() => excluir(item.id)}>
                    <Text style={styles.textoBotao}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          })}

        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    paddingTop: 60,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  botao: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 30,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  tabela: {
    minWidth: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 60,
  },

  header: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    paddingVertical: 15,
  },

  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 10,
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
    width: 50,
    textAlign: 'center',
  },

  descricao: {
    width: 150,
    paddingLeft: 10,
  },

  preco: {
    width: 100,
    textAlign: 'right',
    paddingRight: 10,
  },

  estoque: {
    width: 80,
    textAlign: 'center',
  },

  acoes: {
    width: 150,
    textAlign: 'center',
  },

  botoes: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },

  botaoEditar: {
    backgroundColor: '#F59E0B',
    borderRadius: 5,
    padding: 6,
  },

  botaoExcluir: {
    backgroundColor: '#DC2626',
    borderRadius: 5,
    padding: 6,
  },
});
