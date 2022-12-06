import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  HStack,
  ScrollView,
  VStack,
  Text,
  useToast
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
  motives: string;
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
  motives: yup.string().required('Informe os motivos.'),
  amountRecovered: yup.string().required('Informe a quantidade recuperadas.'),
  secondQuality: yup.string().required('Informe a quantidade de segunda qualidade.'),
  downTime: yup.string().required('Informe o tempo parado.'),
  motifStopped: yup.string().required('Informe o motivo do tempo parado.'),
})

import { ScreenHeader } from "@components/ScreenHeader";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { AppError } from '@utils/AppError';
import { api } from '@services/api';


export function InspectionOpNew() {
  const toast = useToast();
  const empresa = 50;
  const token = 'eyJhbGciOiJFUzI1NiJ9.eyJzdWIiOiJjeC5kaGllZ28uc2FudG9zIiwiaXNzIjoiY3N3U2VydmVyIiwiaWF0IjoxNjY4Nzc5NjU3LCJhdWQiOiJjc3dWaWV3IiwiY3N3VG9rZW4iOiJ0WHJQY0xzN1o0UmNvdnY2VGo2a3h3IiwiZGJOYW1lU3BhY2UiOiJzaXN0ZW1hcyJ9.Z6usyCyYXDl8yAQbfkDbritv-bCHvgqL7Ehu9FtCGMpBB4FC2SY9v4qOCZGswjTf6qKVotmbgZCARxx_FmfWMw';
  const codInspetor = 99;

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(inspectionNewOpSchema)
  });

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleFineshid() {
    //navigation.navigate('fineshid')
  }

  async function fetchSave({
    dateInspection,
    codeOp,
    amountOp,
    amountOpen,
    amountRecovered,
    secondQuality,
    motifStopped,
    situationOp,
    downTime,
    motives
  }: FormDataProps) {
    try {
      
      const response = await api.put(`/custom/v10/inspecaoQualidade`, {
        headers: {
          'Authorization': `${token}`,
          'empresa': `${empresa}`
        },
        body: {
          'dataInspecao': `${dateInspection}`,
          'codInspetor': `${codInspetor}`,
          'codOrdemProducao': `${codeOp}`,
          'qtdAmostras': `${amountOp}`,
          'qtdAbertas': `${amountOpen}`,
          'qtdRecuperadas': `${amountRecovered}`,
          'qtdSegundaQualidade': `${secondQuality}`,
          'motivos': `${motives}`,
          'codStatus': `${situationOp}`,
          'tempoParadoMinutos': `${downTime}`,
          'observacao': `${motifStopped}`
        }
      });

      console.log(response.data);

    } catch (error) {
      console.log(error);
      const isAppError = error instanceof AppError;

      const title = isAppError ? "Não foi possivel salvar. Tente mais tarde" : 'Não foi possível salvar a OP. Tente novamente mais tarde.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    }
  }

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
             Digite os motivos
            </Text>

            <Controller 
              control={control}
              name="motives"
              render={({ field: {onChange, value} }) => (
                <Input 
                  placeholder='Digite os motivos'
                  keyboardType='numeric'
                  onChangeText={onChange}
                  
                  errorMessage={errors.motives?.message}
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
                  
                  errorMessage={errors.motifStopped?.message}
                />
              )}
            />
          </VStack>
        </HStack>
        
        <Button 
          title="Salvar Inspeção Realizada"
          onPress={handleSubmit(fetchSave)}
          mb={10}
        />
      </ScrollView>
    </VStack>
  )
}