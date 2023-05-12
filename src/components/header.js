/**
 * Mantine
 */
import {
  Burger,
  Header as MantineHeader,
  Avatar,
  Title,
  NavLink,
  Divider,
  Button,
  Drawer,
  Flex,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";

/**
 * Icons
 */
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const Header = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <MantineHeader
      height={60}
      p="xs"
      className="fixed top-0 z-10
    "
    >
      <Flex justify="space-between" align="center">
        <Drawer
          opened={opened}
          onClose={close}
          size="xs"
          title="メニュー"
          overlayProps={{ opacity: 0.5, blur: 4 }}
          closeButtonProps={{ borderColor: "black" }}
          transitionProps={{ duration: 200, transition: "POP-TOP-LEFT" }}
        >
          {/* Drawer content */}
          <NavLink
            label="ノート一覧"
            className="p-4 px-5"
            active
            rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
          />
        </Drawer>

        <Burger onClick={open} />

        <Title order={1} size="h3">
          あぷり
        </Title>
        <Avatar
          src="https://kosugelian.net/images/stamp18.png"
          radius="xl"
          className="border border-gray-200 border-solid p-1"
        />
      </Flex>
    </MantineHeader>
  );
};
export default Header;
