import { StyleSheet } from 'react-native';

export const colors = {
  background: '#fff',
  text: '#111827',
  mutedText: '#6b7280',
};

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.background,
  },
  centeredScreen: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  title: {
    marginBottom: 16,
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  bodyText: {
    fontSize: 16,
    color: colors.text,
  },
});
