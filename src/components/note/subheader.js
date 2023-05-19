/**
 * Mantine
 */
import {
  Select,
  Flex,
  Text,
  Group,
  Drawer,
  Button,
  Divider,
  ActionIcon,
  NavLink,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";

/**
 * Icons
 */
import {
  IconLayoutSidebarLeftExpand,
  IconChevronLeft,
  IconChevronRight,
  IconBrandYoutube,
  IconNotebook,
  IconWriting,
  IconMessages,
} from "@tabler/icons-react";

const SubHeader = ({ changeLayout }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Flex
      justify="space-between"
      align="center"
      className="p-4 bg-[#222222] text-white fixed top-[60px] w-full z-10"
    >
      <Drawer
        opened={opened}
        onClose={close}
        size="xs"
        title="第一課 我得做家事"
        overlayProps={{ opacity: 0.5, blur: 4 }}
        closeButtonProps={{ borderColor: "black" }}
        transitionProps={{ duration: 200, transition: "POP-TOP-LEFT" }}
      >
        {/* Drawer content */}
        <NavLink
          label="1-1. 我得做家事"
          className="p-4 px-5"
          active
          rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
        />
        <NavLink
          label="1-2. 我得做家事"
          className="p-4 px-5"
          rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
        />
        <NavLink
          label="1-3. 我得做家事"
          className="p-4 px-5"
          rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
        />
        <NavLink
          label="1-4. 我得做家事"
          className="p-4 px-5"
          rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
        />
        <Divider color="#ddd" />
        <NavLink
          label="レッスン一覧に戻る"
          className="py-4 px-0"
          icon={<IconChevronLeft size="1rem" stroke={1.5} />}
        />
      </Drawer>

      <Button onClick={open} className="bg-transparent px-0">
        <IconLayoutSidebarLeftExpand size="1.5rem" />
      </Button>

      <Group>
        <Group>
          <ActionIcon
            color="dark"
            size="xl"
            radius="xl"
            variant="filled"
            className="flex flex-col"
            onClick={(e) => changeLayout(1)}
          >
            <IconBrandYoutube size="2rem" />
            <span className="inline-block mt-1 text-[10px]">動画</span>
          </ActionIcon>

          <ActionIcon
            color="dark"
            size="xl"
            radius="xl"
            variant="filled"
            className="flex flex-col"
            onClick={(e) => changeLayout(2)}
          >
            <IconNotebook size="2rem" />
            <span className="inline-block mt-1 text-[10px]">テキスト</span>
          </ActionIcon>

          <ActionIcon
            color="dark"
            size="xl"
            radius="xl"
            variant="filled"
            className="flex flex-col"
            onClick={(e) => changeLayout(3)}
          >
            <IconMessages size="2rem" />
            <span className="inline-block mt-1 text-[10px]">発声</span>
          </ActionIcon>

          <ActionIcon
            color="dark"
            size="xl"
            radius="xl"
            variant="filled"
            className="flex flex-col"
            onClick={(e) => changeLayout(4)}
          >
            <IconWriting size="2rem" />
            <span className="inline-block mt-1 text-[10px]">ノート</span>
          </ActionIcon>
        </Group>
      </Group>
    </Flex>
  );
};

export default SubHeader;
