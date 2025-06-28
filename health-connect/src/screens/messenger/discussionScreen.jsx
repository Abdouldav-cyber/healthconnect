// src/screens/ChatScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Image,
  KeyboardAvoidingView, // Pour gérer le clavier
  Platform, // Pour la gestion de la plateforme
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'; //
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Pour l'icône de microphone/audio

export default function ChatScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const { doctorName, doctorImage } = route.params // Récupérer le nom et l'image du docteur depuis la navigation
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef();

  // Messages simulés pour la discussion
  const [messages, setMessages] = useState([
    { id: '1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', sender: 'other', time: '09:00' },
    { id: '2', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', sender: 'me', time: '09:30' },
    { id: '3', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', sender: 'other', time: '09:42' },
    { id: '4', text: 'Bienvenue au Dr Zoundi...', sender: 'me', time: '09:50' },
    { id: '5', text: 'Lorem ipsum dolor sit amet.', sender: 'other', time: '09:50' },
    { id: '6', text: 'Lorem ipsum dolor sit amet.', sender: 'me', time: '09:50' },
    // Simulation d'un message audio
    { id: '7', type: 'audio', sender: 'other', time: '09:50', duration: '0:08' },

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
    }
  };

  const handleAttachFile = () => {
    Alert.alert('Attacher fichier', 'Fonctionnalité d\'attachement de fichier.');
  };

  const handleSendAudio = () => {
    Alert.alert('Audio', 'Fonctionnalité d\'envoi de message audio.');
  };

  const handleCamera = () => {
    Alert.alert('Appareil photo', 'Fonctionnalité de prise de photo.');
  };

  const handleVideoCall = () => {
    Alert.alert('Appel vidéo', 'Lancer un appel vidéo.');
  };

  const handleVoiceCall = () => {
    Alert.alert('Appel vocal', 'Lancer un appel vocal.');
  };

  const MessageBubble = ({ message }) => {
    const isMe = message.sender === 'me';
    if (message.type === 'audio') {
      return (
        <View style={[styles.messageBubble, isMe ? styles.myAudioBubble : styles.otherAudioBubble]}>
          <Icon name="play-circle-outline" size={24} color={isMe ? 'white' : 'black'} />
          <Text style={[styles.audioText, {color: isMe ? 'white' : 'black'}]}>{'--- '} {message.duration}</Text>
        </View>
      );
    }
    return (
      <View style={[styles.messageBubble, isMe ? styles.myMessageBubble : styles.otherMessageBubble]}>
        <Text style={isMe ? styles.myMessageText : styles.otherMessageText}>{message.text}</Text>
        <Text style={isMe ? styles.myMessageTime : styles.otherMessageTime}>{message.time}</Text>
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
          source={{ uri: doctorImage || 'https://via.placeholder.com/40/CCCCCC/FFFFFF?text=DR' }} // Image du docteur dans le header
          style={styles.doctorImageHeader}
        />
        <Text style={styles.chatHeaderTitle}>{doctorName || 'Dr Inconnu'}</Text>
        <View style={styles.chatHeaderActions}>
          <TouchableOpacity onPress={handleVideoCall} style={styles.headerAction}>
            <Icon name="videocam-outline" size={24} color="#228B22" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleVoiceCall} style={styles.headerAction}>
            <Icon name="call-outline" size={24} color="#228B22" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Zone de discussion */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top + 60 : 0} // Ajustement pour l'en-tête
      >
        <ScrollView ref={scrollViewRef} contentContainerStyle={styles.messagesContainer}>
          {messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} />
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
          <TouchableOpacity onPress={handleSendAudio} style={styles.inputBarIcon}>
            <MaterialCommunityIcons name="microphone-outline" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCamera} style={styles.inputBarIcon}>
            <Icon name="camera-outline" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
            <Icon name="send-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Barre de navigation inférieure (réutilisée du Dashboard) */}
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
        <TouchableOpacity style={styles.navBarItem} onPress={() => navigation.navigate('MessagingScreen')}>
          <Icon name="chatbubbles-outline" size={24} color="#66BB6A" /> {/* Active icon for Chat */}
          <Text style={[styles.navBarText, { color: '#66BB6A' }]}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarItem} onPress={() => navigation.navigate('Menu')}>
          <Icon name="menu-outline" size={24} color="gray" />
          <Text style={styles.navBarText}>Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%', 
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
  doctorImageHeader: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
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
  headerAction: {
    marginLeft: 15,
  },
  messagesContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexGrow: 1,
    justifyContent: 'flex-end', // Aligne les messages en bas
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
    backgroundColor: '#F0F8FF', // Bleu très clair pour les messages de l'autre
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
  myAudioBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#66BB6A',
    flexDirection: 'row',
    alignItems: 'center',
  },
  otherAudioBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F8FF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioText: {
    marginLeft: 5,
    fontSize: 15,
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
    backgroundColor: '#F0F8FF', // Fond bleu clair pour l'input de message
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
    backgroundColor: '#66BB6A', // Bouton d'envoi vert
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
    height: 80,
    // Note: Pour une implémentation réelle, la barre de navigation devrait être gérée par React Navigation (Tab Navigator)
    // et ne pas être positionnée absolument comme ceci, sauf si c'est une barre personnalisée.
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