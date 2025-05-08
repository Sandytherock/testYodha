import { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { router } from "expo-router";  // Expo Router se redirect karne ke liye

export default function Splash() {

  // useEffect hook to auto-redirect after 3 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/home");  // 3 second baad home screen pe chala jaayega
    }, 3000); // 3 seconds delay

    // Cleanup function to clear timeout if component unmounts
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff", // Background Color
      }}
    >
      {/* Logo Image */}
      <Image
        source={require("../assets/images/textlogo.png")} // Your splash logo
        style={{
          width: 300,
          height: 200,
          resizeMode: "contain",
        }}
      />

      {/* Text Section */}
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 18,
          marginTop: 20,
        }}
      >
        Welcome to Test Yodha
      </Text>
      <Text>Your Battle For Success Begins Here</Text>
    </View>
  );
}
