import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Octicons";

const DoneComponent = ({
  id,
  title,
  date,
  description,
  labels,
  onDelete,
  onTap,
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
    <TouchableOpacity style={styles.doneComponent} onPress={() => onTap(id)}>
      <View style={{ alignSelf: "stretch" }}>
        <View style={styles.taskHeader}>
          <Text numberOfLines={2} style={styles.titleText}>
            {title}
          </Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>
        <Text numberOfLines={2} style={styles.descriptionText}>
          {description}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.iconButton,
              { backgroundColor: "#EB5757", marginRight: 12 },
            ]}
            onPress={() => onDelete(id)}
          >
            <Icon name="x" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  doneComponent: {
    borderRadius: 16,
    backgroundColor: "#E8E8E8",
    padding: 12,
    marginTop: 16,
    alignItems: "center",
    overflow: "hidden",
  },
  titleText: {
    flex: 1,
    textAlign: "left",
    color: "#1C1C1C",
    fontWeight: "800",
    lineHeight: 21,
    fontSize: 14,
  },
  descriptionText: {
    textAlign: "left",
    color: "#8B8B8B",
    fontWeight: "600",
    lineHeight: 21,
    fontSize: 14,
  },
  taskHeader: {
    flexDirection: "row",
    width: 325,
  },
  dateText: {
    color: "#8B8B8B",
    alignSelf: "stretch",
    lineHeight: 18,
    fontSize: 12,
    textAlign: "left",
    fontWeight: "600",
  },
  labelText: {
    fontSize: 12,
    textAlign: "left",
    fontWeight: "600",
    color: "#FFFFFF",
  },
  labelView: {
    backgroundColor: "#F2994A",
    marginLeft: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  labelList: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    height: 24,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  iconButton: {
    justifyContent: "center",
    width: 56,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
  },
});

export default DoneComponent;
