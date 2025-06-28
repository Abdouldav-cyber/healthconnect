import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'; // Pour les icônes standards

export default function SettingsScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  // Fonction pour gérer les actions de menu
  const handleMenuItemPress = (item) => {
    Alert.alert("Action", `Vous avez cliqué sur : ${item}`);
    // Ici, vous ajouteriez la logique de navigation ou d'action pour chaque élément de menu
    switch (item) {
      case 'Paramètres De Notification':
        // navigation.navigate('NotificationSettings'); // Exemple
        break;
      case 'Gestion Mot De Passe':
        // navigation.navigate('PasswordManagement'); // Exemple
        break;
      case 'Supprimer Le Compte':
        Alert.alert(
          "Supprimer le compte",
          "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
          [
            { text: "Annuler", style: "cancel" },
            { text: "Oui", onPress: () => {
                console.log("Suppression du compte...");
                // Implémenter la logique de suppression du compte
                // navigation.replace('AuthHome'); // Rediriger après suppression
              }
            }
          ]
        );
        break;
      default:
        break;
    }
  };

  const MenuItem = ({ iconName, text, onPress }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
    >
      <View style={styles.menuItemContent}>
        <Icon name={iconName} size={24} color="#66BB6A" /> {/* Icônes en vert */}
        <Text style={styles.menuItemText}>{text}</Text>
      </View>
      <Icon name="chevron-forward-outline" size={24} color="gray" /> {/* Flèche de navigation */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color="#228B22" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paramètres</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuItemsContainer}>
        <MenuItem
          iconName="bulb-outline" // Pour "Paramètres De Notification"
          text="Paramètres De Notification"
          onPress={() => handleMenuItemPress('Paramètres De Notification')}
        />
        <MenuItem
          iconName="key-outline" // Pour "Gestion Mot De Passe"
          text="Gestion Mot De Passe"
          onPress={() => handleMenuItemPress('Gestion Mot De Passe')}
        />
        <MenuItem
          iconName="person-remove-outline" // Pour "Supprimer Le Compte"
          text="Supprimer Le Compte"
          onPress={() => handleMenuItemPress('Supprimer Le Compte')}
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
    // Pas de marge négative ici car il n'y a pas d'icône à droite pour compenser
  },
  menuItemsContainer: {
    marginHorizontal: 20,
    backgroundColor: '#F8F8F8', // Un gris très clair pour le fond des éléments de menu
    borderRadius: 15,
    overflow: 'hidden', // Pour que le borderRadius s'applique aux enfants
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE', // Ligne de séparation gris clair
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 15,
  },
});