/**
 * React
 */
import { useEffect, useState, useRef } from "react";

/**
 * Mantine
 */
import { Box, Button, Group, Divider, Text, Slider, Menu } from "@mantine/core";

/**
 * Icon
 */
import {
  FileMusic,
  PlayerPlay,
  PlayerPause,
  Repeat,
  Volume,
  PlayerTrackNext,
  Check,
} from "tabler-icons-react";
import { IconDatabase } from "@tabler/icons-react";

const AudioPanel = () => {
  /**
   * useRef
   */
  const audioRef = useRef(null);

  /**
   * useState
   */
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [loop, setLoop] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [playbackRate, setPlaybackRate] = useState(1);

  /**
   * @function audioPlay
   * 再生
   */
  const audioPlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  /**
   * @function audioPause
   * 一時停止
   */
  const audioPause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  /**
   * @function toggleLoop
   * ループ再生
   */
  const toggleLoop = () => {
    audioRef.current.loop = !audioRef.current.loop;
    setLoop(audioRef.current.loop);
  };

  /**
   * @function changeVolume
   * 音量変更
   */
  const changeVolume = (volume) => {
    audioRef.current.volume = volume / 100;
    setVolume(volume);
  };

  /**
   * @function changePlaybackRate
   * 再生速度変更
   */
  const changePlaybackRate = (rate) => {
    audioRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  /**
   * @function handleTimeUpdate
   * 再生時間更新
   */
  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = String(Math.floor(currentTime % 60));

    setCurrentTime(`${currentMinutes}:${currentSeconds.padStart(2, "0")}`);
  };

  useEffect(() => {
    // audio要素のdurationが取得できるまで待つ
    const duration = audioRef.current.duration;
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);

    setDuration(`${durationMinutes}:${durationSeconds}`);
  }, [duration]);

  return (
    <duv className="fixed bottom-0 left-0 w-full">
      <Group className="text-center p-3 px-6 bg-[#222222] h-84">
        <Button leftIcon={<IconDatabase size="1rem" />}>学習開始</Button>
        <Group className="bg-[#2E2E2E] p-4 py-2">
          <FileMusic size={24} strokeWidth={2} color={"white"} />
          <Group className="mx-2">
            <Text color="white" size={14}>
              1-1.我我得做家事
            </Text>
            <Text color="white" size={12} className="w-[64px]">
              <span>{currentTime}</span>
              <span className="inline-block mx-1">/</span>
              <span>{duration}</span>
            </Text>
            <audio
              id="audio"
              src="/audio/09-1.mp3"
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
            ></audio>
          </Group>
          <Divider orientation="vertical" color={"white"} />
          <Group className="mx-2">
            <Volume size={24} strokeWidth={2} color={"white"} />
            <Box className="w-[100px] mr-3">
              <Slider
                marks={[{ value: 20 }, { value: 50 }, { value: 80 }]}
                min={0}
                max={100}
                value={volume}
                onChange={changeVolume}
                className=""
              />
            </Box>

            {isPlaying ? (
              <PlayerPause
                size={24}
                strokeWidth={2}
                color={"teal"}
                onClick={audioPause}
              />
            ) : (
              <PlayerPlay
                size={24}
                strokeWidth={2}
                color={"white"}
                onClick={audioPlay}
              />
            )}
            <Repeat
              size={24}
              strokeWidth={2}
              color={loop ? "teal" : "white"}
              className="hover:bg-white-500"
              onClick={toggleLoop}
            />
            <div className="relative mt-1">
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <div>
                    <PlayerTrackNext
                      size={24}
                      strokeWidth={2}
                      color={"white"}
                    />
                    <Text
                      size={10}
                      color={"white"}
                      className="absolute inset-x-0 top-6"
                    >
                      {playbackRate}x
                    </Text>
                  </div>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>再生速度</Menu.Label>
                  <Menu.Divider />
                  <Menu.Item
                    icon={
                      <Check
                        size={14}
                        color={playbackRate === 0.5 ? "black" : "transparent"}
                      />
                    }
                    onClick={() => changePlaybackRate(0.5)}
                  >
                    0.5
                  </Menu.Item>
                  <Menu.Item
                    icon={
                      <Check
                        size={14}
                        color={playbackRate === 0.75 ? "black" : "transparent"}
                      />
                    }
                    onClick={() => changePlaybackRate(0.75)}
                  >
                    0.75
                  </Menu.Item>
                  <Menu.Item
                    icon={
                      <Check
                        size={14}
                        color={playbackRate === 1 ? "black" : "transparent"}
                      />
                    }
                    onClick={() => changePlaybackRate(1)}
                  >
                    1.0
                  </Menu.Item>
                  <Menu.Item
                    icon={
                      <Check
                        size={14}
                        color={playbackRate === 1.25 ? "black" : "transparent"}
                      />
                    }
                    onClick={() => changePlaybackRate(1.25)}
                  >
                    1.25
                  </Menu.Item>
                  <Menu.Item
                    icon={
                      <Check
                        size={14}
                        color={playbackRate === 1.5 ? "black" : "transparent"}
                      />
                    }
                    onClick={() => changePlaybackRate(1.5)}
                  >
                    1.5
                  </Menu.Item>
                  <Menu.Item
                    icon={
                      <Check
                        size={14}
                        color={playbackRate === 2 ? "black" : "transparent"}
                      />
                    }
                    onClick={() => changePlaybackRate(2)}
                  >
                    2
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </Group>
        </Group>
      </Group>
    </duv>
  );
};

export default AudioPanel;
