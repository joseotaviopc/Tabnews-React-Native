/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Platform, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/Post";
import NotFoundScreen from "../screens/NotFoundScreen";
import Relevants from "../screens/Relevants";
import Recents from "../screens/Recents";
import {
	RootStackParamList,
	RootTabParamList,
	RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Post from "../screens/Post";
import Messages from "../screens/Messages";

export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Root"
				component={BottomTabNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="NotFound"
				component={NotFoundScreen}
				options={{ title: "Oops!" }}
			/>
			<Stack.Group screenOptions={{ presentation: "modal" }}>
				<Stack.Screen name="Post" component={Post} />
			</Stack.Group>
		</Stack.Navigator>
	);
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName="Home"
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme].tint,
				tabBarStyle: {
					height: 80,
					paddingBottom: Platform.OS === "ios" ? 24 : 16,
				},
				tabBarLabelStyle: { fontSize: 12 },
				headerShown: false,
			}}
		>
			<BottomTab.Screen
				name="Relevantes"
				component={Relevants}
				options={({ navigation }: RootTabScreenProps<"Relevantes">) => ({
					title: "Relevantes",
					tabBarIcon: ({ color }) => <TabBarIcon name="rocket" color={color} />,
					headerRight: () => (
						<Pressable
							// onPress={() => navigation.navigate("Post")}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<FontAwesome
								name="info-circle"
								size={25}
								color={Colors[colorScheme].text}
								style={{ marginRight: 15 }}
							/>
						</Pressable>
					),
				})}
			/>
			<BottomTab.Screen
				name="Recentes"
				component={Recents}
				options={{
					title: "Recentes",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="sort-amount-asc" color={color} />
					),
				}}
			/>
			<BottomTab.Screen
				name="Mensagens"
				component={Messages}
				options={{
					title: "Mensagens",
					tabBarIcon: ({ color }) => <TabBarIcon name="inbox" color={color} />,
				}}
			/>
			<BottomTab.Screen
				name="Cadastrar"
				component={Register}
				options={{
					title: "Cadastrar",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="sign-in" color={color} />
					),
				}}
			/>
			<BottomTab.Screen
				name="Login"
				component={Login}
				options={{
					title: "Login",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="user-circle" color={color} />
					),
				}}
			/>
		</BottomTab.Navigator>
	);
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={26} style={{ marginBottom: -5 }} {...props} />;
}
