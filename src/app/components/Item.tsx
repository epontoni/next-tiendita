import { Button, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Product } from "../types/product";
import { parseCurrency } from "../lib/utils";
import { FaCartPlus } from "react-icons/fa6";
import {motion, LayoutGroup, AnimatePresence} from 'framer-motion';

interface Props {
  product: Product;
  addToCart: (product: Product) => void;
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
}

export default function Item({product, addToCart, selectedImage, setSelectedImage} : Props) {
  return (<>
    <Stack key={product.id} backgroundColor="gray.100" textAlign="center" shadow='md' borderWidth='1px' padding="10px">
          <Heading fontSize='xl' marginTop="10px">{product.title}</Heading>
          <Image
            as={motion.img}
            cursor="pointer"
            layoutId={product.image}
            onClick={() => setSelectedImage(product.image)}
            src={product.image}
            alt={product.description}
            borderRadius='lg'
          />
          <Text>{product.description}</Text>
          <Text color="blue.600" fontSize="xl">{parseCurrency(product.price)}</Text>
          <Button colorScheme="blue" onClick={() => addToCart(product)} leftIcon={<FaCartPlus />}>Agregar</Button>
        </Stack>
        <AnimatePresence>
          {
            selectedImage && (
              <Flex
                key="backdrop"
                alignItems="center"
                as={motion.div}
                backgroundColor="rgba(0,0,0,0.5)"
                justifyContent="center"
                layoutId={selectedImage}
                position="fixed"
                top={0}
                left={0}
                width="100%"
                height="100%"
                onClick={() => setSelectedImage(null)}
              >
                  <Image key="image" src={selectedImage} alt={product.title}/>
              </Flex>
            )
          }
        </AnimatePresence>
    </>);
}

// Image
// objectFit="cover"
