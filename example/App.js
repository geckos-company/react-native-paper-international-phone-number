import React, { useState } from "react";
import { Platform, View } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  ThemeProvider,
  Text,
  TextInput,
} from "react-native-paper";
// import PhoneInput from "react-native-paper-international-phone-number";
import PhoneInput from "./lib";
import { getLocales } from "expo-localization";
// import { useFonts } from "expo-font";

export default function App() {
  const [defaultCountry, setDefaultCountry] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (false) {
      // DeviceCountry.getCountryCode()
      //   .then(function (country) {
      //     console.log(country);
      //     setDefaultCountry(country.code.toUpperCase());
      //   })
      //   .catch(e => {
      //     console.log(e);
      //   });
      const locales = getLocales();
      console.log(locales);
      setDefaultCountry(locales[0].regionCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (inputValue) {
      console.log(`${selectedCountry?.callingCode} ${inputValue}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, inputValue]);

  const handleInputValue = (phoneNumber) => {
    setInputValue(phoneNumber);
  };

  const handleSelectedCountry = (country) => {
    setSelectedCountry(country);
  };

  React.useEffect(() => {
    console.log(ref.current.isFocused());
    if (ref.current) {
      setTimeout(() => ref.current.forceFocus(), 250);
      // ref.current.clear();   d
    }
  }, [ref.current]);

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
        <TextInput
          mode="outlined"
          label={"text"}
          // ref={ref}
          style={{ marginBottom: 8 }}
        />
        {/* <PhoneInput
          value={inputValue}
          onChangePhoneNumber={handleInputValue}
          selectedCountry={selectedCountry}
          onChangeSelectedCountry={handleSelectedCountry}
          label="Phone"
        /> */}
        <PhoneInput
          inputRef={ref}
          defaultValue={"+261320000000"}
          defaultCountry={defaultCountry}
          // phoneInputStyles={{ input: style }}
          // value={
          //   inputValue || value?.replace(selectedCountry?.callingCode, '').trim()
          // }
          value={inputValue}
          onChangePhoneNumber={handleInputValue}
          selectedCountry={selectedCountry}
          onChangeSelectedCountry={handleSelectedCountry}
          // returnKeyType="next"
          language={"fr"}
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
