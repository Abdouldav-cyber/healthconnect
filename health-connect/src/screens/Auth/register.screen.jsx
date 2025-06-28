import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  Platform,
  Alert,
  Image, // Importez Image pour afficher l'image sélectionnée
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

// Importez ImagePicker
import * as ImagePicker from 'expo-image-picker';
import { PermissionsAndroid } from 'react-native';


export default function RegisterScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const [fullName, setFullName] = useState('');
  // const [email, setEmail] = useState(''); // Supprimez ou commentez ce champ
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Nouvel état pour l'URI de l'image sélectionnée
  const [profileImage, setProfileImage] = useState(null);

  const handleRegister = () => {
    console.log({
      fullName,
      // email, // N'oubliez pas d'enlever l'email si vous le remplacez
      password,
      phoneNumber,
      location,
      dateOfBirth: dateOfBirth.toLocaleDateString(),
      profileImage: profileImage, // Incluez l'URI de l'image dans les données d'inscription
    });
    Alert.alert('Inscription', 'Tentative d\'inscription...');
    // Intégrez votre logique d'appel API ici.
    // Pour l'API, vous devrez envoyer l'image sous forme de FormData (multipart/form-data).
    // Exemple : https://developer.mozilla.org/fr/docs/Web/API/FormData/Using_FormData_Objects
  };

  const handleSignIn = () => {
    console.log('Se connecter');
    Alert.alert('Connexion', 'Redirection vers la page de connexion...');
    navigation.navigate('home');
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios');
    setDateOfBirth(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const formatDateForDisplay = (date) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day} / ${month} / ${year}`;
  };

  // Fonction pour demander la permission de la caméra
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Permission d'accès à la caméra",
            message: "Cette application a besoin d'accéder à votre caméra pour prendre des photos.",
            buttonNeutral: "Demander plus tard",
            buttonNegative: "Annuler",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Vous pouvez utiliser la caméra");
          return true;
        } else {
          console.log("Permission de la caméra refusée");
          Alert.alert("Permission refusée", "Vous devez autoriser l'accès à la caméra pour prendre des photos.");
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS demande automatiquement au premier usage
  };

  // Fonction pour sélectionner une image de la galerie
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Permettre de recadrer l'image
      aspect: [4, 3], // Ratio d'aspect pour le recadrage
      quality: 1, // Qualité de l'image (0 à 1)
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Fonction pour prendre une photo avec la caméra
  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Fonction pour afficher un choix entre galerie et caméra
  const handleImageSelection = () => {
    Alert.alert(
      "Sélectionner une image",
      "Choisissez une source d'image",
      [
        {
          text: "Galerie",
          onPress: pickImage,
        },
        {
          text: "Caméra",
          onPress: takePhoto,
        },
        {
          text: "Annuler",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };


  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('auth')} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color="#228B22" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>S'inscrire</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Nom Complet Input */}
        <Text style={styles.inputLabel}>Nom complet</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom prénom"
          placeholderTextColor="#A9A9A9"
          value={fullName}
          onChangeText={setFullName}
        />

        {/* Champ de Sélection d'Image (remplace l'Email) */}
        <Text style={styles.inputLabel}>Photo de profil (optionnel)</Text>
        <TouchableOpacity onPress={handleImageSelection} style={styles.imagePickerButton}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImagePreview} />
          ) : (
            <View style={styles.noImagePlaceholder}>
              <Icon name="camera-outline" size={40} color="#A9A9A9" />
              <Text style={styles.noImageText}>Ajouter une photo</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Date De Naissance Input avec DatePicker */}
        <Text style={styles.inputLabel}>Date De Naissance</Text>
        <TouchableOpacity onPress={showDatepicker} style={styles.inputTouchable}>
          <TextInput
            style={styles.input}
            placeholder="DD / MM / AAAA"
            placeholderTextColor="#A9A9A9"
            value={formatDateForDisplay(dateOfBirth)}
            editable={false}
          />
        </TouchableOpacity>


        {/* Numero De Telepone Input */}
        <Text style={styles.inputLabel}>Numero De Telepone</Text>
        <TextInput
          style={styles.input}
          placeholder="+226 XX XX XX XX"
          placeholderTextColor="#A9A9A9"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        {/* Localité Input */}
        <Text style={styles.inputLabel}>Localité</Text>
        <TextInput
          style={styles.input}
          placeholder="Ville de résidence"
          placeholderTextColor="#A9A9A9"
          value={location}
          onChangeText={setLocation}
        />

        {/* Mot De Passe Input */}
        <Text style={styles.inputLabel}>Mot De Passe</Text>
        <TextInput
          style={styles.input}
          placeholder="123456@kl%"
          placeholderTextColor="#A9A9A9"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        {/* Le DatePicker lui-même */}
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateOfBirth}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChangeDate}
            maximumDate={new Date()}
          />
        )}

        {/* Terms and Conditions */}
        <Text style={styles.termsText}>
          En continuant, vous acceptez
          <Text style={styles.termsLink}> Les termes d'utilisation</Text> et la
          <Text style={styles.termsLink}> politique de confidentialité</Text>
        </Text>

        {/* Main Register Button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>S'inscrire</Text>
        </TouchableOpacity>

        {/* Sign In Link */}
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Avez vous déjà un compte? </Text>
          <TouchableOpacity onPress={handleSignIn}>
            <Text style={styles.signInLink}>Se connecter</Text>
          </TouchableOpacity>
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
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0,
  },
  backButton: {
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#228B22',
    flex: 1,
    textAlign: 'center',
    marginLeft: -34,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 0,
    paddingBottom: 40,
    alignItems: 'flex-start',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F0F8FF',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'black',
  },
  inputTouchable: {
    width: '100%',
  },
  // Nouveaux styles pour le champ d'image
  imagePickerButton: {
    width: '100%',
    height: 150, // Hauteur du conteneur d'image
    backgroundColor: '#F0F8FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Pour s'assurer que l'image ne dépasse pas les bords arrondis
  },
  profileImagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Pour que l'image remplisse le conteneur
    borderRadius: 10, // Assurez-vous que l'image suit les coins arrondis
  },
  noImagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    marginTop: 5,
    fontSize: 14,
    color: '#A9A9A9',
  },

  termsText: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 30,
    width: '100%',
    lineHeight: 20,
  },
  termsLink: {
    color: '#228B22',
    fontWeight: 'bold',
    textDecorationLine: 'none',
  },
  registerButton: {
    backgroundColor: '#66BB6A',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
    alignSelf: 'center',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  socialIconWrapper: {},
  socialIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
  signInText: {
    fontSize: 16,
    color: 'black',
  },
  signInLink: {
    fontSize: 16,
    color: '#228B22',
    fontWeight: 'bold',
  },
});