import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Octicons";

const DetailsButtons = ({ id, onDelete, onDone, isDone }) => {
  return (
    <View style={styles.buttonsView}>
      <TouchableOpacity
        style={[styles.buttonContainer, { backgroundColor: "#EB5757" }]}
        onPress={() => onDelete(id)}
      >
        <Icon name="x" size={24} color="#FFFFFF" />
        <Text style={styles.buttonText}>Usuń</Text>
      </TouchableOpacity>
      {isDone ? (
        <View />
      ) : (
        <TouchableOpacity
          style={[styles.buttonContainer, { backgroundColor: "#27AE60" }]}
          onPress={() => onDone(id)}
        >
          <Icon name="check" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Zrobione</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsView: {
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Platform.OS === "android" ? 64 : 32,
    paddingTop: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    borderRadius: 32,
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
    marginLeft: 12,
  },
});

export default DetailsButtons;
