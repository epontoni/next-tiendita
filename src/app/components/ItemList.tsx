'use client'
import { useState, useMemo } from "react";
import { Product } from "../types/product";
import { Link } from '@chakra-ui/next-js';
import { Button, Flex, Grid, Icon, Stack, Text } from "@chakra-ui/react";
import Item from "./Item";
import { parseCurrency } from "../lib/utils";
import { FaWhatsapp } from "react-icons/fa6";
import DrawerExample from "./Drawer";

interface Props {
  products: Product[];
}

export default function ItemList({ products } : Props) {
    const [cart, setCart] = useState<Product[]>([])
    const addToCart = (product: Product): void => {
      setCart(prevCart => [...prevCart, product])
    }
    const resetCart = (): void => {
      setCart([])
    }

    const text = useMemo(() => {
      console.log('cart changed, memo...', cart)
      return '```Detalle de su pedido:```\n\n' + cart
        .reduce(
          (order, product) =>
            order.concat(` - *${product.title.trim()}* - ${parseCurrency(product.price)}\n`),
          ``
        )
        .concat(
          `\n  *Total*: ${parseCurrency(cart.reduce(
            (total, product) => total + product.price,
            0
          ))}`
        );
    }, [cart]);
  return (
    <Stack>
        <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
          {
            products.map(
              (product) => (
                <Item key={product.id} product={product} addToCart={addToCart}/>
              )
            )
          }
        </Grid>
        {/*
          Boolean(cart.length) && (
            <Flex alignItems="center" justifyContent="center" marginTop="20px">
                <Button
                  colorScheme="whatsapp"
                  as={Link}
                  href={`https://wa.me/${3537599073}?text=${encodeURIComponent(text)}`}
                  isExternal
                >
                    <Icon as={FaWhatsapp} marginRight="5px" />Realizar pedido ({cart.length})
                </Button>
            </Flex>
            )
          */}
        <DrawerExample carrito={cart} order={text} resetCart={resetCart}/>
      </Stack>
  )
}
