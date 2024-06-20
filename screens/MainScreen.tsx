import React, { useRef, useCallback, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import BottomSheet, {BottomSheetScrollView, BottomSheetView} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DetailsComponent from "../components/DetailsComponent";
import DoneComponent from "../components/DoneComponent";
import TaskComponent from "../components/TaskComponent";
import FormComponent from "../components/FormComponent";
import { FAB } from "@rneui/themed";

const MainScreen = () => {
  const sampleTasks = [
    {
      id: 1,
      title: "Prezentacja z marketingu",
      date: "05.06.2024",
      description:
        "Przygotować prezentację na zajęcia z marketingu. Prezentacja powinna zawierać analizy rynkowe oraz proponowane strategie marketingowe.",
      labels: ["Ważne", "Studia"],
      isDone: false,
    },
    {
      id: 2,
      title: "Raport z badań do projektu",
      date: "06.06.2024",
      description:
        "Napisać raport z badań do projektu zaliczeniowego. Skupić się na metodologii oraz wynikach.",
      labels: ["Ważne", "Studia"],
      isDone: false,
    },
    {
      id: 3,
      title: "Sprzątanie mieszkania",
      date: "03.07.2024",
      description:
        "Wysprzątać mieszkanie przed przyjazdem gości.",
      labels: ["Dom"],
      isDone: false,
    },
    {
      id: 4,
      title: "Spotkanie z klientem",
      date: "26.06.2024",
      description:
        "Omówić szczegóły projektu z współpracownikiem. Przygotować wszystkie niezbędne dokumenty.",
      labels: ["Spotkanie", "Praca"],
      isDone: false,
    },
    {
      id: 5,
      title: "Zakupy spożywcze",
      date: "27.06.2024",
      description:
        "Sprawdzić listę zakupów. Kupić wszystkie produkty z listy na cały tydzień.",
      labels: ["Dom"],
      isDone: false,
    },
    {
      id: 6,
      title: "Przygotowanie do egzaminu",
      date: "05.07.2024",
      description:
        "Przejrzeć notatki i zrobić powtórkę materiału przed egzaminem z matematyki.",
      labels: ["Studia", "Ważne"],
      isDone: false,
    },
    {
      id: 8,
      title: "Pisanie pracy dyplomowej",
      date: "11.07.2024",
      description:
        "Napisać kolejne rozdziały pracy dyplomowej. Skupić się na rozdziale metodologicznym.",
      labels: ["Studia"],
      isDone: false,
    },
    {
      id: 9,
      title: "Planowanie wakacji",
      date: "05.06.2024",
      description:
        "Zaplanować szczegóły wakacyjnego wyjazdu. Kupić bilety lotnicze i zarezerwować hotele.",
      labels: ["Dom"],
      isDone: true,
    },
  ];

  const [tasks, setTasks] = useState(sampleTasks);
  const [selectedTask, setSelectedTask] = useState(sampleTasks[0]);
  const [detailsShown, setDetailsShown] = useState(true);

  const sortedTasks = tasks.slice().sort((task1, task2) => {
    if (task1.isDone !== task2.isDone) {
      return task1.isDone ? 1 : -1;
    }
    const date1 = new Date(task1.date);
    const date2 = new Date(task2.date);
    return date1.getDate() - date2.getDate();
  });

  const handleDelete = (id) => {
    const newTasks = tasks.filter((item) => item.id !== id);
    setTasks(newTasks);
    bottomSheetRef.current.close();
  };

  const handleDone = (id) => {
    const newTasks = tasks.map((item) =>
      item.id === id ? { ...item, isDone: true } : item
    );
    setTasks(newTasks);
    bottomSheetRef.current.close();
  };

  const bottomSheetRef = useRef(null);

  const showDetails = (id) => {
    const newSelectedTask = tasks.find((item) => item.id === id);
    setSelectedTask(newSelectedTask);
    setDetailsShown(true);
    bottomSheetRef.current.expand();
  };

  const showForm = () => {
    setDetailsShown(false);
    bottomSheetRef.current.expand();
  };

  const handleDismiss = () => {
    setDetailsShown(true);
    bottomSheetRef.current.close();
  };

  const handleAdd = (task) => {
    const nextId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const newTask = { ...task, id: nextId, isDone: false };
    setTasks([...tasks, newTask]);
    setDetailsShown(true);
    bottomSheetRef.current.close();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView
        style={{
          flex: 1,
          paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight + 8 : 8,
        }}
      >
        <ScrollView
          style={styles.mainScreen}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <Text style={styles.screenHeaderText}>Zadania</Text>
          <FlatList
            data={sortedTasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
              item.isDone ? (
                <DoneComponent
                  id={item.id}
                  title={item.title}
                  date={item.date}
                  description={item.description}
                  labels={item.labels}
                  onDelete={handleDelete}
                  onTap={showDetails}
                />
              ) : (
                <TaskComponent
                  id={item.id}
                  title={item.title}
                  date={item.date}
                  description={item.description}
                  labels={item.labels}
                  onDone={handleDone}
                  onDelete={handleDelete}
                  onTap={showDetails}
                />
              )
            }
          />
        </ScrollView>
        <FAB
          visible={detailsShown}
          onPress={() => showForm()}
          placement="right"
          title="Dodaj zadanie"
          icon={{ name: "add", color: "white" }}
          color="#219653"
        />
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={["100%"]}
          enablePanDownToClose={detailsShown}
          enableOverDrag={detailsShown}
          index={-1}
          style={{
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          }}
        >
          <BottomSheetView style={styles.contentContainer}>
            {detailsShown ? (
              <DetailsComponent
                id={selectedTask.id}
                title={selectedTask.title}
                date={selectedTask.date}
                description={selectedTask.description}
                labels={selectedTask.labels}
                onDelete={handleDelete}
                isDone={selectedTask.isDone}
                onDone={handleDone}
              />
            ) : (
              <FormComponent onAdd={handleAdd} onDismiss={handleDismiss} />
            )}
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  screenHeaderText: {
    fontSize: 42,
    fontWeight: "800",
    alignSelf: "center",
  },
  mainScreen: {
    backgroundColor: "#F2F2F2",
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    elevation: 6,
    padding: 20,
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
    marginTop: 12,
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

export default MainScreen;
