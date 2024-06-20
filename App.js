import * as React from "react";
import MainScreen from "./screens/MainScreen";
import { StyleSheet, View, LogBox } from "react-native";
import { StatusBar } from 'expo-status-bar';

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <View style={styles.container}>
      <MainScreen />
      <StatusBar style="light" />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
