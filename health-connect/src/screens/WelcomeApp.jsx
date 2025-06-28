import React, {use, useEffect,useRef} from 'react';
import { View, StyleSheet, Image, StatusBar, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const logo = require('../assets/logoWhite.png'); // Chemin à ajuster si nécessaire

const WelcomeApp = ({navigation}) => {
  const insets = useSafeAreaInsets(); 
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(scaleAnim, {
      toValue: 1, // Échelle de 0 à 1
      duration: 1000, // Durée de l'animation en millisecondes
      easing: Easing.elastic(1.2), // Effet élastique pour un démarrage plus dynamique
      useNativeDriver: true, // Utilise le thread natif pour de meilleures performances
    }).start();
      // Navigation vers l'écran d'accueil après 5 secondes
      navigation.navigate('auth') // Remplacez 'AuthHome' par le nom de votre écran d'accueil
    }, 5000); 
    return () => clearTimeout(timer);
  } , []);

  const animatedCircleStyle = {
    transform: [{ scale: scaleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 300], // Ajustez cette valeur pour que le cercle couvre tout l'écran
    }) }],
    opacity: scaleAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1], // Rend le cercle progressivement opaque
    }),
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" /> {/* Pour la barre de statut */}
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <Animated.View style={[styles.redirectionCircle, animatedCircleStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#4CAF50', // Vert inspiré de l'image home.png
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 350, 
    height: 350,
    marginBottom: 20,
    marginRight: 20,
  },
  redirectionCircle: {
    position: 'absolute',
    width: 10, // Petite taille initiale
    height: 10,
    borderRadius: 5, // Pour que ce soit un cercle
    backgroundColor: '#FFEB3B', // Une couleur vive pour le cercle d'animation (jaune, par exemple)
    zIndex: 1, // Assure que le cercle est sous le logo mais au-dessus du fond
    // Le positionnement au centre sera géré par transform: scale et l'animation
  },
});

export default WelcomeApp;