import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import * as GlobalStyles from '../../styles/GlobalStyles'

export default function LoadingScreen ({ navigation }) {
  useEffect(() => {
    // Simulamos una carga de datos (esto se puede reemplazar con tu lógica real)
    setTimeout(() => {
      navigation.navigate('RestaurantsScreen') // Una vez cargado, redirigimos
    }, 3000) // 3 segundos de espera para la demostración
  }, [navigation])

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={GlobalStyles.brandPrimary} />
      <Text style={styles.loadingText}>Loading restaurants, please wait...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'blue'
  }
})
