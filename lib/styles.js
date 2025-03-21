import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  flagButton: {
    justifyContent: "center",
    height: "100%",
    paddingRight: 20,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    color: "#FFFFFF",
    fontSize: 20,
    marginRight: 6,
    fontFamily:
      Platform.OS === "web"
        ? navigator?.userAgent?.includes("Win")
          ? "TwemojiMozilla"
          : "System"
        : "System",
  },
  caret: {
    width: 0,
    height: 0,
    borderWidth: 7,
    borderBottomWidth: 0,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  flagText: {
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    flex: 1,
    fontSize: 16,
  },

  countryPicker: {
    line: {
      backgroundColor: "transparent",
    },
    itemsList: {},
    textInput: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#AAAAAA",
      backgroundColor: "#FFFFFF",
      paddingHorizontal: 12,
      height: 46,
    },
    countryButtonStyles: {
      borderWidth: 1,
      borderColor: "#AAAAAA",
      marginVertical: 4,
      paddingVertical: 0,
    },
    searchMessageText: {},
    countryMessageContainer: {},
    flag: {
      color: "#FFFFFF",
      fontSize: 20,
      fontFamily:
        Platform.OS === "web"
          ? navigator?.userAgent?.includes("Win")
            ? "TwemojiMozilla"
            : "System"
          : "System",
    },
    dialCode: {},
    countryName: {},
  },
});

export default styles;
