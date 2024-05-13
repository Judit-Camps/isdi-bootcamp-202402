// @ts-nocheck
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'
import MainTabs from './navigation/MainTabs'
import MainStack from './navigation/MainStack'
import { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Context } from './context'
import "react-native-reanimated"
import Confirm from './components/Confirm'

export default function App() {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [stamp, setStamp] = useState(null)
  const [confirm, setConfirm] = useState(null)

  const handleConfirm = (message, callback) => setConfirm({ message, callback })

  const handleConfirmCancelClick = () => {
    confirm.callback(false)

    setConfirm(null)
  }

  const handleConfirmAcceptClick = () => {
    confirm.callback(true)

    setConfirm(null)
  }

  return (
    <>
      <Context.Provider value={{ user, setUser, role, setRole, stamp, setStamp, showConfirm: handleConfirm }}>

        <NavigationContainer >
          <MainStack >

            {/* {confirm && <Confirm message="confirmar" onCancelClick={handleConfirmCancelClick} onAcceptClick={handleConfirmAcceptClick} />} */}
          </MainStack>
        </NavigationContainer>

      </Context.Provider>


    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  text: {
    text: {
      fontSize: 24,
      fontWeight: 'bold',
    }
  }
})
