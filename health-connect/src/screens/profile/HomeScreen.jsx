import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'; // Pour les icônes standards
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Pour l'icône de déconnexion

export default function ProfileHome({ navigation }) {
  const insets = useSafeAreaInsets();

  // Données de l'utilisateur (à remplacer par des données réelles de l'utilisateur connecté)
  const userName = "Anita OUEDRAOGO";
  const userProfileImage = "https://via.placeholder.com/150/90EE90/FFFFFF?text=PROFILE"; // Remplacez par l'URL de l'image de profil réelle

  // Fonction pour gérer les actions de menu
  const handleMenuItemPress = (item) => {
    Alert.alert("Action", `Vous avez cliqué sur : ${item}`);
    // Ici, vous ajouteriez la logique de navigation ou d'action pour chaque élément de menu
    switch (item) {
      case 'Profil':
        // navigation.navigate('EditProfile'); // Exemple
        break;
      case 'Favoris':
        // navigation.navigate('Favorites');
        break;
      case 'Sécurité':
        // navigation.navigate('SecuritySettings');
        break;
      case 'Paramètres':
        // navigation.navigate('Settings');
        break;
      case 'Aide':
        // navigation.navigate('Help');
        break;
      case 'Se Déconnecter':
        Alert.alert(
          "Déconnexion",
          "Êtes-vous sûr de vouloir vous déconnecter ?",
          [
            { text: "Annuler", style: "cancel" },
            { text: "Oui", onPress: () => {
                console.log("Déconnexion de l'utilisateur...");
                // Implémenter la logique de déconnexion (effacer le token, rediriger vers l'écran de connexion)
                // navigation.replace('AuthHome'); // Rediriger vers l'écran d'accueil d'authentification
              }
            }
          ]
        );
        break;
      default:
        break;
    }
  };

  const MenuItem = ({ iconName, text, iconColor, onPress, isLast = false, isLogout = false }) => (
    <TouchableOpacity
      style={[
        styles.menuItem,
        isLast && styles.lastMenuItem, // Style pour le dernier élément si nécessaire
        isLogout && styles.logoutMenuItemContainer // Style spécifique pour le bouton de déconnexion
      ]}
      onPress={onPress}
    >
      <View style={styles.menuItemContent}>
        {isLogout ? (
          <MaterialCommunityIcons name={iconName} size={24} color={iconColor} />
        ) : (
          <Icon name={iconName} size={24} color={iconColor} />
        )}
        <Text style={[styles.menuItemText, isLogout && styles.logoutText]}>{text}</Text>
      </View>
      {!isLogout && (
        <Icon name="chevron-forward-outline" size={24} color="gray" />
      )}
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
        <Text style={styles.headerTitle}>Mon Profil</Text>
      </View>

      {/* Profile Info Section */}
      <View style={styles.profileInfoSection}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: userProfileImage }} style={styles.profileImage} />
          {/* Icône de "vérifié" ou "éditer" sur l'image */}
          <View style={styles.badgeIconContainer}>
             <Icon name="checkmark-circle" size={24} color="#66BB6A" style={styles.badgeIcon} />
             {/* Ou <Icon name="camera-outline" size={20} color="white" /> pour une icône d'édition */}
          </View>
        </View>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuItemsContainer}>
        <MenuItem
          iconName="person-outline"
          text="Profil"
          iconColor="#66BB6A"
          onPress={() => handleMenuItemPress('Profil')}
        />
        <MenuItem
          iconName="heart-outline"
          text="Favoris"
          iconColor="#66BB6A"
          onPress={() => handleMenuItemPress('Favoris')}
        />
        <MenuItem
          iconName="lock-closed-outline"
          text="Sécurité"
          iconColor="#66BB6A"
          onPress={() => handleMenuItemPress('Sécurité')}
        />
        <MenuItem
          iconName="settings-outline"
          text="Paramètres"
          iconColor="#66BB6A"
          onPress={() => handleMenuItemPress('Paramètres')}
        />
        <MenuItem
          iconName="help-circle-outline"
          text="Aide"
          iconColor="#66BB6A"
          onPress={() => handleMenuItemPress('Aide')}
        />
        <MenuItem
          iconName="logout" // Utilisation de MaterialCommunityIcons
          text="Se Déconnecter"
          iconColor="#66BB6A"
          onPress={() => handleMenuItemPress('Se Déconnecter')}
          isLast={true}
          isLogout={true}
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
    paddingTop: 20, // Pour compenser la barre de statut
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 0, // La maquette n'a pas de bordure sous l'entête
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
    marginLeft: -34, // Compenser le bouton de retour pour le centrage visuel
  },
  profileInfoSection: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 0, // Pas de bordure visible
    marginBottom: 20,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50, // Pour rendre l'image circulaire
    backgroundColor: '#E0E0E0', // Couleur de fond si l'image ne charge pas
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative', // Pour positionner l'icône de badge
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
    backgroundColor: 'white', // Fond blanc pour l'icône de badge
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
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  menuItemsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
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
    marginBottom: 10, // Pour créer un léger espacement entre les éléments
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE', // Ligne de séparation gris clair
  },
  lastMenuItem: {
    borderBottomWidth: 0, // Pas de bordure pour le dernier élément
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
  logoutMenuItemContainer: {
    // Styles spécifiques pour l'élément de déconnexion si nécessaire (ex: pas de flèche)
  },
  logoutText: {
    color: '#66BB6A', // Le texte de déconnexion est vert
    fontWeight: 'bold',
  },
});