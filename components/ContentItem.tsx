import * as WebBrowser from "expo-web-browser";
import { StyleSheet, TouchableOpacity } from "react-native";

import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";
import { useNavigation } from "@react-navigation/native";

type ContentItemProps = {
	children_deep_count: number;
	created_at: string;
	deleted_at: null;
	id: string;
	owner_id: string;
	owner_username: string;
	parent_id: null;
	published_at: string;
	slug: string;
	source_url: null;
	status: string;
	tabcoins: number;
	title: string;
	updated_at: string;
};

export default function ContentItem({
	title,
	tabcoins,
	updated_at,
	children_deep_count,
	owner_username,
	slug,
}: ContentItemProps) {
	const navigate = useNavigation();
	const agora = new Date().getTime();
	const getUpdatedTime = updated_at.split("T");
	let passedTime = agora - new Date(getUpdatedTime[0]).getTime();
	passedTime = Math.round(passedTime / 1000 / 3600);

	function handleOpenPost(owner_username: string, slug: string) {
		navigate.navigate("Post", { user: owner_username, slug });
	}
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => handleOpenPost(owner_username, slug)}
		>
			<Text
				numberOfLines={2}
				style={styles.getStartedText}
				lightColor="rgba(0,0,0,0.8)"
				darkColor="rgba(255,255,255,0.8)"
			>
				{title}
				{"\n"}
			</Text>

			<View style={styles.codeHighlightContainer}>
				<MonoText>{tabcoins} tabcoins - </MonoText>
				<MonoText>{children_deep_count} comentários - </MonoText>
				<MonoText>{passedTime} horas atrás</MonoText>
			</View>
		</TouchableOpacity>
	);
}

function handleHelpPress() {
	WebBrowser.openBrowserAsync("https://www.tabnews.com.br");
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "98%",
		// height: "",
		borderRadius: 8,
		backgroundColor: "#282828",
		padding: 8,
		// overflow: "hidden",
		alignSelf: "center",
		justifyContent: "space-between",
		marginBottom: 12,
	},
	getStartedText: {
		fontSize: 14,
		lineHeight: 18,
		textAlign: "left",
		paddingBottom: 8,
		// width: "98%",
		// flexWrap: "wrap",
	},
	codeHighlightContainer: {
		// borderRadius: 3,
		// paddingHorizontal: 4,
		backgroundColor: "#282828",
		paddingHorizontal: 8,
		flexDirection: "row",
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
