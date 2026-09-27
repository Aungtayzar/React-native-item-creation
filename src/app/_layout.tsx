import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from '../db';

export default function RootLayout() {
	return (
		<SQLiteProvider databaseName="items.db" onInit={initializeDatabase}>
			<Stack screenOptions={{ headerShown: false }} />
			<Toast />
		</SQLiteProvider>
	);

    // return(
    //     <Stack screenOptions={{ headerShown: false }}>
    //         <Stack.Screen name="(tabs)" />
    //     </Stack>
    // )
}
