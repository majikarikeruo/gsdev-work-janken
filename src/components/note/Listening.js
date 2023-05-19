import "regenerator-runtime";

/**
 * React
 */
import { useEffect, useState } from "react";

/**
 * Mantine
 */
import { ActionIcon } from "@mantine/core";

/**
 * Icons
 */
import { IconMicrophone, IconPlayerPauseFilled } from "@tabler/icons-react";

/**
 * API
 */
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Listening = () => {
  const [isRecording, setIsRecording] = useState(false);

  const { transcript, resetTranscript } = useSpeechRecognition();

  /**
   * @function startRecording
   * 録音開始
   */
  const startRecording = () => {
    setIsRecording(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: "zh-TW" });
  };

  /**
   * @function stopRecording
   * 録音停止
   */
  const stopRecording = () => {
    setIsRecording(false);
    SpeechRecognition.stopListening();
  };

  return (
    <div className="relative h-96 p-4">
      <p>{transcript}</p>
      {isRecording ? (
        <ActionIcon
          color="red"
          size="xl"
          radius="xl"
          variant="filled"
          className="absolute right-4 top-4"
          onClick={stopRecording}
        >
          <IconPlayerPauseFilled size="1.5rem" />
        </ActionIcon>
      ) : (
        <ActionIcon
          color="teal"
          radius="xl"
          size="xl"
          variant="filled"
          className="absolute right-4 top-4"
          onClick={startRecording}
        >
          <IconMicrophone size="1.5rem" />
        </ActionIcon>
      )}
    </div>
  );
};

export default Listening;
