import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width:'100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0', // Une légère ligne de séparation
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
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
    alignItems: 'flex-start', // Aligner le contenu à gauche par défaut
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
    marginTop: 15, // Espace entre les champs
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F0F8FF', // Un bleu très clair pour le fond des inputs
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'black',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#F0F8FF',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20, // Espace entre les champs
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  passwordVisibilityToggle: {
    paddingLeft: 10,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end', // Aligner à droite
    marginTop: 10,
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: 'gray',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#66BB6A', // Vert pour le bouton de connexion
    borderRadius: 50,
    paddingVertical: 15,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center', // Centrer le bouton de connexion
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
    alignSelf: 'center', // Centrer le texte "ou s'inscrire avec"
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%', // Pour espacer les icônes
    marginBottom: 40,
  },
  socialIconWrapper: {
    padding: 10,
    height: 120,
    borderRadius: 50, 
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  signUpContainer: {
    flexDirection: 'row',
    alignSelf: 'center', // Centrer le texte d'inscription
    marginTop: 20, // Espace par rapport aux icônes sociales
  },
  signUpText: {
    fontSize: 16,
    color: 'black',
  },
  signUpLink: {
    fontSize: 16,
    color: '#228B22', // Vert pour le lien d'inscription
    fontWeight: 'bold',
  },
})

export default styles;