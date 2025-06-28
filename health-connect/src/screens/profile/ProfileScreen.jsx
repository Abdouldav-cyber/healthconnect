import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput, // Pour les champs de saisie
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'; // Pour les icônes standards

export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  // États pour les informations de l'utilisateur (à pré-remplir avec les données de l'utilisateur connecté)
  const [fullName, setFullName] = useState('example@ouedraogo hamid'); // Valeur par défaut de la maquette
  const [email, setEmail] = useState('example@example.com'); // Valeur par défaut de la maquette
  const [phoneNumber, setPhoneNumber] = useState('+226 00 00 00 00'); // Valeur par défaut de la maquette
  const [locality, setLocality] = useState('Ouagadougou'); // Valeur par défaut de la maquette
  const [dateOfBirth, setDateOfBirth] = useState('DD / MM / YYYY'); // Valeur par défaut de la maquette

  // Fonction pour gérer la navigation vers les paramètres
  const handleSettingsPress = () => {
    Alert.alert("Paramètres", "Navigation vers l'écran des paramètres.");
    // navigation.navigate('SettingsScreen'); // Exemple de navigation
  };

  // Fonction pour gérer la soumission des changements (si c'était un formulaire éditable)
  const handleSaveChanges = () => {
    Alert.alert("Sauvegarde", "Les modifications ont été sauvegardées !");
    // Ici, vous enverriez les données mises à jour à votre backend
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color="#228B22" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={handleSettingsPress} style={styles.settingsButton}>
          <Icon name="settings-outline" size={24} color="#228B22" />
        </TouchableOpacity>
      </View>

      {/* Profile Info Section */}
      <View style={styles.profileInfoSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150/90EE90/FFFFFF?text=PROFILE' }} // Remplacez par l'URL réelle de l'image de profil
            style={styles.profileImage}
          />
          {/* Icône de "vérifié" ou "éditer" sur l'image */}
          <View style={styles.badgeIconContainer}>
             <Icon name="checkmark-circle" size={24} color="#66BB6A" style={styles.badgeIcon} />
          </View>
        </View>
      </View>

      {/* Formulaire d'informations (champs non éditables comme sur la maquette) */}
      <View style={styles.formContainer}>
        {/* Nom complet */}
        <Text style={styles.inputLabel}>Nom complet</Text>
        <TextInput
          style={styles.textInput}
          value={fullName}
          onChangeText={setFullName}
          editable={false} // Pas éditable selon la maquette
          placeholderTextColor="#A9A9A9"
        />

        {/* Email */}
        {/* <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={false} // Pas éditable selon la maquette
          placeholderTextColor="#A9A9A9"
        /> */}

        {/* Numéro de téléphone */}
        <Text style={styles.inputLabel}>Numero De Telepone</Text>
        <TextInput
          style={styles.textInput}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          editable={false} // Pas éditable selon la maquette
          placeholderTextColor="#A9A9A9"
        />

        {/* Localité */}
        <Text style={styles.inputLabel}>Localité</Text>
        <TextInput
          style={styles.textInput}
          value={locality}
          onChangeText={setLocality}
          editable={false} // Pas éditable selon la maquette
          placeholderTextColor="#A9A9A9"
        />

        {/* Date de Naissance */}
        <Text style={styles.inputLabel}>Date De Naissance</Text>
        <TextInput
          style={styles.textInput}
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          editable={false} // Pas éditable selon la maquette
          placeholderTextColor="#A9A9A9"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 0,
  },
  backButton: {
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#228B22', // Vert foncé
    flex: 1, // Permet au titre de prendre l'espace restant
    textAlign: 'center',
    marginLeft: -24, // Compense le bouton de réglages et de retour pour centrer le texte
  },
  settingsButton: {
    paddingLeft: 10,
  },
  profileInfoSection: {
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 20,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    resizeMode: 'cover',
  },
  badgeIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  badgeIcon: {
    // Styles supplémentaires pour l'icône si nécessaire
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
    fontWeight: 'bold', // Le texte est en gras sur la maquette
  },
  textInput: {
    height: 50,
    backgroundColor: '#F0F8FF', // Bleu très clair comme sur la maquette
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: 'black', // Couleur du texte saisi
  },
});