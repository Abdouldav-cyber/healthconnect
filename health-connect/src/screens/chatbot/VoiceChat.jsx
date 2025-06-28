// src/screens/VoiceChatScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated, // Pour l'animation de vocalisation
  Easing,   // Pour la fluidité de l'animation
  Alert,    // Pour les messages d'alerte
  SafeAreaView, // Utiliser SafeAreaView pour mieux gérer les encoches
  Keyboard, // Pour masquer le clavier si nécessaire
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function VoiceChatScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [isRecording, setIsRecording] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current; // Valeur pour l'animation
  const pulseAnimation = useRef(new Animated.Value(1)).current; // Pour l'effet de pulsation
  const dotsAnimation = useRef(new Animated.Value(0)).current; // Pour l'animation des points de l'écoute en cours

  // Démarre l'animation de vocalisation
  const startVocalizationAnimation = () => {
    animationValue.setValue(0); // Réinitialise l'animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 1000, // Durée d'un cycle complet pour toutes les barres
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animation de pulsation du cercle central
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.2,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animation des points pour "Ecoute en cours..."
    dotsAnimation.setValue(0);
    Animated.loop(
      Animated.timing(dotsAnimation, {
        toValue: 3, // 3 points
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  // Arrête toutes les animations
  const stopVocalizationAnimation = () => {
    animationValue.stopAnimation();
    pulseAnimation.stopAnimation();
    dotsAnimation.stopAnimation();
    pulseAnimation.setValue(1); // Remet à l'échelle normale
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      // Arrêter l'enregistrement
      setIsRecording(false);
      stopVocalizationAnimation();
      Alert.alert('Enregistrement terminé', 'Votre message vocal a été envoyé.');
      // Ici, vous enverriez le message vocal
    } else {
      // Démarrer l'enregistrement
      setIsRecording(true);
      startVocalizationAnimation();
      // Ici, vous initialiseriez l'enregistrement vocal
      Keyboard.dismiss(); // Masque le clavier s'il était affiché
    }
  };

  // Styles pour les barres de l'animation de vocalisation
  const barHeights = [
    animationValue.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [20, 50, 30, 60, 20],
    }),
    animationValue.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [30, 60, 40, 70, 30],
    }),
    animationValue.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [40, 70, 50, 80, 40],
    }),
    animationValue.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [50, 80, 60, 90, 50],
    }),
    animationValue.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [40, 70, 50, 80, 40],
    }),
    animationValue.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [30, 60, 40, 70, 30],
    }),
    animationValue.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [20, 50, 30, 60, 20],
    }),
  ];

  // Animation des points de l'écoute en cours
  const animatedDots = dotsAnimation.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [4, 5, 6, 7],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => navigation.navigate('chatbot')} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color="#228B22" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chatbot</Text>
      </View>

      <View style={styles.content}>
        {/* Animation de vocalisation */}
        <View style={styles.vocalizationContainer}>
          {isRecording ? (
            <View style={styles.waveform}>
              {barHeights.map((height, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.bar,
                    { height: height, transform: [{ scaleY: pulseAnimation }] },
                  ]}
                />
              ))}
            </View>
          ) : (
            // Icône de micro quand pas en enregistrement
            <Icon name="mic-outline" size={80} color="gray" />
          )}
        </View>

        {/* Barre d'état de l'écoute/enregistrement */}
        {isRecording && (
          <View style={styles.recordingStatusContainer}>
            <TouchableOpacity onPress={() => setIsRecording(false)} style={styles.recordingCancelButton}>
              <Icon name="close-circle-outline" size={24} color="red" />
            </TouchableOpacity>
            <Text style={styles.recordingStatusText}>
              Écoute en cours<Animated.Text>{animatedDots}</Animated.Text>
            </Text>
            <TouchableOpacity onPress={handleToggleRecording} style={styles.recordingDoneButton}>
              <Icon name="checkmark-circle-outline" size={24} color="#66BB6A" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Menu vocal (remplace le clavier) */}
      <View style={styles.voiceMenuContainer}>
        {/* Bouton pour lancer/arrêter la vocalisation */}
        <TouchableOpacity
          style={[styles.voiceButton, isRecording && styles.voiceButtonRecording]}
          onPress={handleToggleRecording}
        >
          <Icon name={isRecording ? "stop-outline" : "mic-outline"} size={30} color={isRecording ? "white" : "#66BB6A"} />
        </TouchableOpacity>
      </View>

      {/* Barre de navigation inférieure */}
      <View style={[styles.bottomNavBar, { paddingBottom: insets.bottom + 5 }]}>
        <TouchableOpacity style={styles.navBarItem} onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={24} color="gray" />
          <Text style={styles.navBarText}>Accueil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarItem} onPress={() => navigation.navigate('Help')}>
          <Icon name="help-circle-outline" size={24} color="gray" />
          <Text style={styles.navBarText}>Aide</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarItem} onPress={() => navigation.navigate('MedicalRecords')}>
          <Icon name="documents-outline" size={24} color="gray" />
          <Text style={styles.navBarText}>Dossier</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarItem} onPress={() => console.log('Chatbot actif')}>
          <MaterialCommunityIcons name="robot-outline" size={24} color="#66BB6A" /> {/* Icône active pour Chatbot */}
          <Text style={[styles.navBarText, { color: '#66BB6A' }]}>Chatbot</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    paddingHorizontal: 20,
  },
  vocalizationContainer: {
    width: '100%',
    height: 150, // Hauteur pour l'animation
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'flex-end', // Aligner les barres par le bas
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  bar: {
    width: 8, // Largeur de chaque barre
    marginHorizontal: 2, // Espacement entre les barres
    backgroundColor: '#66BB6A', // Couleur des barres
    borderRadius: 2,
  },
  recordingStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0FFE0', // Fond clair pour la barre d'état
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'absolute', // Positionner au-dessus du menu vocal
    bottom: 200, // Ajustez cette valeur pour le positionnement
    width: '90%',
    justifyContent: 'space-between',
  },
  recordingCancelButton: {
    padding: 5,
  },
  recordingStatusText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  recordingDoneButton: {
    padding: 5,
  },
  voiceMenuContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#F0F8FF', // Couleur de fond du clavier simulé
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    bottom: 60, // Au-dessus de la barre de navigation
    left: 0,
    right: 0,
    height: 250, // Hauteur du "clavier" avec juste le bouton micro
  },
  voiceButton: {
    backgroundColor: 'white', // Fond blanc
    borderColor: '#66BB6A', // Bordure verte
    borderWidth: 2,
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  voiceButtonRecording: {
    backgroundColor: '#66BB6A', // Vert quand l'enregistrement est actif
    borderColor: '#66BB6A',
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