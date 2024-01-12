import api from './service/api';
import api2 from './service/api2';
import ItemList from './components/ItemList';
import { Container, Heading } from '@chakra-ui/react'

export default async function Home() {
  const products = await api.list()
  const products2 = await api2.list()

  return (
    <main className="">
      <Container marginTop="20px">
        <Heading as="h1" size="2xl" marginBottom="20px" textAlign="center">Tiendita</Heading>
        <ItemList products={products} />
      </Container>
    </main>
  )
}
