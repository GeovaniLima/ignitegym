import {
  Heading,
  Text,
  Pressable,
  IPressableProps,
  VStack
} from "native-base";

type Props = IPressableProps & {
  date: string;
  op: string;
  situation: string;
  typeOp: string;
  faction: string;
  amount: string;
}

export function CardOp({
  date,
  op,
  situation,
  typeOp,
  faction,
  amount,
  ...rest
}: Props) {
  return (
    <Pressable
      bg="green.700"
      rounded="md"
      py={5}
      mb={5}
      _pressed={{
        bg: "green.500"
      }}
      {...rest}
    >

      <Heading
        color="white"
        fontFamily="heading"
        fontSize="md"
        textAlign="center"
      >
        {date}
      </Heading>

      <VStack
        px={5}
        pt={2}
      >
        <Text
          color="white"
          fontSize="sm"
        >
          {op}
        </Text>

        <Text
          color="white"
          fontSize="sm"
        >
          {situation}
        </Text>

        <Text
          color="white"
          fontSize="sm"
        >
          {typeOp}
        </Text>

        <Text
          color="white"
          fontSize="sm"
        >
          {faction}
        </Text>

        <Text
          color="white"
          fontSize="sm"
        >
          {amount}
        </Text>
      </VStack>
      
    </Pressable>
  )
}