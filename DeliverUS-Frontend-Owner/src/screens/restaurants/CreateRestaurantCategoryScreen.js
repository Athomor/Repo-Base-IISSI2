import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { Pressable, ScrollView, View, StyleSheet } from 'react-native'
import InputItem from '../../components/InputItem'
import { showMessage } from 'react-native-flash-message'
import * as yup from 'yup'
import { createCategory } from '../../api/RestaurantEndpoints'
import TextError from '../../components/TextError'
import TextRegular from '../../components/TextRegular'
import * as GlobalStyles from '../../styles/GlobalStyles'

export default function CreateRestaurantCategoryScreen ({ navigation, route }) {
  const [backendErrors, setBackendErrors] = useState()

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

              <Pressable
              onPress={() => {
                handleSubmit()
              }}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? GlobalStyles.brandSuccessTap
                    : GlobalStyles.brandSuccess
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
