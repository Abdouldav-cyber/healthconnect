import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image, // Pour les icônes dans les cartes (si elles sont des images)
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { categories } from "../../constants/pharmaList";

export default function HomeNavigatorScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Pharmacies garde"); // Catégorie active

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

  const handleSearch = () => {
    Alert.alert("Recherche", `Recherche pour: ${searchQuery}`);
    // Implémentez la logique de recherche ici, potentiellement naviguer vers PharmacyListScreen avec le terme de recherche
  };

  const handleFilter = () => {
    Alert.alert("Filtre", "Ouvrir les options de filtre avancées.");
  };

  // Fonctions de gestion des actions des cartes
  const handleSearchOnMaps = () => {
    Alert.alert("Fonctionnalité", "Redirection vers la recherche sur carte.");
    return navigation.navigate("pharmacyList");
  };

  const handleConsultMedicalRecord = () => {
    Alert.alert("Fonctionnalité", "Accès au dossier médical.");
  };

  const handleLearnMoreMedicalRecord = () => {
    Alert.alert("Fonctionnalité", "En savoir plus sur le dossier médical.");
  };

  const handleMakeDiagnosis = () => {
    Alert.alert("Fonctionnalité", "Lancement du diagnostic IA.");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Barre de recherche */}
      <View
        style={[styles.searchBarContainer, { paddingTop: insets.top + 10 }]}
      >
        <TextInput
          style={styles.searchInput}
          placeholder="Recherchez un centre de santé ou un produit sanitaire..."
          placeholderTextColor="#A9A9A9"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
          <Icon name="search-outline" size={24} color="#66BB6A" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFilter} style={styles.filterIcon}>
          <Icon name="options-outline" size={24} color="#66BB6A" />
        </TouchableOpacity>
      </View>

      {/* Barre de filtres (catégories) */}
      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScrollView}
        >
          {categories.map((item, index) =>
            renderCategoryButton({ item, index })
          )}
        </ScrollView>
      </View>

      {/* Contenu principal (cartes) */}
      <ScrollView
        contentContainerStyle={styles.mainContentScrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Carte "Retrouvez, facilement depuis..." */}
        <View style={[styles.featureCard, styles.mapCard]}>
          <View style={styles.cardIconContainer}>
            {/* Icône de localisation, si c'est une image spécifique dans la maquette, utilisez <Image /> */}
            <Icon name="location-outline" size={80} color="#228B22" />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>
              Retrouvez, facilement depuis vos espaces santé en un clic
            </Text>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={handleSearchOnMaps}
            >
              <Text style={styles.cardButtonText}>Rechercher sur maps</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Carte "Créer un dossier médical..." */}
        <View style={[styles.featureCard, styles.medicalRecordCard]}>
          <View style={styles.cardIconContainer}>
            {/* Icône de documents */}
            <Icon name="documents-outline" size={80} color="white" />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={[styles.cardTitle, styles.whiteText]}>
              Créer un dossier médical pour une prise en charge rapide et
              sécurisée
            </Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.cardButtonOutline}
                onPress={() => navigation.navigate("dossier")}
              >
                <Text style={styles.cardButtonTextOutline}>Consulter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cardButton}
                onPress={handleLearnMoreMedicalRecord}
              >
                <Text style={styles.cardButtonText}>en savoir plus</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Carte "Obtiens un diagnostic rapide..." */}
        <View style={[styles.featureCard, styles.diagnosisCard]}>
          <View style={styles.cardIconContainer}>
            {/* Icône de bulle de discussion / smiley */}
            <MaterialCommunityIcons
              name="robot-outline"
              size={80}
              color="#228B22"
            />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>
              Obtiens un diagnostic rapide basé sur les prédictions de l'IA
            </Text>
            <TouchableOpacity
              style={styles.cardButtonOutline}
              onPress={() => {
                navigation.navigate("msg");
              }}
            >
              <Text style={styles.cardButtonTextOutline}>
                faire un diagnostic
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.featureCard, styles.medicalRecordCard]}>
          <View style={styles.cardIconContainer}>
            {/* Icône de bulle de discussion / smiley */}
            <Icon name="chatbubble-ellipses-outline" size={80} color="#FFFF" />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={[styles.cardTitle, styles.whiteText]}>
              Initié une bonne conversation avec votre Médecin
            </Text>
            <TouchableOpacity
              style={styles.cardButtonOutline}
              onPress={() => {
                navigation.navigate("msg");
              }}
            >
              <Text style={[styles.cardButtonTextOutline, styles.whiteText]}>
                Discuter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Barre de navigation inférieure */}
      <View style={[styles.bottomNavBar, { paddingBottom: insets.bottom + 5 }]}>
        <TouchableOpacity
          style={styles.navBarItem}
          onPress={() => navigation.navigue("home")}
        >
          <Icon name="home-outline" size={24} color="#66BB6A" />
          <Text style={styles.navBarText}>Accueil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBarItem}
          onPress={() => navigation.navigate("msg")}
        >
          <Icon name="chatbubbles-outline" size={24} color="gray" />
          <Text style={styles.navBarText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBarItem}
          onPress={() => navigation.navigate("botHome")}
        >
          <MaterialCommunityIcons
            name="robot-outline"
            size={24}
            color="#66BB6A"
          />{" "}
          {/* Icône active pour Chatbot */}
          <Text style={[styles.navBarText, { color: "#66BB6A" }]}>Chatbot</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBarItem}
          onPress={() => navigation.navigate("dossier")}
        >
          <Icon name="documents-outline" size={24} color="gray" />
          <Text style={styles.navBarText}>Dossier</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchBarContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#F0F8FF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#66BB6A",
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
    marginTop: 5,
    width: "100%",
    height: 60,
    backgroundColor: "white",
  },
  filtersScrollView: {
    paddingHorizontal: 15,
  },
  categoryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#228B22",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  selectedCategoryButton: {
    backgroundColor: "#228B22", // Vert clair pour la sélection
  },
  categoryButtonText: {
    color: "#228B22", // Vert foncé
    fontSize: 14,
    fontWeight: "bold",
  },
  selectedCategoryButtonText: {
    color: "white",
  },
  mainContentScrollView: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 80, // Espace pour la barre de navigation inférieure
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15, // Coins arrondis pour les cartes
    padding: 20,
    marginBottom: 20, // Espace entre les cartes
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mapCard: {
    backgroundColor: "white", // Fond blanc pour la première carte
  },
  medicalRecordCard: {
    backgroundColor: "#66BB6A", // Fond vert pour la deuxième carte
  },
  diagnosisCard: {
    backgroundColor: "white", // Fond blanc pour la troisième carte
  },
  cardIconContainer: {
    width: 80, // Taille fixe pour l'icône
    height: 80,
    borderRadius: 40, // Rendre l'icône circulaire si souhaité, sinon juste un conteneur
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  cardTextContainer: {
    flex: 1, // Prend l'espace restant
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  whiteText: {
    color: "white",
  },
  buttonGroup: {
    flexDirection: "row",
    // justifyContent: 'space-between', // si vous voulez qu'ils s'étalent
    alignItems: "center",
  },
  cardButton: {
    backgroundColor: "#228B22", // Vert foncé pour le bouton principal
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 120, // Largeur minimale pour les boutons
    marginRight: 10, // Espace entre les boutons
  },
  cardButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "semibold",
  },
  cardButtonOutline: {
    backgroundColor: "transparent",
    borderColor: "#228B22", // Bordure verte foncée
    borderWidth: 1.5,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 120,
    marginRight: 10,
  },
  cardButtonTextOutline: {
    color: "#228B22", // Texte vert foncé
    fontSize: 14,
    fontWeight: "bold",
  },
  bottomNavBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    height: 90,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navBarItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  navBarText: {
    fontSize: 10,
    color: "gray",
    marginTop: 3,
  },
});
