import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import * as yup from 'yup'
import { createCategory } from '../../api/RestaurantEndpoints'
import InputItem from '../../components/InputItem'
import TextError from '../../components/TextError'
import TextRegular from '../../components/TextRegular'
import TextSemiBold from '../../components/TextSemibold'
import * as GlobalStyles from '../../styles/GlobalStyles'

const helpMessages = [
  '¡Crear una nueva categoría de comida implica un nuevo universo de sabores!',
  '¿No sabes cómo nombrar a tu nueva categoría de comida? ¡Pide ayuda a la IA!',
  'Sólo el creador sabe el secreto del sabor.',
  '¡Buenos días! Espero que te vaya todo bien en tu restaurante.',
  "Mi categoría favorita es la 'Spanish Food', ¿sabes por qué?: ¡porque España tiene la mejor dieta del mundo!"
]

export default function CreateRestaurantCategoryScreen ({ navigation, route }) {
  const [backendErrors, setBackendErrors] = useState()

  const [randomHelpMessage, setRandomHelpMessage] = useState()
  const [selectedfontSize, setselectedFontSize] = useState(16)

  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(GlobalStyles.brandSuccess)
  const [selectedColor, setSelectedColor] = useState(GlobalStyles.brandSuccess)

  const initialRestaurantCategoryValues = { name: null }
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Name is required')
      .min(3, 'Name too short')
      .max(50, 'Name too long')
  })

  const createRestaurantCategory = async (values) => {
    setBackendErrors([])
    try {
      const createdCategory = await createCategory(values)
      showMessage({
        message: `Restaurant category ${createdCategory.name} successfully created!`,
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
      navigation.goBack()
    } catch (err) {
      console.log(err)
      setBackendErrors(err.errors)
    }
  }

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * helpMessages.length)
    setRandomHelpMessage(helpMessages[randomIndex])
  }, [])

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialRestaurantCategoryValues}
      onSubmit={createRestaurantCategory}>
      {({ handleSubmit, setFieldValue, values }) => (
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: '60%' }}>
              <InputItem
                name='name'
                label='Restaurant Category Name:'
              />

              {backendErrors &&
                backendErrors.map((error, index) => <TextError key={index}>{error.param}-{error.msg}</TextError>)
              }

              {randomHelpMessage !== null &&
                <View style={{ margin: 10 }}>
                  <TextSemiBold style={{ textAlign: 'center', fontSize: selectedfontSize }}>{randomHelpMessage}</TextSemiBold>
                </View>
              }

              { /*
                    Vista botones color
              */ }
              <View style={ styles.buttonContainer }>
                <Pressable
                  onPress={() => {
                    setSelectedBackgroundColor('red')
                    setSelectedColor('red')
                  }}
                  style={({ pressed }) => [
                    styles.colorButton,
                    {
                      alignSelf: 'flex-start',
                      marginLeft: 0,
                      backgroundColor: selectedColor === 'red'
                        ? 'red'
                        : pressed
                          ? '#333'
                          : GlobalStyles.brandSuccess
                    },
                    selectedColor === 'red' && styles.activeColorButton // Hace que el botón "se mantenga presionado" visualmente
                  ]}>
                    <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                      <TextRegular textStyle={styles.text}>
                        Red
                      </TextRegular>
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => {
                    setSelectedBackgroundColor('green')
                    setSelectedColor('green')
                  }}
                  style={({ pressed }) => [
                    styles.colorButton,
                    {
                      backgroundColor: selectedColor === 'green'
                        ? 'green'
                        : pressed
                          ? '#333'
                          : GlobalStyles.brandSuccess
                    },
                    selectedColor === 'green' && styles.activeColorButton
                  ]}>
                    <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                      <TextRegular textStyle={styles.text}>
                        Green
                      </TextRegular>
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => {
                    setSelectedBackgroundColor('pink')
                    setSelectedColor('pink')
                  }}
                  style={({ pressed }) => [
                    styles.colorButton,
                    {
                      backgroundColor: selectedColor === 'pink'
                        ? 'pink'
                        : pressed
                          ? '#333'
                          : GlobalStyles.brandSuccess
                    },
                    selectedColor === 'pink' && styles.activeColorButton
                  ]}>
                    <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                      <TextRegular textStyle={styles.text}>
                        Pink
                      </TextRegular>
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => {
                    setSelectedBackgroundColor('orange')
                    setSelectedColor('orange')
                  }}
                  style={({ pressed }) => [
                    styles.colorButton,
                    {
                      backgroundColor: selectedColor === 'orange'
                        ? 'orange'
                        : pressed
                          ? '#333'
                          : GlobalStyles.brandSuccess
                    },
                    selectedColor === 'orange' && styles.activeColorButton
                  ]}>
                    <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                      <TextRegular textStyle={styles.text}>
                        Orange
                      </TextRegular>
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => {
                    setSelectedBackgroundColor('blue')
                    setSelectedColor('blue')
                  }}
                  style={({ pressed }) => [
                    styles.colorButton,
                    {
                      backgroundColor: selectedColor === 'blue'
                        ? 'blue'
                        : pressed
                          ? '#333'
                          : GlobalStyles.brandSuccess
                    },
                    selectedColor === 'blue' && styles.activeColorButton
                  ]}>
                    <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                      <TextRegular textStyle={styles.text}>
                        Blue
                      </TextRegular>
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => {
                    setSelectedBackgroundColor('black')
                    setSelectedColor('black')
                  }}
                  style={({ pressed }) => [
                    styles.colorButton,
                    {
                      backgroundColor: selectedColor === 'black'
                        ? 'black'
                        : pressed
                          ? '#333'
                          : GlobalStyles.brandSuccess
                    },
                    selectedColor === 'black' && styles.activeColorButton
                  ]}>
                    <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                      <TextRegular textStyle={styles.text}>
                        Black
                      </TextRegular>
                  </View>
                </Pressable>
              </View>

              { /*
                    Vista botones texto
              */ }
              <View style={ styles.buttonContainer }>
                <Pressable
                  onPress={() => { setselectedFontSize(15) }}
                  style={({ pressed }) => [
                    styles.fontSizeButton,
                    {
                      alignSelf: 'flex-start',
                      marginLeft: 0,
                      backgroundColor: pressed
                        ? GlobalStyles.brandSuccessTap
                        : GlobalStyles.brandSuccess
                    },
                    selectedfontSize === 15 && styles.activeFontSizeButton
                  ]}>
                    <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                      <TextRegular textStyle={styles.text}>
                        15
                      </TextRegular>
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => { setselectedFontSize(20) }}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed
                        ? GlobalStyles.brandSuccessTap
                        : GlobalStyles.brandSuccess
                    },
                    styles.fontSizeButton,
                    selectedfontSize === 20 && styles.activeFontSizeButton
                  ]}>
                    <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                      <TextRegular textStyle={styles.text}>
                        20
                      </TextRegular>
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => { setselectedFontSize(25) }}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed
                        ? GlobalStyles.brandSuccessTap
                        : GlobalStyles.brandSuccess
                    },
                    styles.fontSizeButton,
                    selectedfontSize === 25 && styles.activeFontSizeButton
                  ]}>
                    <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                      <TextRegular textStyle={styles.text}>
                        25
                      </TextRegular>
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => { setselectedFontSize(30) }}
                  style={({ pressed }) => [
                    {
                      alignSelf: 'flex-end',
                      marginRight: 0,
                      backgroundColor: pressed
                        ? GlobalStyles.brandSuccessTap
                        : GlobalStyles.brandSuccess
                    },
                    styles.fontSizeButton,
                    selectedfontSize === 30 && styles.activeFontSizeButton
                  ]}>
                    <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                      <TextRegular textStyle={styles.text}>
                        30
                      </TextRegular>
                  </View>
                </Pressable>
              </View>

              <Pressable
              onPress={() => {
                handleSubmit()
              }}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? GlobalStyles.brandSuccessTap
                    : selectedBackgroundColor
                },
                styles.button
              ]}>
              <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                <MaterialCommunityIcons name='content-save' color={'white'} size={20}/>
                <TextRegular textStyle={styles.text}>
                  Save
                </TextRegular>
              </View>
            </Pressable>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  activeFontSizeButton: {
    backgroundColor: GlobalStyles.brandPrimary
  },
  activeColorButton: {
    backgroundColor: GlobalStyles.brandPrimary
  },
  buttonContainer: {
    flexDirection: 'row',
    bottom: 5,
    // position: 'absolute',
    width: '90%'
  },
  fontSizeButton: {
    borderRadius: 8,
    height: 40,
    padding: 10,
    width: '26.26%',
    margin: '1%'
  },
  colorButton: {
    borderRadius: 8,
    height: 40,
    padding: 10,
    width: '16.85%',
    margin: '1%'
  },
  button: {
    borderRadius: 8,
    height: 40,
    padding: 10,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginLeft: 5
  }
})
