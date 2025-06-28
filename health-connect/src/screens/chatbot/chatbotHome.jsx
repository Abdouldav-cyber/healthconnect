// src/screens/ChatbotScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'; //
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Pour l'icône du chatbot dans la nav bar

export default function ChatbotScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const handleMakeDiagnosis = () => {
    Alert.alert('Diagnostic IA', 'Lancer la fonctionnalité de diagnostic basée sur l\'IA.');
    // Navigation vers l'écran de diagnostic réel
  };

  const handleDiscuss = () => {
    Alert.alert('Discuter', 'Ouvrir une conversation avec le chatbot.');
    // Navigation vers une interface de chat avec le chatbot
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color="#228B22" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chatbot</Text>
      </View>

      <View style={styles.content}>
        {/* L'image de l'icône du chatbot n'est pas explicite, je simule avec une icône */}
        {/* Ou vous pourriez ajouter une image ici si vous avez un asset spécifique */}
        {/* <Image source={require('../assets/chatbot_icon.png')} style={styles.chatbotIcon} /> */}

        <Text style={styles.description}>
          Une intelligence artificielle capable de détecter par le son de votre voix et par vos questions vos problèmes sanitaires
        </Text>

        <TouchableOpacity style={styles.diagnosisButton} onPress={()=>navigation.navigate('chatbot')}>
          <Text style={styles.diagnosisButtonText}>faire un diagnostic</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.discussButton} onPress={handleDiscuss}>
          <Text style={styles.discussButtonText}>Discuter</Text>
        </TouchableOpacity> */}
      </View>

      {/* Barre de navigation inférieure */}
      <View style={[styles.bottomNavBar, { paddingBottom: insets.bottom + 5 }]}>
        <TouchableOpacity style={styles.navBarItem} onPress={() => navigation.navigate('home')}>
          <Icon name="home-outline" size={24} color="gray" />
          <Text style={styles.navBarText}>Accueil</Text>
        </TouchableOpacity>
                        <TouchableOpacity style={styles.navBarItem} onPress={() => navigation.navigate('msg')}>
                          <Icon name="chatbubbles-outline" size={24} color="gray" />
                          <Text style={styles.navBarText}>Chat</Text>
                        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarItem} onPress={() => navigation.navigate('dossier')}>
          <Icon name="documents-outline" size={24} color="gray" />
          <Text style={styles.navBarText}>Dossier</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarItem} onPress={() => navigation.navigate('botHome')}>
          <MaterialCommunityIcons name="robot-outline" size={24} color="#66BB6A" /> {/* Icône active pour Chatbot */}
          <Text style={[styles.navBarText, { color: '#66BB6A' }]}>Chatbot</Text>
        </TouchableOpacity>
      </View>
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
    marginLeft: -34, // Compenser le bouton de retour pour le centrage visuel
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  chatbotIcon: {
    width: 100, // Ajustez la taille selon votre icône
    height: 100,
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  diagnosisButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#66BB6A',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginBottom: 15,
  },
  diagnosisButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#66BB6A',
  },
  discussButton: {
    backgroundColor: '#66BB6A', // Vert
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  discussButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    height: 60,
  },
  navBarItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navBarText: {
    fontSize: 10,
    color: 'gray',
    marginTop: 3,
  },
});