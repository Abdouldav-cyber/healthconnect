import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  Platform, // Pour détecter la plateforme (iOS/Android)
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

// Importez le DatePicker
import DateTimePicker from '@react-native-community/datetimepicker';

// ... (vos autres icônes et imports)

export default function DateSelect() {
  const insets = useSafeAreaInsets();

  // États pour le DatePicker
  const [dateOfBirth, setDateOfBirth] = useState(new Date()); // Initialisez avec la date actuelle
  const [showDatePicker, setShowDatePicker] = useState(false); // Pour contrôler la visibilité du picker



  // Fonction appelée quand la date est sélectionnée
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios'); // Cache le picker sur iOS après sélection
    setDateOfBirth(currentDate);
  };

  // Fonction pour afficher le picker
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  // Fonction pour formater la date pour l'affichage dans le TextInput
  const formatDateForDisplay = (date) => {
    if (!date) return '';
    // Exemple de format JJ / MM / AAAA
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois est 0-indexé
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* ... (vos autres champs comme Nom complet, Email, Mot de Passe, Numéro de Téléphone, Localité) ... */}

        {/* Date De Naissance Input (avec activation du DatePicker) */}
        <Text style={styles.inputLabel}>Date De Naissance</Text>
        <TouchableOpacity onPress={showDatepicker} style={styles.inputTouchable}>
          <TextInput
            style={styles.input}
            placeholder="JJ / MM / AAAA"
            value={formatDateForDisplay(dateOfBirth)} // Affiche la date formatée
            editable={false} // Rendre le TextInput non éditable directement
          />
        </TouchableOpacity>

        {/* Le DatePicker lui-même */}
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateOfBirth}
            mode="date" // Seul le sélecteur de date
            display={Platform.OS === 'ios' ? 'spinner' : 'default'} // 'spinner' est souvent plus esthétique sur iOS
            onChange={onChangeDate}
            maximumDate={new Date()} // Empêche de sélectionner une date dans le futur
          />
        )}

        {/* ... (vos autres champs comme Terms and Conditions, boutons) ... */}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... (vos styles existants) ...

  // Nouveau style pour rendre le TextInput cliquable
  inputTouchable: {
    width: '100%',
  },
  // Assurez-vous que le style input est toujours appliqué au TextInput
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F0F8FF',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'black',
  },
  // ... (vos autres styles) ...
});