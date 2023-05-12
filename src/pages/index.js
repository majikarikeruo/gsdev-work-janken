/**
 * Mantine
 */
import {
  Container,
  Title,
  Card,
  SimpleGrid,
  Text,
  Button,
  Image,
} from "@mantine/core";

/**
 * components
 */
import Layout from "@/components/layout";

export default function Home() {
  return (
    <Layout>
      <Container size="lg" className="py-6">
        <Title order={2} size="h3" className="mb-4">
          レッスン一覧
        </Title>
        <SimpleGrid cols={3} spacing="lg">
          {[...Array(5)].map((item, index) => (
            <Card shadow="sm" padding="lg" radius="md" withBorder key={index}>
              <Card.Section>
                <Image
                  src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                  height={240}
                  alt="Norway"
                />
              </Card.Section>
              <Card.Section className="p-4 px-6 pb-4">
                <Title order={3} size="h4">
                  時代華語{index + 1}
                </Title>
                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  mt="md"
                  radius="md"
                >
                  レッスン詳細へ
                </Button>
              </Card.Section>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  );
}
