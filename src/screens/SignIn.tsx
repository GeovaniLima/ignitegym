import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  VStack,
  Text,
  Center,
  Heading,
  ScrollView,
  useToast
} from 'native-base';

import { useAuth } from '@hooks/useAuth';
import { AppError } from '@utils/AppError';

type FormDataProps = {
  usuario: string;
  senha: string;
}

const signInSchema = yup.object({
  usuario: yup.string().required('Informe o usuário.'),
  senha: yup.string().required('Informe a senha.')
})

import { Input } from '@components/Input';
import { Button } from '@components/Button';

export function SignIn(){
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { signIn } = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema)
  });

  async function handleSignIn({ usuario, senha}: FormDataProps) {
    try {
      setIsLoading(true);
      await signIn(usuario, senha);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? 'Usuário ou senha inválidos!' : 'Não foi possível entrar. Tente novamente mais tarde.';
      
      setIsLoading(false);

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    }
  }

  return(
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1
      }}
      showsVerticalScrollIndicator={false}
    >
      <VStack
        bg="green.700"
        px={6}
      >
        <Center
          my={24}
        >
          <Heading
            color="white"
            fontFamily="heading"
            fontSize="4xl"
            fontWeight="bold"
          >
            Grupo AMC
          </Heading>
        </Center>
      </VStack>

      <VStack
        flex={1}
        bg="white"
        px={6}
        pb={16}
      >
        <Heading
          color="darkText"
          fontSize="sm"
          fontFamily="heading"
          mb={12}
          mt={12}
          textAlign="center"
        >
          Faça seu login para acessar o sistema
        </Heading>

        <Text
          color="gray.300"
          mb={1}
          fontSize="xs"
          fontFamily="body"
        >
          Usuário
        </Text>

        <Controller 
          control={control}
          name="usuario"
          render={({ field: { onChange } }) => (
            <Input 
              placeholder='Usuário'
              autoCapitalize='none'
              onChangeText={onChange}
              autoCorrect={false}
              errorMessage={errors.usuario?.message}
            />
          )}
        />

        <Text
          color="gray.300"
          mb={1}
          fontSize="xs"
          fontFamily="body"
        >
          Senha
        </Text>

        <Controller 
          control={control}
          name="senha"
          render={({ field: { onChange } }) => (
            <Input 
              placeholder='Senha'
              secureTextEntry
              onChangeText={onChange}
              errorMessage={errors.senha?.message}
            />
          )}
        />

        <Button 
          title="Acessar"
          onPress={handleSubmit(handleSignIn)}
          isLoading={isLoading}
        />

        <Text
          color="darkText"
          fontSize="xs"
          mt={3}
          fontFamily="body"
          textAlign="center"
        >
          Esqueceu a senha? Contate seu supervisor ou o TI
        </Text>
      </VStack>
    </ScrollView>
  )
}