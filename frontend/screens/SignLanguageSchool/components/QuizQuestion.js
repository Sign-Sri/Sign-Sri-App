import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // You can use any icon library

const Badge = ({ name, iconName }) => {
  return (
    <View style={styles.container}>
      <Icon name={iconName} size={24} color="#ffcc00" />
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Badge;