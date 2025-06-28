import { StyleSheet } from "react-native";
import {View, Text, TextInput} from "react-native";

const Formfield = ({ label, value, onChangeText, placeholder, secureTextEntry = false }) => {
  return (
    <View >
      <Text style={ styles.inputLabel }>{label}</Text>
      <TextInput
        style={ styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    inputLabel: {
        fontSize: 16,
        fontWeight:'bold',
        color: 'black',
        marginBottom: 8,
        marginTop: 15, 
    },
    input: {
        height: 50,
        width: '100%',
        backgroundColor: '#F0F8FF', // Un bleu très clair pour le fond des inputs
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        color: 'black',
    },
});

export default Formfield;