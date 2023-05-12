/**
 * Mantine
 */
import {
  Container,
  Title,
  Avatar,
  Accordion,
  Text,
  Group,
} from "@mantine/core";

/**
 * components
 */
import Layout from "@/components/layout";

const LessonId = ({ lesson }) => {
  return (
    <Layout>
      <Container size="lg" className="py-6">
        <Title order={2} size="h3" className="mb-4">
          時代華語 2
        </Title>

        <Accordion defaultValue="kosuge">
          {[...Array(5)].map((item, index) => (
            <Accordion.Item
              value={`kosuge${index}`}
              className="w-fullborder-t border-gray-100 border-solid"
              key={index}
            >
              <Accordion.Control className="p-4 py-2">
                <Group>
                  <Avatar
                    src="https://kosugelian.net/images/stamp18.png"
                    radius="xl"
                  />
                  <div style={{ flex: 1 }}>
                    <Text size="md" weight={700}>
                      第{index + 1}課 あいさつ
                    </Text>

                    <Text color="dimmed" size="xs">
                      レッスン数4
                    </Text>
                  </div>
                </Group>
              </Accordion.Control>
              <Accordion.Panel className="p-4 bg-gray-50">
                {[...Array(5)].map((item, idx) => (
                  <Group key={idx} className="p-2">
                    <Text size="md" weight={500}>
                      <span className="mr-3">
                        {index}-{idx + 1}.
                      </span>
                      歡迎到我家來玩
                    </Text>
                  </Group>
                ))}
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </Layout>
  );
};

export default LessonId;
