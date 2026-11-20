// import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert
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
    try {
      const produto = await api.get("/listar");
      setData(produto.data);
    } catch (erro) {
      Alert.alert("Erro", "Não foi possível carregar os produtos: " + erro.message);
    }
  }

  const limpaFormulario = () => {
    setId(null);
    setNome('');
    setPreco('');
    setQtdEstoque('');
  }

  const salvar = async () => {
    if (nome.trim() === '' || preco.trim() === '') {
      Alert.alert("Atenção", "Preencha o nome e o preço do produto.");
      return;
    }

    const produto = {
      nome: nome.trim(),
      preco: Number(preco.replace(',', '.')),
      qtd_estoque: Number(qtdEstoque) || 0
    };

    if (isNaN(produto.preco)) {
      Alert.alert("Atenção", "Digite um preço válido. Exemplo: 12,50");
      return;
    }

    try {
      if (id) {
        await api.put("/atualizar", { id, ...produto });
      } else {
        await api.post("/cadastrar", produto);
      }
      limpaFormulario();
      carregaDados();
    } catch (erro) {
      Alert.alert("Erro", "Não foi possível salvar o produto: " + erro.message);
    }
  }

  const editar = (item) => {
    setId(item.id);
    setNome(item.nome);
    setPreco(String(item.preco).replace('.', ','));
    setQtdEstoque(String(item.qtd_estoque ?? ''));
  }

  const excluir = (item) => {
    Alert.alert(
      "Excluir produto",
      `Deseja excluir ${item.nome}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/excluir/${item.id}`);
              if (id === item.id) {
                limpaFormulario();
              }
              carregaDados();
            } catch (erro) {
              Alert.alert("Erro", "Não foi possível excluir o produto: " + erro.message);
            }
          }
        }
      ]
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>
        {id ? 'Editar Produto' : 'Cadastrar Produto'}
      </Text>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Nome do produto"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço (ex: 12,50)"
          keyboardType="decimal-pad"
          value={preco}
          onChangeText={setPreco}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade em estoque"
          keyboardType="number-pad"
          value={qtdEstoque}
          onChangeText={setQtdEstoque}
        />

        <TouchableOpacity style={styles.botaoSalvar} onPress={salvar}>
          <Text style={styles.textoBotao}>
            {id ? 'Salvar alterações' : 'Cadastrar'}
          </Text>
        </TouchableOpacity>

        {id && (
          <TouchableOpacity style={styles.botaoCancelar} onPress={limpaFormulario}>
            <Text style={styles.textoCancelar}>Cancelar edição</Text>
          </TouchableOpacity>
        )}
      </View>

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
          {data.length === 0 && (
            <Text style={styles.vazio}>Nenhum produto cadastrado.</Text>
          )}

          {data.map((item) => {
            return (
              <View style={styles.linha} key={item.id}>
                <Text style={[styles.celula, styles.id]}>{item.id}</Text>

                <Text style={[styles.celula, styles.descricao]}>{item.nome}</Text>

                <Text style={[styles.celula, styles.preco]}>
                  R$ {Number(item.preco).toFixed(2).replace('.', ',')}
                </Text>

                <Text style={[styles.celula, styles.estoque]}>{item.qtd_estoque}</Text>

                <View style={[styles.acoes, styles.botoesLinha]}>
                  <TouchableOpacity style={styles.botaoEditar} onPress={() => editar(item)}>
                    <Text style={styles.textoBotaoPequeno}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.botaoExcluir} onPress={() => excluir(item)}>
                    <Text style={styles.textoBotaoPequeno}>Excluir</Text>
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

  formulario: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    marginBottom: 10,
  },

  botaoSalvar: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },

  botaoCancelar: {
    padding: 12,
    alignItems: 'center',
  },

  textoCancelar: {
    color: '#6B7280',
    fontSize: 14,
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

  vazio: {
    padding: 20,
    color: '#6B7280',
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

  botoesLinha: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },

  botaoEditar: {
    backgroundColor: '#F59E0B',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },

  botaoExcluir: {
    backgroundColor: '#DC2626',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },

  textoBotaoPequeno: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
