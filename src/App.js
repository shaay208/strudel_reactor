import './App.css';
import { useEffect, useRef } from 'react';
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
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DJControls from './components/DJControls';
import PlayButtons from './components/PlayButtons';
import ProcButtons from './components/ProcButtons';
import PreprocessTextarea from './components/PreprocessTextarea';
import Graph from './components/Graph';

let globalEditor = null;

// REMOVED: Original handleD3Data function caused infinite loops
// It logged the entire array which created massive strings
/*
const handleD3Data = (event) => {
  console.log(event.detail);
  console.log('Shalini first commit - git pipline commit test');
};
*/

// Track last draw time to throttle updates
let lastDrawTime = 0;

// Extract music information from Strudel hap objects
// Converts hap.value into string like "note:c3 s:piano gain:0.5"
function getMusicInfo(hap) {
  const value = hap.value || {};

  if (!value || typeof value !== 'object') return '';

  const parts = [];

  if (value.note !== undefined) parts.push(`note:${value.note}`);
  if (value.n !== undefined) parts.push(`n:${value.n}`);
  if (value.s !== undefined) parts.push(`s:${value.s}`);
  if (value.gain !== undefined) parts.push(`gain:${value.gain}`);
  if (value.postgain !== undefined) parts.push(`postgain:${value.postgain}`);

  return parts.length > 0 ? parts.join(' ') : '';
}

// export function SetupButtons() {
//   document
//     .getElementById('play')
//     .addEventListener('click', () => globalEditor.evaluate());
//   document
//     .getElementById('stop')
//     .addEventListener('click', () => globalEditor.stop());
//   document.getElementById('process').addEventListener('click', () => {
//     Proc();
//   });
//   document.getElementById('process_play').addEventListener('click', () => {
//     if (globalEditor != null) {
//       Proc();
//       globalEditor.evaluate();
//     }
//   });
// }

// export function ProcAndPlay() {
//   if (globalEditor != null && globalEditor.repl.state.started == true) {
//     console.log(globalEditor);
//     Proc();
//     globalEditor.evaluate();
//   }
// }

// export function Proc() {
//   let proc_text = document.getElementById('proc').value;
//   let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
//   ProcessText(proc_text);
//   globalEditor.setCode(proc_text_replaced);
// }

// export function ProcessText(match, ...args) {
//   let replace = '';
//   //   if (document.getElementById('flexRadioDefault2').checked) {
//   //     replace = '_';
//   //   }

//   return replace;
// }

export default function StrudelDemo() {
  const hasRun = useRef(false);


  const handlePlay = () => {
    globalEditor.evaluate();
  };

  const handleStop = () => {
    globalEditor.stop();
  }

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

      document.getElementById('proc').value = stranger_tune;
      // SetupButtons();
      // Proc();
    }
  }, []);

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container  py-4">
        <h2 className="text-center mb-4 text-primary fw-bold">Strudel Demo</h2>
        <main className="main-panel">
          <div className="row g-3 mb-4">
            <div className="col-md-8">
              <div className="card glass-card h-100">
                <div className="card-header gradient-header">
                  <h6 className="text-primary fw-bold">Text to preprocess:</h6>
                </div>
                <div className="card-body ">
                  <PreprocessTextarea />
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex flex-column gap-3">
              {/* Processing Buttons */}
              <div className="card glass-card">
                <div className="card-header  text-primary fw-bold gradient-header">
                  Processing
                </div>
                <div className="card-body">
                  <ProcButtons />
                </div>
              </div>

              <div className="card glass-card flex-grow-1">
                <div className="card-header text-primary fw-bold gradient-header">
                  Graph
                </div>
                <div className="card-body scrollable">
                  <Graph />
                </div>
              </div>
              {/* play buttons */}
              <div className="card glass-card">
                <div className="card-header text-primary fw-bold gradient-header">
                  Playback
                </div>
                <div className="card-body d-flex justify-content-center">
                  <PlayButtons onPlay={handlePlay} onStop={handleStop} />
                </div>
              </div>
            </div> 
          </div>
          <div className="row g-3 mb-3">
            <div className="col-md-8">
              <div className="card glass-card mb-3">
                <div className="card-header text-primary fw-bold gradient-header">
                  Editor
                </div>
                <div className="card-body scrollable">
                  <div id="editor" />
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card glass-card h-100">
                <div className="card-header text-primary fw-bold d-flex justify-content-center gradient-header">
                  DJ Controls
                </div>
                <div className="card-body">
                  <DJControls />
                </div>
              </div>
            </div>
            <div className="card-body d-flex justify-content-center">
              <canvas
                id="roll"
                className="w-100 rounded canvas-glow"
                style={{ height: '300px' }}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
