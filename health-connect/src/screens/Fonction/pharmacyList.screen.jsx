import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, FlatList} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import PharmacyCard from '../../components/pharmacyCard.screen';
import { DUMMY_PHARMACIES, categories } from '../../constants/pharmaList';

const PharmacyListScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPharmacies = DUMMY_PHARMACIES.filter(pharmacy => {   
    const matchesSearch = pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        pharmacy.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = pharmacy.type === selectedCategory
    return matchesSearch && matchesCategory;;
});

  const [selectedCategory, setSelectedCategory] = useState('Pharmacies garde');

  const renderCategoryButton = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.selectedCategoryButton,
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === item && styles.selectedCategoryButtonText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Barre de recherche */}
      <View style={[styles.searchBarContainer, { paddingTop: insets.top + 10 }]}>
        <TextInput
          style={styles.searchInput}
          placeholder="Recherchez..."
          placeholderTextColor="#A9A9A9"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Icon name="search-outline" size={24} color="#66BB6A" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterIcon}>
          <Icon name="options-outline" size={24} color="#66BB6A" />
        </TouchableOpacity>
      </View>

      {/* Barre de filtres (catégories) */}
        <View style={styles.filtersContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScrollView}>
            <FlatList
                data={categories}
                renderItem={renderCategoryButton}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
            </ScrollView>
        </View>
    
        {/* Liste des pharmacies */}
      <FlatList
        data={filteredPharmacies}
        renderItem={({ item }) => <PharmacyCard pharmacy={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Barre de navigation inférieure */}
      <View style={[styles.bottomNavBar, { paddingBottom: insets.bottom + 5 }]}>
        <TouchableOpacity style={styles.navBarItem} onPress={() => navigation.navigate('home')}>
          <Icon name="home-outline" size={24} color="#66BB6A" />
          <Text style={styles.navBarText}>Accueil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarItem} onPress={() => console.log('Chat')}>
          <Icon name="chatbubbles-outline" size={24} color="gray" />
          <Text style={styles.navBarText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarItem} onPress={() => navigation.navigate('botHome')}>
          <MaterialCommunityIcons name="robot-outline" size={24} color="gray" />
          <Text style={styles.navBarText}>Chatbot</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarItem} onPress={() => console.log('Dossier actif')}>
          <Icon name="documents-outline" size={24} color="#66BB6A" /> {/* Active icon for Dossier */}
          <Text style={[styles.navBarText, { color: '#66BB6A' }]}>Dossier</Text>
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
  searchBarContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F0F8FF', 
    borderRadius: 10,
    borderWidth:1,
    borderColor: '#66BB6A',
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 14,
  },
  searchIcon: {
    padding: 5,
  },
  filterIcon: {
    padding: 5,
    marginLeft: 5,
  },
  filtersContainer: {
    paddingVertical: 10,
    marginTop:5,
    width: '100%',
    height:60,
    backgroundColor: 'white',
  },
  filtersScrollView: {
    paddingHorizontal: 15,
  },
  categoryButton: {
    backgroundColor: '#FFFFFF', 
    borderRadius: 10,
    borderWidth: 1,
    borderColor:'#228B22',
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  selectedCategoryButton: {
    backgroundColor: '#228B22', // Vert clair pour la sélection
  },
  categoryButtonText: {
    color: '#228B22', // Vert foncé
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedCategoryButtonText: {
    color: 'white',
  },
  listContentContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20, // Pour laisser de l'espace au-dessus de la barre de navigation
  },
  bottomNavBar: {
    flexDirection: 'row',

    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop:15,
    height: 70, // Hauteur fixe de la barre de navigation
    position: 'absolute', // Positionner en bas de l'écran
    bottom: 0,
    left: 0,
    right: 0,
  },
  navBarItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // Pour que chaque élément prenne une part égale de l'espace
  },
  navBarText: {
    fontSize: 10,
    color: 'gray',
    marginTop: 3,
  },
});
export default PharmacyListScreen;