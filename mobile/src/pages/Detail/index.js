import React from 'react';
import { View, Image, TouchableOpacity, Text, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import style from './style';

import logoImage from '../../assets/logo.png';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const amount = Intl.NumberFormat(
        'en-US',
        { style: 'currency', currency: 'USD' }
    ).format(incident.value);

    const message = `Hello, ${incident.name}! I'm contacting you to inform you that I would like to help you in the "${incident.title}" incident, contributing with the amount of ${amount}.`;

    function navigateToBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Hero of incident: "${incident.title}"`,
            recipients: [incident.email],
            body: message
        });
    }

    function sendWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=${incident.phone}&text=${message}`);
    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImage} />

                <TouchableOpacity onPress={navigateToBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
            </View>

            <View style={style.incident}>
                <Text style={[style.incidentProperty, { marginTop: 0 }]}>NGO:</Text>
                <Text style={style.incidentValue}>
                    {incident.name} of {incident.city}/{incident.state}
                </Text>

                <Text style={style.incidentProperty}>INCIDENT:</Text>
                <Text style={style.incidentValue}>{incident.title}</Text>
                
                <Text style={style.incidentProperty}>VALUE:</Text>
                <Text style={style.incidentValue}>{amount}</Text>
            </View>

            <View style={style.contactBox}>
                <Text style={style.heroTitle}>Save the day!</Text>
                <Text style={style.heroTitle}>Be the hero of this case.</Text>

                <Text style={style.heroDescription}>Entre em contato:</Text>

                <View style={style.actions}>
                    <TouchableOpacity style={style.action} onPress={sendWhatsApp}>
                        <Text style={style.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.action} onPress={sendMail}>
                        <Text style={style.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
