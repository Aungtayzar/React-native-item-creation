import { useRouter } from 'expo-router'
import { Button, Text, View } from 'react-native'
import { globalStyles } from '../../styles/global'

const Home = () => {
  const router = useRouter()

  return (
    <View style={globalStyles.centeredScreen}>
      <View>
        <Text style={globalStyles.title}>Home Screen</Text>
      </View>
      
      <View>
        <Text style={globalStyles.bodyText}>Hello, World!</Text>
      </View>

      <Button
        title="Add Items"
        onPress={() => router.push('/add-item')}
      />
      
    </View>
  )
}

export default Home
