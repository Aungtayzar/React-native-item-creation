import * as SQLite from 'expo-sqlite';

export type Item = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  created_at: string;
};

export async function initializeDatabase(db: SQLite.SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL DEFAULT 0,
      quantity INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL
    );
  `);

  const columns = await db.getAllAsync<{ name: string }>('PRAGMA table_info(items)');
  const columnNames = new Set(columns.map((column) => column.name));

  if (!columnNames.has('price')) {
    await db.execAsync('ALTER TABLE items ADD COLUMN price REAL NOT NULL DEFAULT 0');
  }
  if (!columnNames.has('quantity')) {
    await db.execAsync('ALTER TABLE items ADD COLUMN quantity INTEGER NOT NULL DEFAULT 1');
  }
}

export async function insertItem(
  db: SQLite.SQLiteDatabase,
  item: Pick<Item, 'name' | 'price' | 'quantity'>,
) {
  await db.runAsync(
    'INSERT INTO items (name, price, quantity, created_at) VALUES (?, ?, ?, ?)',
    item.name,
    item.price,
    item.quantity,
    new Date().toISOString(),
  );
}

export function getItems(db: SQLite.SQLiteDatabase) {
  return db.getAllAsync<Item>(
    'SELECT id, name, price, quantity, created_at FROM items ORDER BY id DESC',
  );
}
