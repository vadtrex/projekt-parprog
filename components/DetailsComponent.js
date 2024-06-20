import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import { BottomSheetView, BottomSheetFooter } from "@gorhom/bottom-sheet";
import DetailsButtons from "./DetailsButtons";

const DetailsComponent = ({
  id,
  title,
  date,
  description,
  labels,
  isDone,
  onDelete,
  onDone,
}) => {
  const getLabelColor = (label) => {
    switch (label) {
      case "Ważne":
        return "#EB5757";
      case "Studia":
        return "#F2994A";
      case "Praca":
        return "#27AE60";
      case "Dom":
        return "#F2C94C";
      case "Spotkanie":
        return "#BB6BD9";
      default:
        return "#00B2FF";
    }
  };

  return (
    <BottomSheetView style={styles.detailsComponent}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.titleText}>{title}</Text>
        <View style={{ alignSelf: "center", alignContent: "center" }}>
          {labels.length === 0 ? (
            <View />
          ) : (
            <View style={styles.labelList}>
              {labels.map((label, index) => (
                <View
                  key={index}
                  style={[
                    styles.labelView,
                    {
                      backgroundColor: getLabelColor(label),
                      marginLeft: index === 0 ? 0 : 8,
                    },
                  ]}
                >
                  <Text style={styles.labelText}>{label}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        <View style={{ width: "100%", alignSelf: "center" }}>
          <View style={styles.headerRow}>
            <Icon name="calendar" size={24} color="#1C1C1C" />
            <Text style={styles.sectionHeaderText}>Termin wykonania</Text>
          </View>
          <Text style={styles.dateText}>{isDone ? "Zrobione!" : date}</Text>
          <View style={styles.headerRow}>
            <Icon name="info" size={24} color="#1C1C1C" />
            <Text style={styles.sectionHeaderText}>Opis</Text>
          </View>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      </ScrollView>
      <DetailsButtons
        id={id}
        onDelete={onDelete}
        isDone={isDone}
        onDone={onDone}
      />
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  detailsComponent: {
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
  },
  titleText: {
    textAlign: "center",
    color: "#1C1C1C",
    fontWeight: "800",
    fontSize: 42,
  },
  descriptionText: {
    textAlign: "left",
    color: "#8B8B8B",
    fontWeight: "600",
    fontSize: 24,
    marginTop: 12,
  },
  sectionHeaderText: {
    color: "#1C1C1C",
    fontWeight: "700",
    fontSize: 24,
    marginLeft: 12,
  },
  dateText: {
    color: "#8B8B8B",
    alignSelf: "stretch",
    fontSize: 24,
    fontWeight: "600",
    marginTop: 12,
  },
  labelText: {
    fontSize: 16,
    textAlign: "left",
    fontWeight: "600",
    color: "#FFFFFF",
  },
  labelView: {
    backgroundColor: "#F2994A",
    marginLeft: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  labelList: {
    marginTop: 4,
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    height: 48,
  },
  buttonsView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "12",
  },
  buttonContainer: {
    flexDirection: "row",
    borderRadius: 16,
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
    marginLeft: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
});

export default DetailsComponent;
