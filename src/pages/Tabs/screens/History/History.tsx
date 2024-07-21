import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Page, MyHeader, Section } from "@components/molecules/Page";
import { CircularButton } from "@components/atoms/CircularButton";

const actions = ['All', 'Payment Sent', 'Received']

export function History() {
  const [selectedTab, setSelectedTab] = useState('All');

  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <Page fullWidth>
        <Section isHigherOpacity={false} >
          <MyHeader
            title="History"
            isHomePage={false}
            rightHeaderComponent={<CircularButton name="settings" as="Feather" radius="$full" />}
          />
          
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
        </Section>
      </Page>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
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
