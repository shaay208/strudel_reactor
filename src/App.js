import './App.css';
import { useEffect, useRef, useState, useCallback } from 'react';
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import {
  getAudioContext,
  webaudioOutput,
  registerSynthSounds,
} from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { stranger_tune, tracks, getTrackById } from './tunes';
import console_monkey_patch from './console-monkey-patch';
import Header from './components/Header';
import CodeEditorAccordion from './components/CodeEditorAccordion';
import MusicPlayerSection from './components/MusicPlayerSection';
import MusicAdderSection from './components/MusicAdderSection';
import DJControlsSection from './components/DJControlsSection';
import { preProcess } from './utils/PreProcessLogic';

let globalEditor = null;
let lastDrawTime = 0;

export default function StrudelDemo() {
  const hasRun = useRef(false);

  const [songText, setSongText] = useState(stranger_tune); // Initial code
  const [procText, setProcText] = useState(stranger_tune); // Processed code
  const [volume, setVolume] = useState(50); // Volume as percentage (0-100)
  const [bpm, setBpm] = useState(140); // BPM control
  const [editorReady, setEditorReady] = useState(false); // Editor readiness state
  const [selectedTrack, setSelectedTrack] = useState('stranger'); // Default to stranger track
  const [musicElements, setMusicElements] = useState([]); // Store added music elements
  const [state, setState] = useState('stop'); // 'play' or 'stop'
  const [p1Mode, setP1Mode] = useState('on'); // 'on' or 'hush'

  // Extract music info from hap for logging
  const getMusicInfo = (hap) => {
    const value = hap.value || {};

    if (!value || typeof value !== 'object') return '';

    const parts = [];

    if (value.note !== undefined) parts.push(`note:${value.note}`);
    if (value.n !== undefined) parts.push(`n:${value.n}`);
    if (value.s !== undefined) parts.push(`s:${value.s}`);
    if (value.gain !== undefined) parts.push(`gain:${value.gain}`);
    if (value.postgain !== undefined) parts.push(`postgain:${value.postgain}`);

    return parts.length > 0 ? parts.join(' ') : '';
  };

  const handleTrackChange = useCallback(
    (trackId) => {
      const track = getTrackById(trackId);
      if (track) {
        setSelectedTrack(trackId);
        setSongText(track.code);
        setProcText(track.code);
        setBpm(track.bpm); // Set BPM to track's default BPM
        setMusicElements([]); // Clear music elements when switching tracks

        // Update editor if ready
        if (globalEditor && editorReady) {
          globalEditor.setCode(track.code);
          // Auto-stop current playback when switching tracks
          if (state === 'play') {
            globalEditor.stop();
            setState('stop');
          }
        }
      }
    },
    [editorReady, state]
  );

  // Music Elements handlers
  const handleAddMusic = useCallback((element) => {
    setMusicElements((prev) => [...prev, element]);
  }, []);

  // Remove specific music element
  const handleRemoveMusic = useCallback((elementId) => {
    setMusicElements((prev) => prev.filter((el) => el.id !== elementId));
  }, []);

  // Clear all music elements
  const handleClearAllMusic = useCallback(() => {
    setMusicElements([]);
  }, []);

  // Save and Load Preset handlers
  const handleSavePreset = useCallback(() => {
    const preset = {
      volume,
      bpm,
      selectedTrack,
      musicElements,
      p1Mode,
    };
    localStorage.setItem('strudel_preset', JSON.stringify(preset));
    alert('Preset saved successfully!');
  }, [volume, bpm, selectedTrack, musicElements, p1Mode]);

  // Load preset from localStorage
  const handleLoadPreset = useCallback(() => {
    const presetStr = localStorage.getItem('strudel_preset');
    if (presetStr) {
      try {
        const preset = JSON.parse(presetStr);
        setVolume(preset.volume || 50);
        setBpm(preset.bpm || 140);
        setSelectedTrack(preset.selectedTrack || 'stranger');
        setMusicElements(preset.musicElements || []);
        setP1Mode(preset.p1Mode || 'on');
        // Update track
        handleTrackChange(preset.selectedTrack || 'stranger');
        alert('Preset loaded successfully!');
      } catch (e) {
        console.error('Failed to load preset', e);
        alert('Failed to load preset. Invalid data.');
      }
    } else {
      alert('No preset found.');
    }
  }, [handleTrackChange]);

  // Update and play the current track with music elements
  const updatePlayingTrack = useCallback(
    (elements = musicElements) => {
      if (!globalEditor || !editorReady) return;

      const volumeDecimal = volume / 100;
      let baseCode = preProcess(procText, volumeDecimal, bpm, elements, p1Mode);

      globalEditor.setCode(baseCode);
      globalEditor.evaluate();
    },
    [musicElements, editorReady, volume, procText, bpm, p1Mode]
  );

  // Handle processing the text (preprocess function)
  const handleProcess = useCallback(() => {
    if (!globalEditor || !editorReady) return;

    const volumeDecimal = volume / 100;
    let outputText = preProcess(
      procText,
      volumeDecimal,
      bpm,
      musicElements,
      p1Mode
    );

    globalEditor.setCode(outputText);
  }, [editorReady, volume, procText, musicElements, bpm, p1Mode]);

  // Handle process and play
  const handleProcessAndPlay = useCallback(() => {
    handleProcess();
    if (globalEditor) {
      setState('play');
      globalEditor.evaluate();
    }
  }, [handleProcess]);

  // Handle playback controls
  const handlePlay = useCallback(() => {
    if (!globalEditor) {
      console.warn('Editor not ready yet');
      return;
    }
    updatePlayingTrack();
  }, [updatePlayingTrack]);

  // Stop playback
  const handleStop = useCallback(() => {
    if (!globalEditor) {
      console.warn('Editor not ready yet');
      return;
    }
    globalEditor.stop();
  }, []);

  useEffect(() => {
    if (state === 'play' && editorReady && globalEditor) {
      // Re-trigger playback when music elements change during play
      updatePlayingTrack();
    }
  }, [musicElements, state, editorReady, updatePlayingTrack]);

  useEffect(() => {
    if (state === 'play' && editorReady && globalEditor) {
      // Only re-run when volume or bpm changes during playback
      const volumeDecimal = volume / 100;
      let outputText = preProcess(
        procText,
        volumeDecimal,
        bpm,
        musicElements,
        p1Mode
      );

      globalEditor.setCode(outputText);
      globalEditor.evaluate();
    }
  }, [volume, bpm, procText, state, editorReady, musicElements, p1Mode]);

  // Keyboard shortcuts: Ctrl+Enter to Play, Ctrl+. to Stop
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + Enter Play
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        setState('play');
        handlePlay();
      }
      // Ctrl + . Stop
      if (e.ctrlKey && e.key === '.') {
        e.preventDefault();
        setState('stop');
        handleStop();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePlay, handleStop]);

  useEffect(() => {
    if (!hasRun.current) {
      console_monkey_patch();
      hasRun.current = true;
      //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
      //init canvas
      const canvas = document.getElementById('roll');
      canvas.width = canvas.width * 2;
      canvas.height = canvas.height * 2;
      const drawContext = canvas.getContext('2d');
      const drawTime = [-2, 2]; // time window of drawn haps

      globalEditor = new StrudelMirror({
        defaultOutput: webaudioOutput,
        getTime: () => getAudioContext().currentTime,
        transpiler,
        root: document.getElementById('editor'),
        drawTime,
        // Draw pianoroll and capture music events
        onDraw: (haps, time) => {
          drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 });

          // Throttle updates to every 0.05 seconds
          if (haps && haps.length > 0 && time - lastDrawTime > 0.05) {
            lastDrawTime = time;
            // Pick random hap from current events
            const randomHap = haps[Math.floor(Math.random() * haps.length)];
            const musicInfo = getMusicInfo(randomHap);
            // Log music info (captured by console-monkey-patch)
            if (musicInfo && musicInfo.length > 0) {
              console.log(musicInfo);
            }
          }
        },
        prebake: async () => {
          initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
          const loadModules = evalScope(
            import('@strudel/core'),
            import('@strudel/draw'),
            import('@strudel/mini'),
            import('@strudel/tonal'),
            import('@strudel/webaudio')
          );
          await Promise.all([
            loadModules,
            registerSynthSounds(),
            registerSoundfonts(),
          ]);
        },
      });

      // Set initial code and mark editor as ready
      globalEditor.setCode(songText);
      setEditorReady(true);
    }
  }, [songText]);

  return (
    <div className="bg-light min-vh-100 py-4">
      <Header />
      <div className="container py-4">
        <main className="main-panel">
          <CodeEditorAccordion
            songText={songText}
            setSongText={setSongText}
            setProcText={setProcText}
          />
          <div className="row g-3 mb-4">
            <MusicPlayerSection
              state={state}
              selectedTrack={selectedTrack}
              handleProcess={handleProcess}
              handleProcessAndPlay={handleProcessAndPlay}
              handlePlay={handlePlay}
              handleStop={handleStop}
              setState={setState}
              editorReady={editorReady}
              bpm={bpm}
            />
            <MusicAdderSection
              musicElements={musicElements}
              onAddMusic={handleAddMusic}
              onRemoveMusic={handleRemoveMusic}
              onClearAll={handleClearAllMusic}
            />
            <DJControlsSection
              volume={volume}
              onVolumeChange={(e) => setVolume(e.target.value)}
              selectedTrack={selectedTrack}
              onTrackChange={handleTrackChange}
              bpm={bpm}
              onBpmChange={setBpm}
              p1Mode={p1Mode}
              onP1ModeChange={setP1Mode}
              onSavePreset={handleSavePreset}
              onLoadPreset={handleLoadPreset}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
