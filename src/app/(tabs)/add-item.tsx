import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { colors, globalStyles } from '../../styles/global';
import { insertItem } from '../../db';

export default function AddItemScreen() {
	const [item, setItem] = useState('');
	const [price,setPrice] = useState('');
	const [quantity,setQuantity] = useState('');
	const db = useSQLiteContext();
	const router = useRouter();

	const addItem = async () => {
		const name = item.trim();
		const parsedPrice = Number(price);
		const parsedQuantity = Number(quantity);
		if (!name || !Number.isFinite(parsedPrice) || parsedPrice < 0 || !Number.isInteger(parsedQuantity) || parsedQuantity < 1) return;
		await insertItem(db, { name, price: parsedPrice, quantity: parsedQuantity });
		setItem('');
		setPrice('');
		setQuantity('');
		Toast.show({ type: 'success', text1: 'Item added', text2: `${name} was added successfully` });
		router.replace('/list-item');
	};

	return (
		<View style={[globalStyles.screen, styles.container]}>
			<Text style={globalStyles.title}>Add an item</Text>
			<View style={styles.inputContainer}>
				<TextInput
					value={item}
					onChangeText={setItem}
					placeholder="Item name"
					style={styles.input}
					returnKeyType="done"
				/>
				{item.length > 0 && (
					<Pressable
						accessibilityLabel="Clear item name"
						hitSlop={8}
						onPress={() => setItem('')}
						style={styles.clearButton}
					>
						<Text style={styles.clearButtonText}>×</Text>
					</Pressable>
				)}
			</View>
			<View style={styles.row}>
				<View style={styles.field}>
					<Text style={styles.label}>Price</Text>
					<TextInput
						value={price}
						onChangeText={setPrice}
						placeholder="0.00"
						placeholderTextColor="#6b7280"
						keyboardType="decimal-pad"
						style={[styles.input, styles.numericInput]}
					/>
				</View>
				<View style={styles.field}>
					<Text style={styles.label}>Quantity</Text>
					<TextInput
						value={quantity}
						onChangeText={setQuantity}
						placeholder="1"
						placeholderTextColor="#6b7280"
						keyboardType="number-pad"
						style={[styles.input, styles.numericInput]}
					/>
				</View>
			</View>
			<Pressable
				style={[styles.button, !item.trim() || !price || !quantity ? styles.disabled : null]}
				disabled={!item.trim() || !price || !quantity}
				onPress={addItem}
			>
				<Text style={styles.buttonText}>Add item</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
	},
	input: {
		flex: 1,
		padding: 14,
		fontSize: 16,
		color: colors.text,
	},
	numericInput: {
		flex: 1,
		minHeight: 52,
		borderWidth: 1,
		borderColor: '#9ca3af',
		borderRadius: 10,
		backgroundColor: '#ffffff',
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#d1d5db',
		borderRadius: 10,
	},
	row: {
		flexDirection: 'row',
		gap: 12,
		marginTop: 12,
	},
	field: {
		flex: 1,
	},
	label: {
		marginBottom: 6,
		fontSize: 14,
		fontWeight: '600',
		color: colors.text,
	},
	clearButton: {
		paddingHorizontal: 14,
	},
	clearButtonText: {
		fontSize: 24,
		lineHeight: 24,
		color: colors.mutedText,
	},
	button: {
		marginTop: 16,
		alignItems: 'center',
		borderRadius: 10,
		padding: 14,
		backgroundColor: '#2563eb',
	},
	disabled: {
		opacity: 0.5,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
});
