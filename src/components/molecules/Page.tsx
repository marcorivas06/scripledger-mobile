import { Box, Heading, HStack, ScrollView, View, VStack } from '@gluestack-ui/themed';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { StyleSheet, Animated  } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Page({
  children,
  headerShown,
  fullWidth = false,
  containerStyle = {},
  ...props
}) {
  const insets = useSafeAreaInsets();
  return (
    <View
    style={[
        styles.container,
        { paddingTop: headerShown ? 0 : insets.top },
        containerStyle,
      ]}
    >
        <Box h="100%" {...props}>
          {children}
        </Box> 
    </View>
  );
}

export function CameraPage({
  children,
  headerShown,
  fullWidth = false,
  containerStyle = {},
  ...props
}) {
  return (
    <View
    style={[
        styles.container,
        containerStyle,
      ]}
    >
        <Box h="100%" {...props}>
          {children}
        </Box> 
    </View>
  );
}

export function Section({
  children,
  isHigherOpacity,
  ...props
}) {
  return (
    <View
      backgroundColor={isHigherOpacity ? '$background_higher_opacity' : ''  }
    >
        <VStack style={{ paddingHorizontal: 16, width: '100%', alignItems:'center', marginBottom:20 }}>
          {children}
        </VStack> 
    </View>
  );
}

export function AnimatedSection({
  children,
  isHigherOpacity,
  animatedStyle,
  ...props
}) {
  return (
    <Animated.View
      style={[{
        backgroundColor: isHigherOpacity ? 'rgba(103, 80, 164, 0.11)' : '',
        height:'100%'
      }, animatedStyle]}
    >
        <VStack style={{ paddingHorizontal: 16, width: '100%', alignItems:'center', marginBottom:20 }}>
          {children}
        </VStack> 
    </Animated.View>
  );
}

export function MyHeader({
  title,
  userName,
  isHomePage,
  rightHeaderComponent,
  isSubsectionHeader,
  marginBottom,
  marginTop,
  ...props
}) {
  const header = useMemo(
    () => (
      <HStack style={[styles.pageTitle, {marginBottom:20, marginTop:marginTop}]}>
        {isHomePage ? (
          <VStack >
            <View height={50} >
              <Heading color='$global_font_color' size="lg" >
                {title}
              </Heading>
              <Heading color='$header_font_color' size="lg" >
                {userName} 👋
              </Heading>
            </View>
          </VStack>
        ) : (
          isSubsectionHeader ? (
            <Heading color='$mid_header' size="lg" fontFamily='DarkerGrotesque-Bold' >
              {title}
            </Heading>
          ) : (
            <View height={50} >
              <Heading color='$global_font_color' size="lg">
                {title}
              </Heading>
            </View>
          )
        )}
        {rightHeaderComponent && rightHeaderComponent}
      </HStack>
    ),
    [title, userName, isHomePage, isSubsectionHeader, rightHeaderComponent]
  );

  return header;
}

export function ScrollablePage({
  children,
  headerShown = true,
  fullWidth = false,
  showsVerticalScrollIndicator = true,
  title = null,
  ...props
}) {
  const insets = useSafeAreaInsets();
  return (
    <View
      backgroundColor='$background'
      style={[
        styles.container,
        {
          paddingTop: headerShown ? 0 : insets.top,
        },
      ]}
    >
      {title ? title : null}
      <ScrollView
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        style={[
          styles.container,
          {
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <Box h="100%" px={fullWidth ? 0 : 5} {...props}>
          {children}
        </Box>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    height: '100%',
    backgroundColor:'rgba(103, 80, 164, 0.1)',
  },
  overlay: {
    // Purple color with 11% opacity
    backgroundColor: 'rgba(103, 80, 164, 0.11)',
    // Make sure this overlay covers the container area
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

Page.propTypes = {
  title: PropTypes.string,
  userName: PropTypes.string,
  children: PropTypes.node,
  headerShown: PropTypes.bool,
  isHomePage: PropTypes.bool,
  scrollable: PropTypes.bool,
  rightHeaderComponent: PropTypes.node,
};
