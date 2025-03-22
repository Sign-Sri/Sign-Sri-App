import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LessonCard = ({ title, level, completed, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.level}>{level}</Text>
    {completed && <Text style={styles.completed}>✔️ Completed</Text>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  level: { fontSize: 14, color: '#666' },
  completed: { fontSize: 14, color: 'green' },
});

export default LessonCard;