/**
 * React
 */
import { useEffect, useState, useMemo } from "react";

/**
 * Mantine
 */
import { Modal, Button, ActionIcon, createStyles } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

/**
 * Icons
 */
import { IconNote, IconVideo } from "@tabler/icons-react";

/**
 * Components
 */
import Layout from "@/components/layout";
import SubHeader from "@/components/note/subheader";
import Youtube from "@/components/note/youtube";
import AudioPanel from "@/components/note/AudioPanel";
import CanvasPanel from "@/components/note/CanvasPanel";
import PdfPanel from "@/components/note/PdfPanel";
import Listening from "@/components/note/Listening";

const useStyles = createStyles((theme) => ({
  body: {
    padding: 0,
  },
}));

const Note = ({}) => {
  const { classes } = useStyles();

  /**
   * useState
   */
  const [layout, setLayout] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);

  /**
   * useEffect
   */
  useEffect(() => {}, []);

  return (
    <Layout>
      <SubHeader changeLayout={setLayout}></SubHeader>

      {/* 動画学習 */}
      {layout === 1 && (
        <>
          <Youtube className="w-full" />

          <div className="h-[calc(100vh_-_554px)] overflow-y-scroll overflow-x-hidden">
            <CanvasPanel className="h-full grid-item" />
          </div>
        </>
      )}

      {/* 教科書学習 */}
      {layout === 2 && (
        <div className="relative">
          <div className="h-[calc(100vh_-_184px)] overflow-y-scroll">
            <PdfPanel layout={layout} />
          </div>

          <Modal
            opened={opened}
            onClose={close}
            aria-label="Note"
            size="calc(100vw - 3rem)"
            xOffset={0}
            classNames={{
              body: classes.body,
            }}
          >
            <div className="h-[calc(100vh_-_3rem)] overflow-y-hidden overflow-x-hidden">
              <CanvasPanel />
            </div>
          </Modal>

          <ActionIcon
            color="teal"
            size="xl"
            radius="xl"
            variant="filled"
            className="absolute right-8 bottom-10"
            onClick={() => {
              open();
            }}
          >
            <IconNote size="1.5rem" />
          </ActionIcon>
        </div>
      )}

      {/* 音声認識 */}
      {layout === 3 && (
        <>
          <PdfPanel layout={layout} />
          <Listening />
        </>
      )}

      {/* ノートに集中 */}
      {layout === 4 && (
        <>
          <CanvasPanel />
        </>
      )}
      <AudioPanel className="" />
    </Layout>
  );
};

export default Note;
