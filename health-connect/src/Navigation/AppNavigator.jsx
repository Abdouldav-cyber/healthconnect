import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Importing screens
import WelcomeApp from '../screens/WelcomeApp';
import AuthHomeScreen from '../screens/Auth/authHome.screen'; 
import RegisterScreen from '../screens/Auth/register.screen'; 
import LoginScreen from '../screens/Auth/login.screen'; // Assuming you have a LoginScreen component
import HomeNavigatorScreen from '../screens/Fonction/HomeNavigator.screen';
import PharmacyListScreen from '../screens/Fonction/pharmacyList.screen';
import MessagingScreen from '../screens/messenger/msgHome'
import ChatScreen from '../screens/messenger/discussionScreen';
import ChatbotScreen from '../screens/chatbot/chatbotHome'
import ChatbotConversationScreen from '../screens/chatbot/vocalChat'
import VoiceChatScreen from '../screens/chatbot/VoiceChat';
import MedicalRecordsScreen from '../screens/Dossier/dossierMedicale';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="welcome" component={WelcomeApp}>
        <Stack.Screen
          name="welcome"
          component={WelcomeApp}
          options={{headerShown: false}} 
        />
        <Stack.Screen
          name="auth"
          component={AuthHomeScreen}
          options={{headerShown: false}} 
        />
        <Stack.Screen
            name="register"  
            component={RegisterScreen}
            options={{headerShown: false}} 
        />
        <Stack.Screen
            name="login"  
            component={LoginScreen}
            options={{headerShown: false}}
        />
        {/* Pour la navigation */}

        <Stack.Screen
            name="home"
            component={HomeNavigatorScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="pharmacyList"
            component={PharmacyListScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name='msg'
            component={MessagingScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name='msgdisc'
            component={ChatScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name='botHome'
            component={ChatbotScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name='chatbot'
            component={ChatbotConversationScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name='voiceChatScreen'
            component={VoiceChatScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name='dossier'
            component={MedicalRecordsScreen}
            options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;