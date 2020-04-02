import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
//pacotes de icones do expo
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo.png';

import styles from './styles';
import api from '../../services/api';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigateToDetail( incident ) {
    navigation.navigate('Detail', { incident });
  }

  async function loadIncidents() {
    // se ja estiver carregando (loading = true) não executa novamente
    // evitando ficar tentando carregar todo momento que o usuario ficar
    // pressinando a tela
    if (loading) {
      return;
    }

    //caso ja tenha chegado na ultima pagina, ou seja, buscado o total de informacoes
    //nao faco mais nada, nao fico tentando buscar mais nada. 
    if (total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);

    const response = await api.get('incidents', {
      params : {page}
    });
    console.log(response.data);
    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);

  }

  useEffect(() => {
    loadIncidents();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList
        data={incidents}
        style= {styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (

          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>
            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>
            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency', currency: 'BRL'
              }).format(incident.value)}
            </Text>
            <TouchableOpacity 
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes.</Text>
              <Feather name="arrow-right" size={16} color="#e02041"/>
            </TouchableOpacity>
          </View>

        )}

      />

  </View>
  );
}