import React, { useState } from 'react';
import styles from '../../assets/css/login.styleSheet';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
  Alert, // Pour les messages de débogage ou d'erreur
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'; 

const FingerprintIcon = ({navigation}) => <Icon name="finger-print-outline" size={80} color="#228B22" />; // Ionicons for fingerprint

export default function LoginScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Logique de connexion ici
    console.log('Email/Phone:', emailOrPhone);
    console.log('Password:', password);
    Alert.alert('Connexion', `Tentative de connexion avec ${emailOrPhone}`);
    // Ici, vous intégreriez votre logique d'appel API
    navigation.navigate('home')
  };

  const handleForgotPassword = () => {
    console.log('Mot de passe oublié');
    Alert.alert('Mot de passe oublié', 'Redirection vers la page de récupération...');
    // navigation.navigate('ForgotPassword'); // Si vous avez un écran pour ça
  };

  const handleSignUp = () => {
    console.log("S'inscrire");
    Alert.alert('Inscription', 'Redirection vers la page d\'inscription...');
    return navigation.navigate('register'); // Si vous avez un écran pour ça*
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color="#228B22" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Se Connecter</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Bienvenue</Text>
        <Text style={styles.instructionText}>
          veuillez saisir les informations ci dessous indiquées
        </Text>

        {/* Email/Phone Input */}
        <Text style={styles.inputLabel}>Email ou Numero de telephone</Text>
        <TextInput
          style={styles.input}
          placeholder="Numero de telephone"
          keyboardType="email-address" // Ou 'phone-pad' si vous préférez
          autoCapitalize="none"
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
        />

        {/* Password Input */}
        <Text style={styles.inputLabel}>Mot De Passe</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="********"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.passwordVisibilityToggle}>
            <Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>mot de passe oublié</Text>
        </TouchableOpacity>

        {/* Main Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Se Connecter</Text>
        </TouchableOpacity>

        {/* Social Login Options */}
        <Text style={styles.orText}>ou se connecter avec :</Text>
        <View style={styles.socialIconsContainer}>
          <TouchableOpacity style={styles.socialIconWrapper}>
            <FingerprintIcon />
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Vous n'avez pas un compte ? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpLink}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

