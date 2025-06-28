// src/screens/MessagingScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'; //

export default function MessagingScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  // Données de discussions (simulées)
  // Chaque objet représente un médecin avec lequel le patient a eu à traiter.
  const discussions = [
    {
      id: '1',
      name: 'Dr Zoundi',
      lastMessage: 'Non pas le pois...',
      time: '0H54 Aujourd’hui',
      location: 'Ouaga',
      profileImage: 'https://via.placeholder.com/50/A0EEA0/FFFFFF?text=DZ', // Placeholder pour l'image du docteur
      status: 'online', // Pour le point vert
    },
    {
      id: '2',
      name: 'Dr Ahmad',
      lastMessage: 'Venez me voir...',
      time: '19H30 Aujourd’hui',
      location: 'Yalgado',
      profileImage: 'https://via.placeholder.com/50/FFD700/FFFFFF?text=DA',
      status: 'online',
    },
    {
      id: '3',
      name: 'Medecin Yada',
      lastMessage: 'Clinique JBP',
      time: '21H17 Hier',
      location: 'Clinique JBP',
      profileImage: 'https://via.placeholder.com/50/ADD8E6/FFFFFF?text=MY',
      status: 'offline',
    },
    {
      id: '4',
      name: 'Laeticia BOUVU',
      lastMessage: 'Excellent comme...',
      time: '10H21 10/02',
      location: 'Ahmadoya',
      profileImage: 'https://via.placeholder.com/50/FFB6C1/FFFFFF?text=LB',
      status: 'online',
    },
    {
      id: '5',
      name: 'Nipole MABOTO',
      lastMessage: 'Prompt rétablissemen...',
      time: '03H03 03/31',
      location: '',
      profileImage: 'https://via.placeholder.com/50/DDA0DD/FFFFFF?text=NM',
      status: 'online',
    },
    {
      id: '6',
      name: 'Odile NIKIEMA',
      lastMessage: 'Oubliez celà...',
      time: '18H31 03/31',
      location: 'Saint Camille',
      profileImage: 'https://via.placeholder.com/50/C0C0C0/FFFFFF?text=ON',
      status: 'offline',
    },
    {
      id: '7',
      name: 'AS SANDIDI',
      lastMessage: 'Non 22 sonneries...',
      time: '17H31 Aujourd’hui',
      location: 'DMA Sangare',
      profileImage: 'https://via.placeholder.com/50/98FB98/FFFFFF?text=AS',
      status: 'online',
    },
  ];

  const filteredDiscussions = discussions.filter(discussion =>
    discussion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    discussion.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Composant pour une carte de discussion
  const DiscussionCard = ({ discussion }) => (
    <TouchableOpacity
      style={styles.discussionCard}
      onPress={() => navigation.navigate('msgdisc', { doctorName: discussion.name, doctorImage: discussion.profileImage })} // Naviguer vers l'écran de discussion
    >
      <View style={styles.profileStatusContainer}>
        <Image
          source={{ uri: discussion.profileImage }}
          style={styles.cardProfileImage}
        />
        {/* Point de statut en ligne/hors ligne */}
        <View style={[
          styles.statusDot,
          discussion.status === 'online' ? styles.statusOnline : styles.statusOffline
        ]} />
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.cardName}>{discussion.name}</Text>
        <Text style={styles.cardLastMessage}>{discussion.lastMessage}</Text>
      </View>

      <View style={styles.cardRightContent}>
        <Text style={styles.cardTime}>{discussion.time}</Text>
        {discussion.location && <Text style={styles.cardLocation}>{discussion.location}</Text>}
        <Icon name="play-forward-outline" size={24} color="#66BB6A" style={styles.cardPlayIcon} /> {/* Icône de lecture/navigation */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color="#228B22" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messagerie</Text>
      </View>

      {/* Barre de recherche */}
      <View style={styles.searchBarContainer}>
        <Icon name="search-outline" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une discussion"
          placeholderTextColor="#A9A9A9"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Liste des discussions */}
      <ScrollView style={styles.discussionsList}>
        {filteredDiscussions.map(discussion => (
          <TouchableOpacity onPress={()=>navigation.navigue('msgdisc')}>
            <DiscussionCard key={discussion.id} discussion={discussion} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Barre de navigation inférieure */}
      <View style={[styles.bottomNavBar, { paddingBottom: insets.bottom + 5 }]}>
        <TouchableOpacity style={styles.navBarItem} onPress={() => navigation.navigate('home')}>
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
        <TouchableOpacity style={styles.navBarItem} onPress={() => console.log('Chat actif')}>
          <Icon name="chatbubbles-outline" size={24} color="#66BB6A" /> {/* Icône active pour Chat */}
          <Text style={[styles.navBarText, { color: '#66BB6A' }]}>Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%', // Pour s'assurer que le conteneur prend toute la largeur
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
    color: '#228B22',
    flex: 1,
    textAlign: 'center',
    marginLeft: -34, // Compenser le bouton de retour pour le centrage visuel
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8FF', // Bleu très clair comme les inputs
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 45,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  discussionsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  discussionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderColor: '#90EE90', // Bordure verte claire comme sur la maquette
    borderWidth: 1,
  },
  profileStatusContainer: {
    position: 'relative',
    marginRight: 15,
  },
  cardProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  statusOnline: {
    backgroundColor: '#66BB6A', // Vert pour en ligne
  },
  statusOffline: {
    backgroundColor: 'gray', // Gris pour hors ligne (supposition)
  },
  cardContent: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 2,
  },
  cardLastMessage: {
    fontSize: 14,
    color: 'gray',
  },
  cardRightContent: {
    alignItems: 'flex-end',
  },
  cardTime: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 5,
  },
  cardLocation: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 5,
  },
  cardPlayIcon: {
    // Style de l'icône de navigation
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    height: 80,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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