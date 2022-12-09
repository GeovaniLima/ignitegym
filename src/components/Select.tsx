import { 
  Select as NativeBaseSelect,
  ISelectProps,
  FormControl
} from 'native-base';

type Props = ISelectProps & {
  errorMessage?: string | null;
};

export function Input({ errorMessage = null, ...rest }: Props) {
  const invalid = !!errorMessage;

  return(
    <FormControl
      isInvalid={invalid}
      mb={4}
    >
      <NativeBaseSelect 
        bg="white"
        h={14}
        px={4}
        borderWidth={1}
        fontSize="md"
        color="darkText"
        fontFamily="body"
        placeholderTextColor="gray.300"
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