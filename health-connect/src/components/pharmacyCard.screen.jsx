// src/components/PharmacyCard.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Pour les icônes
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Pour l'icône de téléphone

export default function PharmacyCard({ pharmacy }) {
  const [isFavorite, setIsFavorite] = useState(false); // État pour le favori
  const [showProducts, setShowProducts] = useState(false); // État pour afficher/masquer les produits
  const [showAssurances, setShowAssurances] = useState(false); // État pour afficher/masquer les assurances

  const handleCall = () => {
    Alert.alert("Appel", `Appel de ${pharmacy.name} au ${pharmacy.phone}`);
    // Ici, vous utiliseriez Linking.openURL(`tel:${pharmacy.phone}`)
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    Alert.alert("Favori", `${pharmacy.name} a été ${isFavorite ? 'retiré des' : 'ajouté aux'} favoris.`);
  };

  const handleItinerary = () => {
    Alert.alert("Itinéraire", `Affichage de l'itinéraire pour ${pharmacy.name}`);
    // Ici, vous utiliseriez Linking.openURL pour ouvrir Google Maps ou autre
    navigation.navigate('PharmaLocationScreen', { pharmacyId: pharmacy.id });
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
          <Text style={styles.pharmacyLocation}>{pharmacy.location}</Text>
        </View>
        <Image source={{ uri: pharmacy.image }} style={styles.pharmacyImage} />
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity onPress={handleCall} style={styles.actionButton}>
            <MaterialCommunityIcons name="phone" size={24} color="#66BB6A" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFavorite} style={styles.actionButton}>
            <Icon name={isFavorite ? "heart" : "heart-outline"} size={24} color="#FF6347" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.detailLabel}>Statut actuel</Text>
        <View style={[styles.statusBadge, pharmacy.status === 'ouvert' ? styles.statusOpen : styles.statusClosed]}>
          <Text style={styles.statusText}>{pharmacy.status}</Text>
        </View>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.detailLabel}>Assurances</Text>
        <TouchableOpacity onPress={() => setShowAssurances(!showAssurances)} style={styles.dropdownToggle}>
          <Text style={styles.dropdownText}>{showAssurances ? 'Masquer' : 'Voir'}</Text>
          <Icon name={showAssurances ? "chevron-up-outline" : "chevron-down-outline"} size={20} color="#228B22" />
        </TouchableOpacity>
      </View>
      {showAssurances && (
        <View style={styles.dropdownContent}>
          {pharmacy.assurances.map((item, index) => (
            <Text key={index} style={styles.dropdownItemText}>- {item}</Text>
          ))}
        </View>
      )}

      <View style={styles.detailsRow}>
        <Text style={styles.detailLabel}>Services</Text>
        <TouchableOpacity onPress={() => setShowProducts(!showProducts)} style={styles.dropdownToggle}>
          <Text style={styles.dropdownText}>{showProducts ? 'Masquer' : 'Voir'}</Text>
          <Icon name={showProducts ? "chevron-up-outline" : "chevron-down-outline"} size={20} color="#228B22" />
        </TouchableOpacity>
      </View>
      {showProducts && (
        <View style={styles.dropdownContent}>
          {pharmacy.products.map((item, index) => (
            <Text key={index} style={styles.dropdownItemText}>- {item}</Text>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.itineraryButton} onPress={handleItinerary}>
        <MaterialCommunityIcons name="google-maps" size={20} color="white" />
        <Text style={styles.itineraryButtonText}>Itinéraire</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E6FFE6', // Vert clair #E6FFE6 comme sur la maquette
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  headerTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#228B22', // Vert foncé
  },
  pharmacyLocation: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  pharmacyImage: {
    width: 100, // Ajuster selon la maquette
    height: 100, // Ajuster selon la maquette
    borderRadius: 8,
    resizeMode: 'cover',
  },
  actionButtonsContainer: {
    position: 'absolute', // Position absolue pour superposer sur l'image
    top: 5,
    right: 5,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  actionButton: {
    backgroundColor: 'rgba(255,255,255,0.7)', // Fond semi-transparent
    borderRadius: 20,
    padding: 5,
    marginBottom: 5,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3', // Gris clair pour la ligne de séparation
  },
  detailLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusOpen: {
    backgroundColor: '#90EE90', // Vert clair pour "ouvert"
  },
  statusClosed: {
    backgroundColor: '#FFB6C1', // Rouge clair pour "fermé" (exemple)
  },
  statusText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  dropdownToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 14,
    color: '#228B22', // Vert pour le texte du dropdown
    marginRight: 5,
  },
  dropdownContent: {
    paddingLeft: 10,
    paddingBottom: 10,
  },
  dropdownItemText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 3,
  },
  itineraryButton: {
    backgroundColor: '#66BB6A', // Vert du bouton Itinéraire
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'flex-end', // Aligner à droite comme sur la maquette
  },
  itineraryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});