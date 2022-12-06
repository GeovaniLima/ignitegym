import { 
  Text,
  Pressable,
  IPressableProps
} from "native-base";

type Props = IPressableProps & {
  title: string;
}

export function ModuleCard({ title, ...rest }: Props ) {

  return(
    <Pressable
      bg="green.700"
      mb={4}
      h={100}
      justifyContent="center"
      alignItems="center"
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
    </Pressable>
  )
}