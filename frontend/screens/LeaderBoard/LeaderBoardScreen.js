import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";

import { LinearGradient } from 'expo-linear-gradient';

const LeaderBoardItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.rank}>{item.rank}</Text>
    <Image source={item.avatar} style={styles.avatar} />
    <View style={styles.info}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.points}>{item.points} pts</Text>
    </View>
    <Text style={item.change.startsWith("+") ? styles.positiveChange : styles.negativeChange}>
      {item.change}
    </Text>
  </View>
);

const LeaderBoardScreen = () => {
  const podiumData = [
    { rank: 2, name: "Alex", avatar: require("../../assets/LeaderBoardImages/2nd_place.jpg"), bgColor: "#FF9D23" },
    { rank: 1, name: "Chris", avatar: require("../../assets/LeaderBoardImages/winner.jpg"), bgColor: "#DDEB9D" },
    { rank: 3, name: "Taylor", avatar: require("../../assets/LeaderBoardImages/3rd_place.jpg"), bgColor: "#FFD95F" },
  ];

  const leaderboardData = [
    { rank: 4, name: "Jennifer", points: 780, change: "+3", avatar: require("../../assets/LeaderBoardImages/pic1.jpg") },
    { rank: 5, name: "William", points: 756, change: "-1", avatar: require("../../assets/LeaderBoardImages/pic2.jpg") },
    { rank: 6, name: "Samantha", points: 698, change: "-2", avatar: require("../../assets/LeaderBoardImages/pic3.jpg") },
    { rank: 7, name: "Emery", points: 636, change: "-1", avatar: require("../../assets/LeaderBoardImages/pic4.jpg") },
    { rank: 8, name: "Lydia", points: 560, change: "-1", avatar: require("../../assets/LeaderBoardImages/pic5.jpg") },
  ];

  return (
    <View style={styles.container}>
      {/* Header with Gradient Background */}
      <LinearGradient
        colors={['#182a38', '#2c3e50']}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => console.log("Go Back")}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Leader Board</Text>
      </LinearGradient>

      {/* Podium Section */}
      <View style={styles.podiumContainer}>
        <View style={styles.podium}>
          {/* 2nd Place */}
          <View style={[styles.podiumStep, { height: 180, backgroundColor: podiumData[0].bgColor }]}>
            <Image source={podiumData[0].avatar} style={styles.avatar} />
            <Text style={styles.podiumRank}>2</Text>
            <Text style={styles.podiumName}>{podiumData[0].name}</Text>
          </View>
          {/* 1st Place */}
          <View style={[styles.podiumStep, { height: 200, backgroundColor: podiumData[1].bgColor }]}>
            <Image source={podiumData[1].avatar} style={styles.avatar} />
            <Text style={styles.podiumRank}>1</Text>
            <Text style={styles.podiumName}>{podiumData[1].name}</Text>
          </View>
          {/* 3rd Place */}
          <View style={[styles.podiumStep, { height: 155, backgroundColor: podiumData[2].bgColor }]}>
            <Image source={podiumData[2].avatar} style={styles.avatar} />
            <Text style={styles.podiumRank}>3</Text>
            <Text style={styles.podiumName}>{podiumData[2].name}</Text>
          </View>
        </View>
      </View>

      {/* Leaderboard List */}
      <FlatList
        data={leaderboardData}
        keyExtractor={(item) => item.rank.toString()}
        renderItem={({ item }) => <LeaderBoardItem item={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default LeaderBoardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 45,
    backgroundColor: "#182a38",
    elevation: 4,
    justifyContent: "flex-start",
    borderBottomRightRadius: 125,
    borderBottomRightWidth:10,
  },
  backButton: { 
    fontWeight: "bold",
    fontSize: 38, 
    color: "#fff",
    
  },

  title: { 
    fontSize: 26, 
    fontWeight: "bold", 
    marginLeft: 24,
    color: "#fff", 
  },
  
  podiumContainer: {
    marginTop: 16,
    alignItems: "center",
  },

  podium: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "90%",
    backgroundColor: "#182a38",
    borderRadius: 20,
    paddingBottom: 10,
    paddingTop: 10,
    borderWidth: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  podiumStep: {
    width: 90,
    alignItems: "center",
    justifyContent: "flex-end",
    borderRadius: 20,
    marginHorizontal: 9,
    elevation: 10,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  podiumRank: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "black",
  },
  podiumName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  avatar: {
    width: 60,
    height: 68,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 8,
  },
  list: { padding: 20 },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#182a38",
    marginBottom: 8,
    padding: 10,
    borderRadius: 18,
    elevation: 5,
    borderWidth: 2,
  },
  rank: { fontSize: 20, fontWeight: "bold", marginRight: 20 },
  info: { flex: 5 ,marginLeft: 10},
  name: { fontSize: 16, color: "white" },
  points: { fontSize: 14, color: "#888" },
  positiveChange: { fontSize: 18, color: "#d3f207", fontWeight: "bold" },
  negativeChange: { fontSize: 18, color: "#de691b", fontWeight: "bold" },
});
