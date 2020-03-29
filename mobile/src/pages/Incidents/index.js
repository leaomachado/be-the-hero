import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';

import style from './style';

import logoImage from '../../assets/logo.png';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);

    let [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {
        if (
            loading ||
            (total > 0 && incidents.length == total)
        ) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        });

        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(++page);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);    

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImage} />
                <Text style={style.headerText}>
                    Total <Text style={style.headerTextBold}>{total} incident(s)</Text>.
                </Text>
            </View>

            <Text style={style.title}>Welcome!</Text>
            <Text style={style.description}>Choose one of the cases below and save the day.</Text>

            <FlatList
                data={incidents}
                style={style.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.5}
                renderItem={({ item: incident }) => (
                    <View style={style.incident}>
                        <Text style={style.incidentProperty}>NGO:</Text>
                        <Text style={style.incidentValue}>{incident.name}</Text>

                        <Text style={style.incidentProperty}>INCIDENT:</Text>
                        <Text style={style.incidentValue}>{incident.title}</Text>
                        
                        <Text style={style.incidentProperty}>VALUE:</Text>
                        <Text style={style.incidentValue}>{
                            Intl.NumberFormat(
                                'en-US',
                                { style: 'currency', currency: 'USD' }
                            ).format(incident.value)
                        }</Text>

                        <TouchableOpacity
                            style={style.detailsButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={style.detailsButtonText}>See more details</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}
