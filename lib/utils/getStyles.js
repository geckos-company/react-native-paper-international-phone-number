import { Platform } from "react-native";

import styles from "../styles";

export function getContainerStyle(theme, containerStyle) {
  // return [
  //   theme === "dark"
  //     ? {
  //         ...styles.darkContainer,
  //         backgroundColor: disabled
  //           ? "#858585"
  //           : styles.darkContainer.backgroundColor,
  //       }
  //     : {
  //         ...styles.lightContainer,
  //         backgroundColor: disabled
  //           ? "#E3E3E3"
  //           : styles.lightContainer.backgroundColor,
  //       },
  //   containerStyle ? containerStyle : {},
  // ];
  return [
    {
      ...styles.container,
      backgroundColor: theme.background,
    },
    containerStyle ? containerStyle : {},
  ];
}

export function getFlagContainerStyle(theme, flagContainerStyle) {
  return [styles.flagButton, flagContainerStyle ? flagContainerStyle : {}];
}

export function getFlagStyle(flagStyle) {
  return [styles.flag, flagStyle ? flagStyle : {}];
}

export function getCaretStyle(theme, caretStyle, disabled) {
  return [
    styles.caret,
    {
      borderTopColor:
        caretStyle?.color !== undefined
          ? caretStyle?.color
          : disabled
          ? theme.colors.disabled
          : theme.colors.onBackground,
    },
    caretStyle?.fontSize !== undefined
      ? { borderWidth: caretStyle?.fontSize * 0.45 }
      : {},
    caretStyle && caretStyle?.display === "none"
      ? { display: "none", borderWidth: 0 }
      : {},
  ];
}

export function getInputStyle(inputStyle) {
  return [styles.input, inputStyle ? inputStyle : {}];
}

export function getCountryPickerStyle(theme, height, modalStyle) {
  const themeStyle = {
    ...styles.countryPicker,
    modal: {
      backgroundColor: theme.colors.surface,
    },
    backdrop: {
      backgroundColor: theme.colors.backdrop
    },
    textInput: {
      ...styles.countryPicker.textInput,
      borderColor: theme.colors.outline,
      backgroundColor: theme.colors.surfaceVariant,
      color: theme.colors.onSurfaceVariant
    },
    countryButtonStyles: {
      ...styles.countryPicker.countryButtonStyles,
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.outline,
    },
  };

  const countryPickerStyle = {
    ...themeStyle,
    modal: [
      {
        ...themeStyle.modal,
      },
      { height: height || "50%" },
      Platform.OS === "web"
        ? { padding: 25, borderRadius: 15, margin: "auto" }
        : {},
      { ...modalStyle?.modal },
    ],
    backdrop: { ...themeStyle.backdrop, ...modalStyle?.backdrop },
    textInput: {
      ...themeStyle.textInput,
      ...modalStyle?.searchInput,
    },
    line: { ...themeStyle.line, ...modalStyle?.divider },
    itemsList: {
      ...themeStyle.itemsList,
      ...modalStyle?.countriesList,
    },
    countryButtonStyles: {
      ...themeStyle.countryButtonStyles,
      ...modalStyle?.countryButton,
    },
    countryMessageContainer: {
      ...themeStyle.countryMessageContainer,
      ...modalStyle?.noCountryContainer,
    },
    searchMessageText: {
      ...themeStyle.searchMessageText,
      ...modalStyle?.noCountryText,
    },
    flag: { ...themeStyle.flag, ...modalStyle?.flag },
    dialCode: { ...themeStyle.dialCode, ...modalStyle?.callingCode, color: theme.colors.onSurface },
    countryName: {
      ...themeStyle.countryName,
      ...modalStyle?.countryName,
      color: theme.colors.onSurface
    },
  };

  return countryPickerStyle;
}
