import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
	Platform,
	ScrollView,
	StyleSheet,
	ActivityIndicator,
	Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Markdown from "react-native-markdown-package";

import { Text, View } from "../components/Themed";
import { api } from "../services";
import { RootStackScreenProps } from "../types";

type PostItemProps = {
	body: string;
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

export default function Post({ route }: RootStackScreenProps<"Post">) {
	const { user, slug } = route.params;
	// console.log(route.params);
	const [content, setContent] = useState<PostItemProps>({} as PostItemProps);
	const [coments, setComents] = useState<any>();
	const [isLoading, setIsLoading] = useState(false);

	// /contents/{user}/{slug}
	// /contents/{user}/{slug}/children
	async function getContent() {
		setIsLoading(true);
		try {
			const resContent = await api.get(`/contents/${user}/${slug}`);
			setContent(resContent.data);
			const resComent = await api.get(`/contents/${user}/${slug}/children`);
			setComents(resComent.data);
			// console.log(resComent.data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		getContent();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<ScrollView>
					{/* <Text style={styles.title}>Post</Text> */}
					<Text style={styles.title}>{content?.owner_username}</Text>
					{/* <Text style={styles.title}>{content?.published_at.split("T")}</Text> */}
					<View
						style={styles.separator}
						lightColor="#eee"
						darkColor="rgba(255,255,255,0.1)"
					/>
					<View style={styles.body}>
						<Markdown
							styles={markdownStyle.collectiveMd}
							onLink={(url: string) => Linking.openURL(url)}
						>
							{content.body}
						</Markdown>
					</View>
					{coments?.map((coment: any) => {
						return (
							<View style={styles.body} key={coment.id}>
								<Text style={[styles.comentTitle, styles.coments]}>
									{coment.owner_username}
								</Text>
								<Text style={styles.coments}>{coment.body}</Text>
							</View>
						);
					})}
					{/* Use a light status bar on iOS to account for the black space above the modal */}
					<StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
				</ScrollView>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		// justifyContent: "center",
	},
	title: {
		fontSize: 14,
		fontWeight: "bold",
		alignSelf: "center",
		color: "#eee",
	},
	comentTitle: {
		fontSize: 14,
		fontWeight: "bold",
	},
	coments: {
		color: "#ccc",
		marginLeft: 14,
	},
	body: {
		fontSize: 12,
		padding: 12,
		marginBottom: 30,
	},
	separator: {
		marginVertical: 10,
		height: 2,
		width: "80%",
	},
});

const markdownStyle = {
	singleLineMd: {
		text: {
			color: "blue",
			textAlign: "right",
		},
		view: {
			alignSelf: "stretch",
		},
	},
	collectiveMd: {
		heading1: {
			color: "#eee",
		},
		heading2: {
			color: "#eee",
			// textAlign: "right",
		},
		strong: {
			color: "#fff",
		},
		em: {
			color: "cyan",
		},
		text: {
			color: "#eee",
		},
		blockQuoteText: {
			color: "grey",
		},
		blockQuoteSection: {
			flexDirection: "row",
		},
		blockQuoteSectionBar: {
			width: 3,
			height: null,
			backgroundColor: "#777",
			marginRight: 15,
		},
		codeBlock: {
			fontFamily: "space-mono",
			fontWeight: "500",
			backgroundColor: "#777",
		},
		tableHeader: {
			backgroundColor: "grey",
		},
		autolink: {
			color: "#8df262",
		},
	},
};
