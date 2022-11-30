import { 
  Input as NativeBaseInput,
  IInputProps,
  FormControl
} from 'native-base';

type Props = IInputProps & {
  errorMessage?: string | null;
};

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid;

  return(
    <FormControl
      isInvalid={invalid}
      mb={4}
    >
      <NativeBaseInput 
        bg="white"
        h={14}
        px={4}
        borderWidth={1}
        fontSize="md"
        color="darkText"
        fontFamily="body"
        placeholderTextColor="gray.300"  
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500"
        }}   
        _focus={{
          bg: "white",
          borderWidth: 1,
          borderColor: "green.700"
        }}
        {...rest}
      />

      <FormControl.ErrorMessage
        _text={{
          color: "red.500"
        }}
      >
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}