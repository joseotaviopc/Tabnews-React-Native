import * as WebBrowser from "expo-web-browser";
import { StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

export default function EditScreenInfo({ path }: { path: string }) {
	return (
		<View style={styles.container}>
			<View style={styles.getStartedContainer}>
				<Text
					style={styles.getStartedText}
					lightColor="rgba(0,0,0,0.8)"
					darkColor="rgba(255,255,255,0.8)"
				>
					Open up the code for this screen:
				</Text>

				<View
					style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
					darkColor="rgba(255,255,255,0.05)"
					lightColor="rgba(0,0,0,0.05)"
				>
					<MonoText>{path}</MonoText>
				</View>

				<Text
					style={styles.getStartedText}
					lightColor="rgba(0,0,0,0.8)"
					darkColor="rgba(255,255,255,0.8)"
				>
					Change any of the text, save the file, and your app will automatically
					update.
				</Text>
			</View>

			<View style={styles.helpContainer}>
				<TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
					<Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
						Clique aqui caso os posts não sejam carregados automaticamente
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

function handleHelpPress() {
	WebBrowser.openBrowserAsync("https://www.tabnews.com.br");
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	getStartedContainer: {
		alignItems: "center",
		marginHorizontal: 50,
		flex: 1,
	},
	homeScreenFilename: {
		marginVertical: 7,
	},
	codeHighlightContainer: {
		borderRadius: 3,
		paddingHorizontal: 4,
	},
	getStartedText: {
		fontSize: 17,
		lineHeight: 24,
		textAlign: "center",
	},
	helpContainer: {
		marginTop: 15,
		marginHorizontal: 20,
		alignItems: "center",
		height: "auto",
	},
	helpLink: {
		paddingVertical: 15,
	},
	helpLinkText: {
		textAlign: "center",
	},
});
