import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const SortByScreen = () => {
  return (
    <View style={{
        flex: 1,
        backgroundColor: '#DFEAF6'
      }}>
        
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor:'#143F6B',
            alignItems: 'center',
            paddingHorizontal: 60,
            paddingVertical: 5,
          }}>
            
            <Text style={{
                  fontSize: 28, 
                  fontWeight: 'bold',
                  color: '#fff',
                  alignItems: 'center',
                  marginHorizontal: 90,               
            }}>
              Sort By
            </Text>

          </View>
      </View>
  )
}

export default SortByScreen

const styles = StyleSheet.create({})