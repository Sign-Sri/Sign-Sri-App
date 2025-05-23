import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const LeaderBoardItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.rank}>{item.rank}</Text>
      <Image source={{ uri: item.avatar }} style={[styles.avatar, { borderColor: item.color }]} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.points}>{item.points} pts</Text>
      </View>
      <View style={styles.changeContainer}>
        <Text style={item.change.startsWith("+") ? styles.positiveChange : styles.negativeChange}>
          {item.change}
        </Text>
      </View>
    </View>
  );
};

export default LeaderBoardItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginBottom: 8,
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  rank: { fontSize: 20, fontWeight: "bold", marginRight: 16 },
  avatar: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, marginRight: 16 },
  info: { flex: 1 },
  name: { fontSize: 20, fontWeight: "bold" },
  points: { fontSize: 14, color: "#b8b6b6" },
  changeContainer: { justifyContent: "center", alignItems: "center" },
  positiveChange: { fontSize: 14, color: "#d3f207" },
  negativeChange: { fontSize: 14, color: "#de691b" },
});
