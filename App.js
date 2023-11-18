import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/Colors";
import GameOverScreen from "./screens/GameOverScreen";
import AppLoading from "expo-app-loading";
import {useFonts} from "expo-font";


export default function App() {
  const [pickedNumber, setPickedNumber] = useState();
  const [isGameOver, setIsGameOver] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

  if(!fontsLoaded) {
    return <AppLoading />
  }

  function pickNumberHandler(selectedNumber) {
    setPickedNumber(selectedNumber);
  }

  function gameOverHandler(numOfRounds) {
    setIsGameOver(true);
    setGuessRounds(numOfRounds)
  }

  function startGameHandler () {
    setPickedNumber(null);
    setGuessRounds(0);
    setIsGameOver(false)
  }

  let screen = <StartGameScreen pickHandler={pickNumberHandler} />;

  if (pickedNumber) {
    screen = <GameScreen userNumber={pickedNumber} onGameOver={gameOverHandler}/>;
  }

  if(isGameOver) {
    screen = <GameOverScreen roundsNumber={guessRounds} userNumber={pickedNumber} onStartGame={startGameHandler} /> 
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootContainer}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootContainer}
        imageStyle={styles.imageStyle}
      >
        <SafeAreaView style={styles.rootContainer}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  imageStyle: {
    opacity: 0.15,
  },
});
