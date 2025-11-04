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

const handleD3Data = (event) => {
  console.log(event.detail);
  console.log('Shalini first commit - git pipline commit test');
};

export function SetupButtons() {
  document
    .getElementById('play')
    .addEventListener('click', () => globalEditor.evaluate());
  document
    .getElementById('stop')
    .addEventListener('click', () => globalEditor.stop());
  document.getElementById('process').addEventListener('click', () => {
    Proc();
  });
  document.getElementById('process_play').addEventListener('click', () => {
    if (globalEditor != null) {
      Proc();
      globalEditor.evaluate();
    }
  });
}

export function ProcAndPlay() {
  if (globalEditor != null && globalEditor.repl.state.started == true) {
    console.log(globalEditor);
    Proc();
    globalEditor.evaluate();
  }
}

export function Proc() {
  let proc_text = document.getElementById('proc').value;
  let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
  ProcessText(proc_text);
  globalEditor.setCode(proc_text_replaced);
}

export function ProcessText(match, ...args) {
  let replace = '';
  if (document.getElementById('flexRadioDefault2').checked) {
    replace = '_';
  }

  return replace;
}

export default function StrudelDemo() {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      document.addEventListener('d3Data', handleD3Data);
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
        onDraw: (haps, time) =>
          drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
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
      SetupButtons();
      Proc();
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
            </div>
          </div>
          <div className="row g-3 mb-3">
            <div
              className="col-md-8"
              style={{ maxHeight: '50vh', overflowY: 'auto' }}
            >
              <div id="editor" />
              <div id="output" />
            </div>
            <div className="col-md-4">
              <DJControls />
            </div>
          </div>

          <canvas id="roll"></canvas>
        </main>
      </div>
    </div>
  );
}
