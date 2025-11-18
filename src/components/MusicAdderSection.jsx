
import QuickMusicAdder from './QuickMusicAdder';

//  MusicAdderSection Component that provides the layout for the music adder section,
//  wrapping the QuickMusicAdder component within a styled card.
export default function MusicAdderSection({
  musicElements,
  onAddMusic,
  onRemoveMusic,
  onClearAll,
}) {
  return (
    <div className="col-lg-3">
      <QuickMusicAdder
        musicElements={musicElements}
        onAddMusic={onAddMusic}
        onRemoveMusic={onRemoveMusic}
        onClearAll={onClearAll}
      />
    </div>
  );
}
