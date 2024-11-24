import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Import pages
import HomePage from './pages/HomePage';
import ListCharacterPage from './pages/ListCharacterPage';
import CharacterDetailPage from './pages/CharacterDetailPage';
import AboutPage from './pages/AboutPage';
import ComicPage from './pages/ComicPage';
import ArtList from './pages/ArtList'; 
import ArtDetail from './pages/ArtDetail';

// Colors for consistent styling
import Colors from './styles/Colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Characters (List and Detail)
function CharacterStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: Colors.primary }, headerTintColor: Colors.text }}>
      <Stack.Screen name="ListCharacter" component={ListCharacterPage} options={{ title: 'Characters' }} />
      <Stack.Screen name="CharacterDetail" component={CharacterDetailPage} options={{ title: 'Character Detail' }} />
    </Stack.Navigator>
  );
}

// Stack Navigator for Arts (List and Detail)
function ArtStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: Colors.primary }, headerTintColor: Colors.text }}>
      <Stack.Screen name="ArtList" component={ArtList} options={{ title: 'Official Arts' }} />
      <Stack.Screen name="ArtDetail" component={ArtDetail} options={{ title: 'Art Detail' }} />
    </Stack.Navigator>
  );
}

// Main App Component with Tab Navigator
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Characters') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Comics') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Arts') {
              iconName = focused ? 'color-palette' : 'color-palette-outline';
            } else if (route.name === 'About') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.accent,
          tabBarInactiveTintColor: 'gray',
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: Colors.text,
        })}
      >
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Characters" component={CharacterStack} />
        <Tab.Screen name="Comics" component={ComicPage} />
        <Tab.Screen name="Arts" component={ArtStack} />
        <Tab.Screen name="About" component={AboutPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
