// src/screens/ChatbotConversationScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image, // Pour l'avatar du chatbot
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ChatbotConversationScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef();

  // Messages simulés pour la conversation avec le chatbot
  const [messages, setMessages] = useState([
    { id: '1', text: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?', sender: 'chatbot', time: '10:00' },
    { id: '2', text: 'J\'ai mal à la tête et je me sens fatigué.', sender: 'me', time: '10:02' },
    { id: '3', text: 'Depuis quand avez-vous ces symptômes ?', sender: 'chatbot', time: '10:03' },
    { id: '4', text: 'Depuis hier soir.', sender: 'me', time: '10:05' },
    { id: '5', text: 'Avez-vous d\'autres symptômes comme de la fièvre ou des nausées ?', sender: 'chatbot', time: '10:06' },
    { id: '6', text: 'Non, juste mal à la tête et fatigue.', sender: 'me', time: '10:08' },
    { id: '7', text: 'Je vous recommande de vous reposer et de boire beaucoup d\'eau. Si les symptômes persistent, veuillez consulter un médecin. Voulez-vous faire un diagnostic plus approfondi?', sender: 'chatbot', time: '10:10' },
  ]);

  useEffect(() => {
    // Faire défiler vers le bas à chaque nouveau message
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: String(messages.length + 1),
        text: message.trim(),
        sender: 'me',
        time: new Date().toLocaleTimeString().substring(0, 5), // Format HH:MM
      };
      setMessages([...messages, newMessage]);
      setMessage('');

      // Simuler une réponse du chatbot après un court délai
      setTimeout(() => {
        const botResponse = {
          id: String(messages.length + 2),
          text: "Merci pour votre message. Je suis en train de traiter votre demande...",
          sender: 'chatbot',
          time: new Date().toLocaleTimeString().substring(0, 5),
        };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  const handleAttachFile = () => {
    Alert.alert('Attacher fichier', 'Fonctionnalité d\'attachement de fichier.');
  };

  const handleSendAudio = () => {
    // Naviguer vers l'écran de vocalisation si l'utilisateur clique sur le micro
    navigation.navigate('voiceChatScreen'); // Nom de l'écran que j'ai créé précédemment pour la vocalisation
  };

  const handleCamera = () => {
    Alert.alert('Appareil photo', 'Fonctionnalité de prise de photo.');
  };

  const MessageBubble = ({ msg }) => {
    const isMe = msg.sender === 'me';
    return (
      <View style={[styles.messageBubble, isMe ? styles.myMessageBubble : styles.otherMessageBubble]}>
        <Text style={isMe ? styles.myMessageText : styles.otherMessageText}>{msg.text}</Text>
        <Text style={isMe ? styles.myMessageTime : styles.otherMessageTime}>{msg.time}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header de la discussion */}
      <View style={[styles.chatHeader, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color="#228B22" />
        </TouchableOpacity>
        <Image
          //source={require('../assets/chatbot_avatar.png')} // Assurez-vous d'avoir une image d'avatar pour le chatbot
          style={styles.chatbotAvatarHeader}
        />
        <Text style={styles.chatHeaderTitle}>Chatbot Health</Text>
        <View style={styles.chatHeaderActions}>
          {/* Vous pouvez ajouter des icônes pour des actions spécifiques au chatbot ici si nécessaire */}
        </View>
      </View>

      {/* Zone de discussion */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top + 60 : 0}
      >
        <ScrollView ref={scrollViewRef} contentContainerStyle={styles.messagesContainer}>
          {messages.map(msg => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
        </ScrollView>

        {/* Barre d'entrée de message */}
        <View style={styles.inputBarContainer}>
          <TouchableOpacity onPress={handleAttachFile} style={styles.inputBarIcon}>
            <Icon name="attach-outline" size={24} color="gray" />
          </TouchableOpacity>
          <TextInput
            style={styles.messageInput}
            placeholder="Écrire un message..."
            placeholderTextColor="#A9A9A9"
            value={message}
            onChangeText={setMessage}
            multiline
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          />
          {message.trim() === '' ? (
            // Si le champ de message est vide, afficher le bouton du microphone
            <TouchableOpacity onPress={handleSendAudio} style={styles.inputBarIcon}>
              <MaterialCommunityIcons name="microphone-outline" size={24} color="gray" />
            </TouchableOpacity>
          ) : (
            // Si le champ de message contient du texte, afficher le bouton d'envoi
            <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
              <Icon name="send-outline" size={24} color="white" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleCamera} style={styles.inputBarIcon}>
            <Icon name="camera-outline" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 15,
  },
  chatbotAvatarHeader: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#E0E0E0', // Placeholder si l'image n'est pas trouvée
  },
  chatHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#228B22',
    flex: 1,
  },
  chatHeaderActions: {
    flexDirection: 'row',
  },
  messagesContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  myMessageBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#66BB6A', // Vert pour mes messages
  },
  otherMessageBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F8FF', // Bleu très clair pour les messages du chatbot
  },
  myMessageText: {
    color: 'white',
    fontSize: 15,
  },
  otherMessageText: {
    color: 'black',
    fontSize: 15,
  },
  myMessageTime: {
    alignSelf: 'flex-end',
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 5,
  },
  otherMessageTime: {
    alignSelf: 'flex-end',
    fontSize: 10,
    color: 'gray',
    marginTop: 5,
  },
  inputBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: 'white',
  },
  inputBarIcon: {
    padding: 8,
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    minHeight: 40,
    maxHeight: 120, // Limite la hauteur de l'input multi-ligne
    marginHorizontal: 5,
    fontSize: 16,
    color: 'black',
  },
  sendButton: {
    backgroundColor: '#66BB6A',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
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