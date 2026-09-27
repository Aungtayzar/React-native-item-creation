import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors, globalStyles } from '../../styles/global';
import { getItems, Item } from '../../db';

export default function ListItemScreen() {
  const db = useSQLiteContext();
  const [items, setItems] = useState<Item[]>([]);
  const loadItems = useCallback(async () => {
    setItems(await getItems(db));
  }, [db]);
useFocusEffect(
  useCallback(() => {
    loadItems();
  }, [loadItems])
);

  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.title}>My items</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.details}>Price: {item.price.toFixed(2)} · Quantity: {item.quantity}</Text>
            <Text style={styles.date}>{new Date(item.created_at).toLocaleString()}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No items yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: { padding: 16, marginBottom: 10, borderRadius: 10, backgroundColor: '#f3f4f6' },
  itemName: { fontSize: 17, fontWeight: '600', color: colors.text },
  details: { marginTop: 6, color: colors.text, fontSize: 14 },
  date: { marginTop: 4, color: colors.mutedText, fontSize: 12 },
  empty: { color: colors.mutedText, fontSize: 16 },
});
