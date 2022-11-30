import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { DateTimePickerAndroid }  from '@react-native-community/datetimepicker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  HStack,
  ScrollView,
  VStack,
  Text
} from 'native-base';

type FormDataProps = {
  dateInspection: string;
  week: string;
  month: string;
  codeOp: string;
  sampling: string;
  situationOp: string;
  typeOp: string;
  faction: string;
  amountOp: string;
  amountOpen: string;
  amountRecovered: string;
  secondQuality: string;
  downTime: string;
  motifStopped: string;
}

const inspectionNewOpSchema = yup.object({
  dateInspection: yup.string().required('Informe a data da inspeção.'),
  week: yup.string().required('Informe a semana da inspeção.'),
  month: yup.string().required('Informe o mês da inspeção.'),
  codeOp: yup.string().required('Informe o código da op.'),
  sampling: yup.string().required('Informe a amostragem.'),
  situationOp: yup.string().required('Informe a situação da op.'),
  typeOp: yup.string().required('Informe o tipo da op.'),
  faction: yup.string().required('Informe a facção.'),
  amountOp: yup.string().required('Informe a quantidade de op.'),
  amountOpen: yup.string().required('Informe a quantidade abertas.'),
  amountRecovered: yup.string().required('Informe a quantidade recuperadas.'),
  secondQuality: yup.string().required('Informe a quantidade de segunda qualidade.'),
  downTime: yup.string().required('Informe o tempo parado.'),
  motifStopped: yup.string().required('Informe o motivo do tempo parado.'),
})


import { ScreenHeader } from "@components/ScreenHeader";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { AppNavigatorRoutesProps } from '@routes/app.routes';


export function InspectionNewOp() {

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(inspectionNewOpSchema)
  });

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleFineshid({ 
    dateInspection, 
    week,
    month,
    codeOp,
    sampling,
    situationOp,
    typeOp,
    faction,
    amountOp,
    amountOpen,
    amountRecovered,
    secondQuality,
    downTime,
    motifStopped
  }: FormDataProps) {
    console.log({ 
      dateInspection, 
      week,
      month,
      codeOp,
      sampling,
      situationOp,
      typeOp,
      faction,
      amountOp,
      amountOpen,
      amountRecovered,
      secondQuality,
      downTime,
      motifStopped
    });

    navigation.navigate('fineshid')
  }

  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };


  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return(
    <VStack
      flex={1}
      bg="white"
    >
      <ScreenHeader 
        title="Inspecionar OP"
        bg="green.700"
        color="white"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        mt={5}
        px={6}
      >
        <HStack>
          <VStack
            flex={1}
            mr={1}
          >
            <Text
              color="gray.300"
              mb={1}
              fontSize="xs"
              fontFamily="body"
            >
             Data da Inspeção
            </Text>

            <Controller 
              control={control}
              name="dateInspection"
              render={({ field: {onChange, value} }) => (
                <Input 
                  placeholder='Data'
                  onChangeText={onChange}
                  value={value}
                  //onPressIn={showDatepicker}
                  errorMessage={errors.dateInspection?.message}
                />
              )}
            />
          </VStack>

          <VStack
            flex={1}
            mr={1}
          >
            <Text
              color="gray.300"
              mb={1}
              fontSize="xs"
              fontFamily="body"
            >
             Semana
            </Text>

            <Controller 
              control={control}
              name="week"
              render={({ field: {onChange, value} }) => (
                <Input 
                  placeholder='Semana'
                  autoCapitalize='none'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.week?.message}
                />
              )}
            />
          </VStack>

          <VStack
            flex={1}
          >
            <Text
              color="gray.300"
              mb={1}
              fontSize="xs"
              fontFamily="body"
            >
             Mês
            </Text>

            <Controller 
              control={control}
              name="month"
              render={({ field: {onChange, value} }) => (
                <Input 
                  placeholder='Mês'
                  autoCapitalize='none'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.month?.message}
                />
              )}
            />
          </VStack>
        </HStack>

        <HStack>
          <VStack
            flex={2}
            mr={1}
          >
            <Text
              color="gray.300"
              mb={1}
              fontSize="xs"
              fontFamily="body"
            >
             Digite ou leia o código da op
            </Text>

            <Controller 
              control={control}
              name="codeOp"
              render={({ field: {onChange, value} }) => (
                <Input 
                  placeholder='Digite ou leia o código da op'
                  keyboardType='numeric'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.codeOp?.message}
                />
              )}
            />
          </VStack>

          <VStack
            flex={1}
            mr={1}
          >
            <Text
              color="gray.300"
              mb={1}
              fontSize="xs"
              fontFamily="body"
            >
             Amostragem
            </Text>

            <Controller 
              control={control}
              name="sampling"
              render={({ field: {onChange, value} }) => (
                <Input 
                  placeholder='Amostragem'
                  keyboardType='numeric'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.sampling?.message}
                />
              )}
            />
          </VStack>
        </HStack>

        <HStack>
          <VStack
            flex={1}
            mr={1}
          >
            <Text
              color="gray.300"
              mb={1}
              fontSize="xs"
              fontFamily="body"
            >
             Situação da op
            </Text>

            <Controller 
              control={control}
              name="situationOp"
              render={({ field: {onChange, value} }) => (
                <Input 
                  placeholder='Situação da op'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.situationOp?.message}
                />
              )}
            />
          </VStack>

          <VStack
            flex={1}
            mr={1}
          >
            <Text
              color="gray.300"
              mb={1}
              fontSize="xs"
              fontFamily="body"
            >
             Tipo
            </Text>

            <Controller 
              control={control}
              name="typeOp"
              render={({ field: {onChange, value} }) => (
                <Input 
                  placeholder='Tipo'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.typeOp?.message}
                />
              )}
            />
          </VStack>
        </HStack>

        <HStack>
          <VStack
            flex={2}
            mr={1}
          >
            <Text
              color="gray.300"
              mb={1}
              fontSize="xs"
              fontFamily="body"
            >
             Facção
            </Text>

            <Controller 
              control={control}
              name="faction"
              render={({ field: {onChange, value} }) => (
                <Input 
                  placeholder='Facção'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.faction?.message}
                />
              )}
            />
          </VStack>

          <VStack
            flex={1}
            mr={1}
          >
            <Text
              color="gray.300"
              mb={1}
              fontSize="xs"
              fontFamily="body"
            >
             Quantidade da op
            </Text>

            <Controller 
              control={control}
              name="amountOp"
              render={({ field: {onChange, value} }) => (
                <Input 
                  placeholder='Quantidade da op'
                  keyboardType='numeric'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.amountOp?.message}
                />
              )}
            />
          </VStack>
        </HStack>

        <HStack>
          <VStack
            flex={1}
            mr={1}
          >
            <Text
              color="gray.300"
              mb={1}
              fontSize="xs"
              fontFamily="body"
            >
             Qtd.abertas
            </Text>

            <Controller 
              control={control}
              name="amountOpen"
              render={({ field: {onChange, value} }) => (
                <Input 
                  placeholder='Quantidade abertas'
                  keyboardType='numeric'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.amountOpen?.message}
                />
              )}
            />
          </VStack>

          <VStack
            flex={1}
            mr={1}
          >
            <Text
              color="gray.300"
              mb={1}
              fontSize="xs"
              fontFamily="body"
            >
             Qtd. recuperada
            </Text>

            <Controller 
              control={control}
              name="amountRecovered"
              render={({ field: {onChange, value} }) => (
                <Input 
                  placeholder='Quantidade recuperada'
                  keyboardType='numeric'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.amountRecovered?.message}
                />
              )}
            />
          </VStack>

          <VStack
            flex={1}
            mr={1}
          >
            <Text
              color="gray.300"
              mb={1}
              fontSize="xs"
              fontFamily="body"
            >
             2ª qualidade
            </Text>

            <Controller 
              control={control}
              name="secondQuality"
              render={({ field: {onChange, value} }) => (
                <Input 
                  placeholder='2ª qualidade'
                  keyboardType='numeric'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.secondQuality?.message}
                />
              )}
            />
          </VStack>
        </HStack>

        <HStack>
          <VStack
            flex={1}
            mr={1}
          >
            <Text
              color="gray.300"
              mb={1}
              fontSize="xs"
              fontFamily="body"
            >
             Digite tempo parado (em minutos)
            </Text>

            <Controller 
              control={control}
              name="downTime"
              render={({ field: {onChange, value} }) => (
                <Input 
                  placeholder='Digite tempo parado (em minutos)'
                  keyboardType='numeric'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.downTime?.message}
                />
              )}
            />
          </VStack>
        </HStack>

        <HStack>
          <VStack
            flex={1}
            mr={1}
          >
            <Text
              color="gray.300"
              mb={1}
              fontSize="xs"
              fontFamily="body"
            >
             Digite o motivo do tempo parado
            </Text>

            <Controller 
              control={control}
              name="motifStopped"
              render={({ field: {onChange, value} }) => (
                <Input 
                  placeholder='Digite o motivo do tempo parado'
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.motifStopped?.message}
                />
              )}
            />
          </VStack>
        </HStack>
        
        <Button 
          title="Salvar Inspeção Realizada"
          onPress={handleSubmit(handleFineshid)}
          mb={10}
        />
      </ScrollView>
    </VStack>
  )
}