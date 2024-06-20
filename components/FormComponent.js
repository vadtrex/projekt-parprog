import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import FormButtons from "./FormButtons";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { ScrollView } from "react-native-gesture-handler";

const FormComponent = ({ onDismiss, onAdd }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState(new Date());
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedLabels, setSelectedLabels] = useState([]);

  const labels = ["Ważne", "Studia", "Praca", "Dom", "Spotkanie"];

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

  const toggleLabel = (label) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== label));
    } else if (selectedLabels.length < 2) {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  return (
    <ScrollView
      style={styles.formComponent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.titleText}>Nowe zadanie</Text>
      <View style={styles.headerRow}>
        <Icon name="pencil" size={24} color="#1C1C1C" />
        <Text style={styles.sectionHeaderText}>Nazwa zadania</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nazwa zadania"
        value={taskName}
        maxLength={100}
        onChangeText={(text) => setTaskName(text)}
      />
      <View style={styles.headerRow}>
        <Icon
          style={{ marginBottom: 12 }}
          name="calendar"
          size={24}
          color="#1C1C1C"
        />
        <Text style={[styles.sectionHeaderText, { marginBottom: 12 }]}>
          Termin wykonania
        </Text>
      </View>
      <DateTimePicker
        mode="single"
        date={taskDate}
        onChange={({ date }) => {
          setTaskDate(date);
        }}
        firstDayOfWeek={1}
        locale="en"
      />
      <View style={[styles.headerRow, { marginTop: -16 }]}>
        <Icon name="info" size={24} color="#1C1C1C" />
        <Text style={styles.sectionHeaderText}>Opis</Text>
      </View>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        multiline={true}
        maxLength={600}
        numberOfLines={4}
        placeholder="Opis zadania"
        value={taskDescription}
        onChangeText={(text) => setTaskDescription(text)}
      />
      <View style={styles.headerRow}>
        <Icon name="bookmark" size={24} color="#1C1C1C" />
        <Text style={styles.sectionHeaderText}>Atrybuty</Text>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.labelList}
        >
          {labels.map((label, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.labelView,
                {
                  backgroundColor: selectedLabels.includes(label)
                    ? getLabelColor(label)
                    : "#959595",
                  marginLeft: index === 0 ? 0 : 8,
                },
              ]}
              onPress={() => toggleLabel(label)}
            >
              <Text style={styles.labelText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <FormButtons
        onDismiss={onDismiss}
        onAdd={() =>
          onAdd({
            title: taskName.length == 0 ? "Zadanie" : taskName,
            date: dayjs(taskDate).format("DD.MM.YYYY"),
            description:
              taskDescription.length == 0 ? "Brak opisu" : taskDescription,
            labels: selectedLabels,
          })
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formComponent: {
    flex: 1,
  },
  titleText: {
    textAlign: "center",
    color: "#1C1C1C",
    fontWeight: "800",
    fontSize: 42,
    marginBottom: 24,
  },
  sectionHeaderText: {
    color: "#1C1C1C",
    fontWeight: "700",
    fontSize: 24,
    marginLeft: 12,
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
    flexDirection: "row",
    height: 32,
    marginBottom: 12,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 12,
    width: "100%",
    marginTop: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: "top",
    marginTop: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
});

export default FormComponent;
