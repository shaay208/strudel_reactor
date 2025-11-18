import MusicPlayer from './MusicPlayer';

//  MusicPlayerSection Component that provides the layout for the music player section,
//  wrapping the MusicPlayer component within a responsive column.
const MusicPlayerSection = ({
  state,
  selectedTrack,
  handleProcess,
  handleProcessAndPlay,
  handlePlay,
  handleStop,
  setState,
  editorReady,
  bpm,
}) =>{
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
export default MusicPlayerSection;
