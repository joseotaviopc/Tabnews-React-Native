import {
	StyleSheet,
	ActivityIndicator,
	ScrollView,
	FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { api } from "../services";
import { useEffect, useState } from "react";
import ContentItem from "../components/ContentItem";

function RenderActivityIndicator({ loading }: { loading: boolean }) {
	if (loading)
		return (
			<ActivityIndicator
				size="large"
				// lightColor="#eee"
				// darkColor="#333"
				color="#888"
				style={{ padding: 16, paddingTop: 24 }}
			/>
		);
	return <View style={{ paddingBottom: 30 }}></View>;
}

export default function Relevants({
	navigation,
}: RootTabScreenProps<"Relevantes">) {
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(20);
	const [content, setContent] = useState<any>([]);
	const [isLoading, setIsLoading] = useState(false);

	async function getMoreData() {
		setPage((prev) => prev + 1);
		const moredata = await getContent();
		setContent((prev: any) => [...prev, ...moredata]);
	}

	async function getContent() {
		try {
			const { data } = await api.get(
				`/contents?page=${page}&per_page=${perPage}&strategy=relevant`
			);
			return data;
		} catch (error) {
			console.log(error);
			throw new Error();
		}
	}

	useEffect(() => {
		async function getFirstData() {
			setIsLoading(true);
			setPage((prev) => prev + 1);
			try {
				const data = await getContent();
				setContent(data);
			} catch (error) {
				setPage(1);
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		}

		getFirstData();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Posts + relevantes</Text>
			<View style={styles.separator} lightColor="#eee" darkColor="#333" />
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<>
					<FlatList
						keyExtractor={(item) => item.id}
						data={content}
						renderItem={({ item }) => <ContentItem {...item} />}
						ListFooterComponent={
							<RenderActivityIndicator loading={page !== 1} />
						}
						onEndReached={getMoreData}
						onEndReachedThreshold={0.2}
					/>
				</>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		// justifyContent: "center",
		backgroundColor: "#111111",
		borderRadius: 12,
		borderWidth: 2,
		width: "100%",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 2,
		width: "80%",
	},
});
