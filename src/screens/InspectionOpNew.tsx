import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { yupResolver } from '@hookform/resolvers/yup';
//import * as yup from 'yup';

import {
  HStack,
  ScrollView,
  VStack,
  Text,
  Select,
  useToast,
  FlatList,
  Box
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

/*const inspectionNewOpSchema = yup.object({
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
})*/

import { ScreenHeader } from "@components/ScreenHeader";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { AppError } from '@utils/AppError';
import { api } from '@services/api';
import { InspectorDTO } from '@dtos/InspectorDTO';
import { InspectionOpDTO } from '@dtos/InspectionOpDTO';


export function InspectionOpNew() {
  const [date, setDate] = useState(new Date());
  const [inspector, setInspector] = useState<InspectorDTO>();
  const [validaOp, setValidaOp] = useState<InspectionOpDTO[]>([]);

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
    //let data = new Date();
    //let dataFormatada = ((data.getDate()) + "-" + ((data.getMonth() + 1)) + "-" + data.getFullYear()); 

    showMode('date');
  };

  const toast = useToast();
  const empresa = 50;
  const token = 'eyJhbGciOiJFUzI1NiJ9.eyJzdWIiOiJjeC5kaGllZ28uc2FudG9zIiwiaXNzIjoiY3N3U2VydmVyIiwiaWF0IjoxNjY4Nzc5NjU3LCJhdWQiOiJjc3dWaWV3IiwiY3N3VG9rZW4iOiJ0WHJQY0xzN1o0UmNvdnY2VGo2a3h3IiwiZGJOYW1lU3BhY2UiOiJzaXN0ZW1hcyJ9.Z6usyCyYXDl8yAQbfkDbritv-bCHvgqL7Ehu9FtCGMpBB4FC2SY9v4qOCZGswjTf6qKVotmbgZCARxx_FmfWMw';
  const codInspetor = 99;

  const { control, handleSubmit } = useForm<FormDataProps>({
    
  });

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleFineshid() {
    //fetchSave()
    navigation.navigate('fineshid')
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
      },{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
          'empresa': `${empresa}`
        }
      });

      console.log(response);

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

  async function fetchInspector() {
    try {
      const response = await api.get(`/custom/v10/inspetorQualidade?empresa=${empresa}`, {
        headers: {
          'Authorization': `${token}`
        }
      });

      const descInspetor = response.data.data[0].descInspetor;
      console.log(descInspetor);
      setInspector(descInspetor);

    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? "Não foi possivel carregar. Tente mais tarde" : 'Não foi possível carregar os Inspetores. Tente novamente mais tarde.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    }
  }

  async function fetchOps(id: string) {
    try {
      const response = await api.get(`/ppcpconfeccao/v10/ordemProducao/${id}`, {
        headers: {
          'Authorization': `${token}`,
          'empresa': `${empresa}`
        }
      });

      setValidaOp(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? "Não foi possivel carregar. Tente mais tarde" : 'Não foi possível ler as OPs. Tente novamente mais tarde.';

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
                    value={date.toLocaleString()}
                    onPressIn={showDatepicker}
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
              Inspetor
              </Text>

              <Controller 
                control={control}
                name="codeOp"
                render={({ field: {onChange, value} }) => (
                  <Select
                    h={14}
                    mb={4}
                    fontSize="md"
                    color="darkText"
                    fontFamily="body"
                    onOpen={fetchInspector}
                  >
                    <Select.Item label={inspector} value="ux" />
                  </Select>
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
                    onBlur={() => fetchOps(value)}
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
                  render={() => (
                    <Box
                      borderWidth={1}
                      borderColor='gray.200'
                      h={14}
                      justifyContent='center'
                      rounded='md'
                    >
                      <Text
                        fontSize="md"
                        color="darkText"
                        fontFamily="body"
                        pl={2}
                      >
                        {validaOp.qtdOrdemProducao}
                      </Text>
                    </Box>
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
                render={() => (
                  <Box
                    borderWidth={1}
                    borderColor='gray.200'
                    h={14}
                    justifyContent='center'
                    rounded='md'
                  >
                    <Text
                      fontSize="md"
                      color="darkText"
                      fontFamily="body"
                      pl={2}
                    >
                      {validaOp.descEngenharia}
                    </Text>
                  </Box>
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
                render={() => (
                  <Box
                    borderWidth={1}
                    borderColor='gray.200'
                    h={14}
                    justifyContent='center'
                    rounded='md'
                  >
                    <Text
                      fontSize="md"
                      color="darkText"
                      fontFamily="body"
                      pl={2}
                    >
                      {validaOp.descTipoOrdemProducao}
                    </Text>
                  </Box>
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
              Status
              </Text>

              <Controller 
                control={control}
                name="situationOp"
                render={({ field: {onChange, value} }) => (
                  <Select
                    h={14}
                    fontSize="md"
                    color="darkText"
                    fontFamily="body"
                  >
                    <Select.Item label="Aprovado" value="1" />
                    <Select.Item label="Reprovado" value="2" />
                    <Select.Item label="Cancelado" value="3" />
                  </Select>
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