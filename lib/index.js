import React, { useEffect, useState, useRef, forwardRef } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";
import {
  CountryPicker,
  CountryButton,
} from "react-native-country-codes-picker";

import getInputMask from "./utils/getInputMask";
import getAllCountries from "./utils/getAllCountries";
import getCountriesByName from "./utils/getCountriesByName";
import getCountriesByCallingCode from "./utils/getCountriesByCallingCode";
import getCountryByCca2 from "./utils/getCountryByCca2";
import getCountryByPhoneNumber from "./utils/getCountryByPhoneNumber";
import {
  getCountryNotFoundMessage,
  getSearchInputPlaceholder,
} from "./utils/getPlaceholders";
import {
  getCaretStyle,
  getContainerStyle,
  getCountryPickerStyle,
  getFlagContainerStyle,
  getFlagStyle,
  getInputStyle,
} from "./utils/getStyles";

const PhoneInput = forwardRef(
  (
    {
      theme: themeOverrides,
      language,
      placeholder,
      label,
      placeholderTextColor,
      selectionColor,
      phoneInputStyles,
      modalStyles,
      disabled,
      modalDisabled,
      modalHeight,
      defaultCountry,
      defaultValue,
      onChangePhoneNumber,
      selectedCountry,
      onChangeSelectedCountry,
      customMask,
      showOnly,
      excludedCountries,
      popularCountries,
      modalSearchInputPlaceholder,
      modalSearchInputPlaceholderTextColor,
      modalSearchInputSelectionColor,
      modalNotFoundCountryMessage,
      customCaret,
      inputRef,
      ...rest
    },
    ref
  ) => {
    const [show, setShow] = useState(false);
    const [defaultCca2, setDefaultCca2] = useState("");
    const [inputValue, setInputValue] = useState(null);
    const [countryValue, setCountryValue] = useState(null);

    const textInputRef = inputRef !== undefined ? inputRef : useRef(null);
    const theme = useTheme(themeOverrides);

    const refBase = {
      ...textInputRef.current,
      onFocus: textInputRef.current?.focus,
      focus: textInputRef.current?.focus,
      getValue: () => inputValue,
      value: inputValue,
      getFullPhoneNumber: () => `${countryValue?.callingCode} ${inputValue}`,
      fullPhoneNumber: `${countryValue?.callingCode} ${inputValue}`,
      getSelectedCountry: () => countryValue,
      selectedCountry: countryValue,
      props: {
        theme,
        language,
        placeholder,
        placeholderTextColor,
        selectionColor,
        phoneInputStyles,
        modalStyles,
        disabled,
        modalDisabled,
        modalHeight,
        defaultCountry,
        defaultValue,
        onChangePhoneNumber,
        selectedCountry,
        onChangeSelectedCountry,
        customMask,
        showOnly,
        excludedCountries,
        popularCountries,
        modalSearchInputPlaceholder,
        modalSearchInputPlaceholderTextColor,
        modalSearchInputSelectionColor,
        modalNotFoundCountryMessage,
        customCaret,
        ...rest,
      },
    };

    function updateRef(phoneNumber, country) {
      if (ref) {
        ref.current = {
          ...refBase,
          getValue: () => phoneNumber,
          value: phoneNumber,
          getFullPhoneNumber: () => `${country?.callingCode} ${phoneNumber}`,
          fullPhoneNumber: `${country?.callingCode} ${phoneNumber}`,
          getSelectedCountry: () => country,
          selectedCountry: country,
          props: {
            ...refBase.props,
            value: phoneNumber,
            selectedCountry: country,
          },
        };
      }
    }

    function onSelect(country) {
      setShow(false);

      if (ref) {
        setInputValue("");
      } else {
        onChangePhoneNumber("");
      }

      if (onChangeSelectedCountry || ref) {
        const newValue = {
          name: country.name,
          cca2: country.code,
          flag: country.flag,
          callingCode: country.dial_code,
        };

        if (ref) {
          setCountryValue(newValue);
          updateRef("", newValue);
        } else {
          onChangeSelectedCountry(newValue);
        }
      }
    }

    function onChangeText(phoneNumber, callingCode) {
      if (phoneNumber.includes("+")) {
        const matchingCountry = getCountryByPhoneNumber(phoneNumber);

        if (matchingCountry) {
          setDefaultCca2(matchingCountry.cca2);

          if (ref) {
            setCountryValue(matchingCountry);
            updateRef("", matchingCountry);
          } else {
            onChangeSelectedCountry(matchingCountry);
          }

          onChangeText(
            phoneNumber.replace(matchingCountry.callingCode, ""),
            null
          );
        }

        return;
      }

      const res = getInputMask(
        phoneNumber,
        callingCode ? callingCode : countryValue?.callingCode,
        countryValue?.cca2,
        customMask ? customMask : null
      );

      if (ref) {
        setInputValue(res);
        updateRef(res, countryValue);
      } else {
        onChangePhoneNumber(res);
      }
    }

    useEffect(() => {
      if (!countryValue && !defaultCountry) {
        const defaultCountry = getCountryByCca2("BR");

        if (ref) {
          setCountryValue(defaultCountry);
          updateRef("", defaultCountry);
        } else {
          onChangeSelectedCountry(defaultCountry);
        }
      } else {
        if (ref) {
          updateRef("", countryValue);
        }
      }
    }, []);

    useEffect(() => {
      if (defaultCountry) {
        if (ref) {
          setCountryValue(getCountryByCca2(defaultCountry));
          updateRef("", getCountryByCca2(defaultCountry));
        } else {
          onChangeSelectedCountry(getCountryByCca2(defaultCountry));
        }
      }
    }, [defaultCountry]);

    useEffect(() => {
      if (ref) {
        setInputValue("");
      } else {
        onChangePhoneNumber("");
      }

      if (defaultValue) {
        const matchingCountry = getCountryByPhoneNumber(defaultValue);

        if (matchingCountry) {
          setDefaultCca2(matchingCountry.cca2);

          if (ref) {
            setCountryValue(matchingCountry);
            updateRef("", matchingCountry);
          } else {
            onChangeSelectedCountry(matchingCountry);
          }
        } else {
          setDefaultCca2(null);

          if (ref) {
            setCountryValue(null);
            updateRef("", null);
          } else {
            onChangeSelectedCountry(null);
          }

          onChangeText("", null);

          console.warn(
            "The default number provided (defaultValue) don't match with anyone country. Please, correct it to be shown in the input. For more information: https://github.com/AstrOOnauta/react-native-international-phone-number#intermediate-usage---typescript--default-phone-number-value"
          );
        }
      }
    }, [defaultValue]);

    useEffect(() => {
      if (
        defaultValue &&
        countryValue &&
        countryValue.cca2 === defaultCca2 &&
        !inputValue
      ) {
        const callingCode = countryValue.callingCode;

        let phoneNumber = defaultValue;

        if (
          callingCode === "+1" &&
          countryValue.cca2 !== "CA" &&
          countryValue.cca2 !== "US"
        ) {
          phoneNumber = defaultValue
            .replace(/\s/g, "")
            .substring(
              callingCode.length + 3,
              defaultValue.replace(/\D/g, "").length + callingCode.length
            );
        } else {
          phoneNumber = defaultValue
            .replace(/\s/g, "")
            .substring(
              callingCode.length,
              defaultValue.replace(/\D/g, "").length + callingCode.length
            );
        }
        onChangeText(phoneNumber, callingCode);
      }
    }, [countryValue]);

    useEffect(() => {
      if (!ref) {
        setInputValue(rest.value);
        setCountryValue(selectedCountry);
      }
    }, [selectedCountry]);

    if (
      ref &&
      (rest.value ||
        onChangePhoneNumber ||
        selectedCountry ||
        onChangeSelectedCountry)
    ) {
      throw new Error(
        "Error: Don't use the useRef hook combined with the useState hook to manage the phoneNumber and selectedCountry values. Instead, choose to use just one of them (useRef or useState)."
      );
    } else {
      return (
        <>
          <View style={getContainerStyle(theme, phoneInputStyles?.container)}>
            <TouchableOpacity
              activeOpacity={disabled || modalDisabled ? 1 : 0.6}
              onPress={() => (disabled || modalDisabled ? null : setShow(true))}
              style={getFlagContainerStyle(
                theme,
                phoneInputStyles?.flagContainer
              )}
            >
              <Text style={getFlagStyle(phoneInputStyles?.flag)}>
                {countryValue?.flag}
              </Text>
              {customCaret || (
                <View style={phoneInputStyles?.caret}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      paddingTop: 4,
                    }}
                  >
                    <View
                      style={getCaretStyle(
                        theme,
                        phoneInputStyles?.caret,
                        disabled
                      )}
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
            <TextInput
              mode="outlined"
              left={<TextInput.Affix text={countryValue?.callingCode} />}
              style={getInputStyle(phoneInputStyles?.input)}
              label={label}
              placeholder={placeholder}
              editable={!disabled}
              value={inputValue}
              onChangeText={onChangeText}
              keyboardType="numeric"
              ref={textInputRef}
              {...rest}
            />
          </View>
          {!disabled && !modalDisabled && show ? (
            <CountryPicker
              show={show}
              lang={language}
              inputPlaceholder={
                modalSearchInputPlaceholder ||
                getSearchInputPlaceholder(language || "en")
              }
              inputPlaceholderTextColor={
                modalSearchInputPlaceholderTextColor || theme.colors.placeholder
              }
              selectionColor={
                modalSearchInputSelectionColor || theme.colors.tertiaryContainer
              }
              searchMessage={
                modalNotFoundCountryMessage ||
                getCountryNotFoundMessage(language || "en")
              }
              enableModalAvoiding
              style={getCountryPickerStyle(theme, modalHeight, modalStyles)}
              pickerButtonOnPress={onSelect}
              onBackdropPress={() => setShow(false)}
              showOnly={showOnly}
              excludedCountries={excludedCountries}
              popularCountries={popularCountries}
              ListHeaderComponent={({ countries, lang, onPress }) => {
                return countries.map((country, index) => {
                  return (
                    <CountryButton
                      key={index}
                      item={country}
                      name={country?.name?.[lang || "en"]}
                      onPress={() => onPress(country)}
                      style={getCountryPickerStyle(
                        theme,
                        modalHeight,
                        modalStyles
                      )}
                    />
                  );
                });
              }}
            />
          ) : null}
        </>
      );
    }
  }
);

export default PhoneInput;

export {
  getAllCountries,
  getCountryByPhoneNumber,
  getCountryByCca2,
  getCountriesByCallingCode,
  getCountriesByName,
};
