import MusicPlayer from './MusicPlayer';

export default function MusicPlayerSection({
  state,
  selectedTrack,
  handleProcess,
  handleProcessAndPlay,
  handlePlay,
  handleStop,
  setState,
  editorReady,
  bpm,
}) {
  return (
    <div className="col-lg-6">
      <MusicPlayer
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
    </div>
  );
}
