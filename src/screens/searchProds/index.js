import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';

import styles from './styles';
import api from '../../services/api';

export default function SearchProds(){

    const [prodsDados, setProdsDados] = useState([]);
    const [prodsNome, setProdsNome] = useState('');

    async function search(){
        const response = await api.get('/produtos');
        setProdsDados(response.data);
    }

    useEffect(()=>{
        search();
    },[]);

    async function searchName(){
        const response = await api.get('/produtos'  + prodsNome);
        setProdsNome(response.data);
    }

    useEffect(()=>{
        searchName();

    }, [prodsNome]);
    
    return(
        <View style={styles.container}>
            
                <Text style={styles.button}>Buscar Produtos</Text>
                <Text style={styles.textProd}>Digite o nome do produto</Text>
                <TextInput style={styles.textInput} onChangeText={(value)=>setProdsNome(value)}/>

            <FlatList 
                style={styles.list}
                data={prodsDados}
                keyExtractor={prodsDados => String(prodsDados.cod)}
                
                showsVerticalScrollIndicator={false}

                renderItem={({item: prodsDados}) => (
                    <View style={styles.itemList}>
                        <Text>Código</Text>
                        <Text>{prodsDados.cod}</Text>
                        <Text>Nome</Text>
                        <Text>{prodsDados.nome}</Text>
                        <Text>Descrição</Text>
                        <Text>{prodsDados.descri}</Text>
                        <Text>Quantidade</Text>
                        <Text>{prodsDados.qtda}</Text>
                        <Text>Fabricante</Text>
                        <Text>{prodsDados.fabricante}</Text>
                        <Text>Data</Text>
                        <Text>{prodsDados.datahora}</Text>
                    </View>
                )}
            />

        </View>
    )
};