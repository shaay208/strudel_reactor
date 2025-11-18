import QuickMusicAdder from './QuickMusicAdder';

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
