import {Text, StyleSheet, Icon} from 'react-native'

const BottomBar = ({navigation}) => {

    return(
        <View style={[styles.bottomNavBar, { paddingBottom: insets.bottom + 5 }]}>
            <TouchableOpacity style={styles.navBarItem} onPress={() => console.log('Accueil')}>
                <Icon name="home-outline" size={24} color="#66BB6A" />
                <Text style={styles.navBarText}>Accueil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navBarItem} onPress={() => console.log('Chat')}>
                <Icon name="chatbubbles-outline" size={24} color="gray" />
                <Text style={styles.navBarText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navBarItem} onPress={() => console.log('Profil')}>
                <Icon name="person-outline" size={24} color="gray" />
                <Text style={styles.navBarText}>Profil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navBarItem} onPress={() => navigation.navigate('MedicalRecords')}>
                <Icon name="documents-outline" size={24} color="gray" />
                <Text style={styles.navBarText}>Dossier</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    height: 90,
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
})