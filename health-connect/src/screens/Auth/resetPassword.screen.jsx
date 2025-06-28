import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'; // Assurez-vous d'avoir installé react-native-vector-icons

export default function ForgotPasswordScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleCreateNewPassword = () => {
    if (newPassword === '') {
      Alert.alert('Erreur', 'Veuillez saisir un nouveau mot de passe.');
      return;
    }
    if (confirmPassword === '') {
      Alert.alert('Erreur', 'Veuillez confirmer votre mot de passe.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }

    // Logique de création/réinitialisation du mot de passe ici
    console.log('Nouveau mot de passe:', newPassword);
    Alert.alert('Succès', 'Votre mot de passe a été réinitialisé avec succès !');
    // Ici, vous intégreriez votre logique d'appel API pour réinitialiser le mot de passe.
    // navigation.navigate('Login'); // Rediriger l'utilisateur vers la page de connexion
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color="#228B22" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mot De Passe</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Nouveau Mot De Passe Input */}
        <Text style={styles.inputLabel}>Nouveau Mot De Passe</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="********"
            placeholderTextColor="#A9A9A9"
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.passwordVisibilityToggle}>
            <Icon name={showNewPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Confirmer Le Mot De Passe Input */}
        <Text style={styles.inputLabel}>Confirmer Le Mot De Passe</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="********"
            placeholderTextColor="#A9A9A9"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.passwordVisibilityToggle}>
            <Icon name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Bouton Créer */}
        <TouchableOpacity style={styles.createButton} onPress={handleCreateNewPassword}>
          <Text style={styles.createButtonText}>Créer</Text>
        </TouchableOpacity>
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
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0, // Pas de bordure visible sur l'image
  },
  backButton: {
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#228B22', // Vert pour le titre
    flex: 1,
    textAlign: 'center',
    marginLeft: -34, // Compenser le bouton de retour pour le centrage visuel
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
    alignItems: 'flex-start', // Aligner le contenu à gauche par défaut
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
    marginTop: 15, // Espace entre les champs
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#F0F8FF', // Un bleu très clair pour le fond des inputs
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1, // Prend l'espace disponible
    fontSize: 16,
    color: 'black',
  },
  passwordVisibilityToggle: {
    paddingLeft: 10,
  },
  createButton: {
    backgroundColor: '#66BB6A', // Vert pour le bouton "Créer"
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 40, // Espace par rapport aux champs de mot de passe
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});