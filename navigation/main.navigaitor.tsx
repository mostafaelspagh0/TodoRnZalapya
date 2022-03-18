import { createStackNavigator } from '@react-navigation/stack'
import Home from '../pages/Home.page'
import TodoListPage from '../pages/TodoLIst.page'
const Stack = createStackNavigator<RootStackParamList>()

export default function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="TodoList" component={TodoListPage} />
    </Stack.Navigator>
  )
}
