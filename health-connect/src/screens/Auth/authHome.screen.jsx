import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const logo = require('../../assets/logo.png'); // Chemin à ajuster si nécessaire
const AuthHomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.section1}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.description}>
            Votre solution sécurisée d'e-santé intégrant un dossier médical 
            électronique sécurisé et une plateforme de télémédecine pour une meilleure gestion 
            sanitair
        </Text>
      </View>
      <View style={styles.section2}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('login')}>
            <Text style={styles.loginButtonText}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={() => navigation.navigate('register')}
        >
            <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 30,
    },
    section1: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 130,
    },
    logo: {
        width: 260,
        height: 220,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
        marginHorizontal:10,
    },
    section2: {
        flex: 1,    
        width: '100%',
        justifyContent: 'center',   
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    primaryButton: {
        backgroundColor: '#2E8B57',
        width: '100%',
        paddingVertical: 15,
        borderRadius: 50,
        alignItems: 'center',
        marginBottom: 10,
    },
    secondaryButton: {
        backgroundColor:  '#ADD8E6', // Couleur grise claire
        paddingVertical: 15,
        borderRadius: 50,
        width: '50%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'green',
        fontSize: 16,
        fontWeight: 'bold',

    },
    loginButtonText: {
        color: '#fff',  
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AuthHomeScreen;