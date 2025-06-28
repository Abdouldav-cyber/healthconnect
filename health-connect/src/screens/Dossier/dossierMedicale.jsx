// src/screens/MedicalRecordsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Composant réutilisable pour une section d'un dossier médical
const MedicalRecordSection = ({ title, items, observationText }) => {
  const [expanded, setExpanded] = useState(false);

  // Détermine si le bouton "plus..." doit être affiché
  const showExpandButton = (items && items.length > 3) || observationText;
  const displayItems = items && !expanded ? items.slice(0, 3) : items;

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {showExpandButton && (
          <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.expandButton}>
            <Text style={styles.expandButtonText}>plus...</Text>
            <Icon
              name={expanded ? "chevron-up-outline" : "chevron-down-outline"}
              size={18}
              color="#66BB6A"
            />
          </TouchableOpacity>
        )}
      </View>
      {observationText ? (
        <Text style={styles.observationText}>{observationText}</Text>
      ) : (
        <View style={styles.itemsContainer}>
          {displayItems && displayItems.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <View style={styles.bulletPoint} />
              <Text style={styles.itemText}>{item}</Text>
            </View>
          ))}
          {items && expanded && items.slice(3).map((item, index) => (
            <View key={`extra-${index}`} style={styles.itemRow}>
              <View style={styles.bulletPoint} />
              <Text style={styles.itemText}>{item}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

// Composant pour une fiche de dossier médical complète
const MedicalRecordCard = ({ record }) => {
  return (
    <View style={styles.card}>
      {/* Date, Hôpital, Docteur */}
      <View style={styles.cardHeader}>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>{record.date}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>{record.hospital}</Text>
          <Icon name="chevron-down-outline" size={16} color="white" style={{ marginLeft: 5 }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>{record.doctor}</Text>
          <Icon name="chevron-down-outline" size={16} color="white" style={{ marginLeft: 5 }} />
        </TouchableOpacity>
      </View>

      {/* N°, Type, ID */}
      <View style={styles.cardInfoRow}>
        <TouchableOpacity style={styles.infoButton}>
          <Text style={styles.infoButtonText}>N°{record.number}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoButton}>
          <Text style={styles.infoButtonText}>{record.type}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoButton}>
          <Text style={styles.infoButtonText}>ID: {record.id}</Text>
        </TouchableOpacity>
      </View>

      <MedicalRecordSection title="Motifs" items={record.motifs} />
      <MedicalRecordSection title="Soins" items={record.soins} />
      <MedicalRecordSection title="Médicaments" items={record.medications} />
      <MedicalRecordSection title="Observations" observationText={record.observations} />
    </View>
  );
};

export default function MedicalRecordsScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  // Données de dossiers médicaux simulées
  const medicalRecordsData = [
    {
      date: '28/04/2023',
      hospital: 'Hopital Yalgado O',
      doctor: 'Dr KOUMA',
      number: '2',
      type: 'Radiologie',
      id: '23546789',
      motifs: ['Maux de tete', 'Fièvre', 'Mal poitrine', 'Vomissements', 'Perte appétit'],
      soins: ['Prise poids', 'Prise temps', 'Cathétaire', 'Prise sang', 'Mal de gorge'],
      medications: ['epharalgan 200', 'Artéméther', 'Cypro', 'Paracétamol', 'Lumefantrine'],
      observations: 'A l\'issu de cette consultation veuiller poursuivre le traitement et faire un examen de sang que vous m\'enverrez et surtout pratiquer assez de sport.',
    },
    {
      date: '15/03/2023',
      hospital: 'Clinique Internationale',
      doctor: 'Dr TRAORÉ',
      number: '1',
      type: 'Générale',
      id: '12345678',
      motifs: ['Fatigue intense', 'Douleurs musculaires'],
      soins: ['Repos complet', 'Hydratation'],
      medications: ['Vitamine C', 'Analgésique'],
      observations: 'Le patient présente des signes de surmenage. Recommandation : réduire le stress et améliorer le sommeil.',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-outline" size={24} color="#228B22" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dossier Médical</Text>
      </View>

      {/* Contenu principal défilant */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {medicalRecordsData.map((record, index) => (
          <MedicalRecordCard key={index} record={record} />
        ))}
      </ScrollView>

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
        <TouchableOpacity style={styles.navBarItem} onPress={() => console.log('Dossier actif')}>
          <Icon name="documents-outline" size={24} color="#66BB6A" /> {/* Active icon for Dossier */}
          <Text style={[styles.navBarText, { color: '#66BB6A' }]}>Dossier</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarItem} onPress={() => navigation.navigate('botHome')}>
          <MaterialCommunityIcons name="robot-outline" size={24} color="gray" />
          <Text style={styles.navBarText}>Chatbot</Text>
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
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 20, // Espace pour la barre de navigation
  },
  card: {
    backgroundColor: '#F0F8FF', // Bleu très clair
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  headerButton: {
    backgroundColor: '#66BB6A', // Vert
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoButton: {
    backgroundColor: '#D3D3D3', // Gris clair
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  infoButtonText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#66BB6A', // Vert
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expandButtonText: {
    color: '#66BB6A',
    fontSize: 14,
    marginRight: 5,
  },
  itemsContainer: {
    paddingLeft: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#66BB6A', // Vert
    marginRight: 8,
  },
  itemText: {
    fontSize: 14,
    color: 'black',
  },
  observationText: {
    fontSize: 14,
    color: 'black',
    lineHeight: 20,
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