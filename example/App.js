import React, { useState } from "react";
import { Platform, View } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  ThemeProvider,
  Text,
} from "react-native-paper";
import PhoneInput from "react-native-paper-international-phone-number";
// import { useFonts } from 'expo-font';

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [inputValue, setInputValue] = useState("");

  React.useEffect(() => {
    if (Platform.OS === "web") {
      useFonts({
        'TwemojiMozilla': require('./assets/fonts/TwemojiMozilla.woff2'),
      });
    }
  }, []);

  function handleInputValue(phoneNumber) {
    setInputValue(phoneNumber);
  }

  function handleSelectedCountry(country) {
    setSelectedCountry(country);
  }

  const theme = MD3DarkTheme;
  // const theme = MD3LightTheme;

  return (
    <ThemeProvider theme={theme}>
      <View
        style={{
          width: "100%",
          flex: 1,
          padding: 24,
          marginTop: "40%",
          backgroundColor: theme.colors.background,
        }}
      >
        <PhoneInput
          value={inputValue}
          onChangePhoneNumber={handleInputValue}
          selectedCountry={selectedCountry}
          onChangeSelectedCountry={handleSelectedCountry}
          label="Phone"
        />
        <View style={{ marginTop: 10 }}>
          <Text>
            Country: {`${selectedCountry?.name?.en} (${selectedCountry?.cca2})`}
          </Text>
          <Text>
            Phone Number: {`${selectedCountry?.callingCode} ${inputValue}`}
          </Text>
        </View>
      </View>
    </ThemeProvider>
  );
}
