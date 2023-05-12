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
        <Text>Layout Mode</Text>
        <Select
          onChange={changeLayout}
          defaultValue={1}
          data={[
            { value: 1, label: "動画学習" },
            { value: 2, label: "教科書学習" },
            { value: 3, label: "シャドーイング" },
            { value: 4, label: "ノートに集中" },
          ]}
        />
      </Group>
    </Flex>
  );
};

export default SubHeader;
