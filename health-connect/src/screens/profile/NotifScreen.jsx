// src/screens/NotificationSettingsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Switch, // Pour les interrupteurs
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

export default function NotificationSettingsScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  // États pour les interrupteurs des notifications
  const [generalNotificationsEnabled, setGeneralNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [ringtoneEnabled, setRingtoneEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [suggestionsEnabled, setSuggestionsEnabled] = useState(true);
  const [cashbackEnabled, setCashbackEnabled] = useState(true);

  // Composant pour un élément de notification avec interrupteur
  const NotificationToggleItem = ({ label, isEnabled, onToggle }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationLabel}>{label}</Text>
      <Switch
        trackColor={{ false: "#E0E0E0", true: "#66BB6A" }} // Couleurs de l'interrupteur
        thumbColor={isEnabled ? "#FFFFFF" : "#F4F3F4"}
        ios_backgroundColor="#E0E0E0"
        onValueChange={onToggle}
        value={isEnabled}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color="#228B22" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paramètres Notifs</Text>
      </View>

      {/* Liste des options de notification */}
      <View style={styles.notificationListContainer}>
        <NotificationToggleItem
          label="Notifications Générales"
          isEnabled={generalNotificationsEnabled}
          onToggle={setGeneralNotificationsEnabled}
        />
        <NotificationToggleItem
          label="Son"
          isEnabled={soundEnabled}
          onToggle={setSoundEnabled}
        />
        <NotificationToggleItem
          label="Sonnerie Appel"
          isEnabled={ringtoneEnabled}
          onToggle={setRingtoneEnabled}
        />
        <NotificationToggleItem
          label="Vibration"
          isEnabled={vibrationEnabled}
          onToggle={setVibrationEnabled}
        />
        <NotificationToggleItem
          label="Suggestions"
          isEnabled={suggestionsEnabled}
          onToggle={setSuggestionsEnabled}
        />
        <NotificationToggleItem
          label="Cashback"
          isEnabled={cashbackEnabled}
          onToggle={setCashbackEnabled}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%', // Pour s'assurer que le conteneur prend toute la largeur
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
  notificationListContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: 'white', // Un gris très clair pour le fond
    borderRadius: 15,
    overflow: 'hidden', // Pour que le borderRadius s'applique
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE', // Ligne de séparation gris clair
  },
  notificationLabel: {
    fontSize: 16,
    color: 'black',
  },
});