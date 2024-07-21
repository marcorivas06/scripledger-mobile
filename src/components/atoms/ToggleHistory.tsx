import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Page, MyHeader, Section } from "@components/molecules/Page";
import { CircularButton } from "@components/atoms/CircularButton";

const actions = ['All', 'Payment Sent', 'Received']

export const ToggleHistory = ({handleTabSelect, selectedTab }) => {
  return(
    <View style={styles.tabContainer}>
      {actions.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => handleTabSelect(tab)}
          style={[styles.tab, selectedTab === tab ? styles.tabSelected : null]}
        >
          <Text style={styles.tabText}>{tab}</Text>
          {selectedTab === tab && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    marginTop:50,
    marginBottom:30,
    flexDirection: 'row',
    borderBottomWidth:1,
    borderBottomColor:'#E7E0EC'
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  tabSelected: {
    borderBottomColor: 'blue', // Customize color as needed  
  },
  tabText: {
    fontSize: 14,
    color: '#6750A4', // Customize color as needed
  },
  tabIndicator: {
    height: 4,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    width: '15%',
    backgroundColor: 'blue', // Customize color as needed
    marginTop: 5, // Adjust as necessary to position correctly under the text
  },
});
