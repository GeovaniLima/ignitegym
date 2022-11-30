import { 
  Text,
  Button,
  IButtonProps,
} from "native-base";

type Props =  IButtonProps & {
  title: string;
  size?: number;
}

export function ModuleCard({ size, title, ...rest }: Props ) {
  return(
    <Button
      mr={2}
      mb={2}
      h={size}
      w={size}
      bg="green.700"
      rounded="md"
      _pressed={{
        bg: "green.500"
      }}
      {...rest}
    >
      <Text
        color="white"
        fontSize="md"
        fontFamily="body"
      >
        {title}
      </Text>
    </Button>
  )
}