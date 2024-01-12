import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Icon,
  Link,
  Box,
  Heading,
  Divider,
  AbsoluteCenter,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Tag,
  Flex,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Product } from "../types/product";
import { FaCartShopping, FaRegTrashCan, FaWhatsapp } from "react-icons/fa6";
import { parseCurrency } from "../lib/utils";

interface Props {
    carrito: Product[];
    order: string;
    resetCart: () => void;
}


function DrawerExample({ carrito, order, resetCart }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen} leftIcon={<FaCartShopping />} margin="20px 0px">
        Checkout ({carrito.length})
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader><Icon as={FaCartShopping} marginRight="15px"/>Carrito de compras</DrawerHeader>

          <DrawerBody>
            Detalle del pedido:
            <TableContainer marginTop="10px">
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Artículo</Th>
                    <Th isNumeric>Precio</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {carrito.map((product) => (
                    <>
                      <Tr>
                        <Td>{product.title}</Td>
                        <Td isNumeric>{parseCurrency(product.price)}</Td>
                      </Tr>
                    </>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <Box position="relative" padding="10">
              <Divider />
              <AbsoluteCenter bg="white" px="4">
                Total
              </AbsoluteCenter>
            </Box>
            <Flex justifyContent="center">
                <Tag size="lg" variant='subtle' colorScheme='cyan'>
                    {parseCurrency(
                    carrito.reduce((total, product) => total + product.price, 0)
                    )}
                </Tag>
            </Flex>
            <Flex justifyContent="center" margin="10px 0px">


            {Boolean(carrito?.length) && (
              <Button
                colorScheme="whatsapp"
                margin="20px 0px"
                as={Link}
                href={`https://wa.me/${3537599073}?text=${encodeURIComponent(
                  order
                )}`}
                isExternal
              >
                <Icon as={FaWhatsapp} marginRight="5px" />
                Realizar pedido ({carrito.length})
              </Button>
            )}
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button colorScheme="red" onClick={resetCart} leftIcon={<FaRegTrashCan />}>
                Borrar pedido
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerExample;
