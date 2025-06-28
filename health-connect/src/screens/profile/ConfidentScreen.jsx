import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView, // Pour permettre le défilement du contenu long
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SecurityScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color="#228B22" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sécurité</Text>
      </View>

      {/* Contenu principal défilable */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Section "Mise À Jour" */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Mise À Jour : 14/08/2024</Text>
          <Text style={styles.sectionText}>
            Health Connect protège vos données médicales avec des technologies de sécurité avancées, adoptées au niveau du Burkina Faso.
          </Text>
          <Text style={styles.sectionText}>
            Les informations sont chiffrées (AES-256) et transmises via des connexions sécurisées (TLS 1.3). Chaque utilisateur s'identifie avec un mot de passe fort, et des vérifications supplémentaires (code SMS) peuvent être demandées.
          </Text>
          <Text style={styles.sectionText}>
            Les accès sont limités selon les rôles (patients, médecins, admins). Toute activité est enregistrée et surveillée. Une déconnexion automatique est activée après inactivité prolongée.
          </Text>
          <Text style={styles.sectionText}>
            Nous suivons les normes locales de sécurité en lien avec le CENATRIN et des partenaires de confiance. Des mises à jour sont déployées régulièrement pour corriger les vulnérabilités et renforcer la protection.
          </Text>
        </View>

        {/* Section "Conditions De Sécurité" */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Conditions De Sécurité</Text>
          <Text style={styles.sectionText}>
            <Text style={styles.listNumber}>1.</Text> L'utilisateur est responsable de la confidentialité de ses identifiants. Toute tentative d'accès non autorisé, de modification frauduleuse ou d'utilisation abusive sera sanctionnée par la suspension du compte.
          </Text>
          <Text style={styles.sectionText}>
            <Text style={styles.listNumber}>2.</Text> En cas d'incident, les utilisateurs concernés seront informés dans un délai de 72h. Les données personnelles restent strictement confidentielles et ne sont utilisées qu'à des fins médicales, avec le consentement de l'utilisateur.
          </Text>
          <Text style={styles.sectionText}>
            <Text style={styles.listNumber}>3.</Text> Health Connect s'engage à garder vos données en sécurité, dans le respect de votre vie privée et de votre santé, ici au Burkina Faso.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 0,
  },
  backButton: {
    paddingRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#228B22', // Vert foncé
    flex: 1,
    textAlign: 'center',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black', // Texte noir comme sur la maquette
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    color: 'gray', // Texte gris clair comme sur la maquette
    lineHeight: 20, // Espacement des lignes pour la lisibilité
    marginBottom: 10, // Espacement entre les paragraphes
  },
  listNumber: {
    fontWeight: 'bold',
    color: 'black', // Le numéro est en noir gras
  },
});