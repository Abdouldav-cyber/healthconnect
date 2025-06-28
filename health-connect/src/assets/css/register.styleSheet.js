import { StyleSheet } from "react-native";

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
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
    marginLeft: -34, // Compenser le bouton de retour pour le centrage visuel
  },
  scrollViewContent: {
    flexGrow: 1, // Permet au contenu de ScrollView de s'étendre
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 40, // Espace en bas pour le scroll
    alignItems: 'flex-start', // Aligner le contenu à gauche par défaut
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
    backgroundColor: '#F0F8FF', // Bleu très clair pour le fond des inputs
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'black',
  },
  termsText: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 30,
    width: '100%', // Pour centrer le texte sur plusieurs lignes
  },
  termsLink: {
    color: '#228B22',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  registerButton: {
    backgroundColor: '#66BB6A', // Vert pour le bouton d'inscription
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
  socialIconWrapper: {
    padding: 10,
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