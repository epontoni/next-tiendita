import { Button, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Product } from "../types/product";
import { parseCurrency } from "../lib/utils";
import { FaCartPlus } from "react-icons/fa6";

interface Props {
  product: Product;
  addToCart: (product: Product) => void;
}

export default function Item({product, addToCart} : Props) {
  return (
    <Stack key={product.id} backgroundColor="gray.100" textAlign="center" shadow='md' borderWidth='1px' padding="10px">
      <Heading fontSize='xl' marginTop="10px">{product.title}</Heading>
      <Image
        src={product.image}
        alt={product.description}
        borderRadius='lg'
      />
      <Text>{product.description}</Text>
      <Text color="blue.600" fontSize="xl">{parseCurrency(product.price)}</Text>
      <Button colorScheme="blue" onClick={() => addToCart(product)} leftIcon={<FaCartPlus />}>Agregar</Button>
    </Stack>
  );
}
