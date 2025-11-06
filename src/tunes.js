export const stranger_tune = `setcps(140/60/4)

samples('github:algorave-dave/samples')
samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json')
samples('https://raw.githubusercontent.com/Mittans/tidal-drum-machines/main/machines/tidal-drum-machines.json')

const gain_patterns = [
  "2",
  "{0.75 2.5}*4",
    "{0.75 2.5!9 0.75 2.5!5 0.75 2.5 0.75 2.5!7 0.75 2.5!3 <2.5 0.75> 2.5}%16",
]

const drum_structure = [
"~",
"x*4",
"{x ~!9 x ~!5 x ~ x ~!7 x ~!3 < ~ x > ~}%16",
]

const basslines = [
  "[[eb1, eb2]!16 [f2, f1]!16 [g2, g1]!16 [f2, f1]!8 [bb2, bb1]!8]/8",
  "[[eb1, eb2]!16 [bb2, bb1]!16 [g2, g1]!16 [f2, f1]!4 [bb1, bb2]!4 [eb1, eb2]!4 [f1, f2]!4]/8"
]

const arpeggiator1 = [
"{d4 bb3 eb3 d3 bb2 eb2}%16",
"{c4 bb3 f3 c3 bb2 f2}%16",
"{d4 bb3 g3 d3 bb2 g2}%16",
"{c4 bb3 f3 c3 bb2 f2}%16",
]

const arpeggiator2 = [
"{d4 bb3 eb3 d3 bb2 eb2}%16",
"{c4 bb3 f3 c3 bb2 f2}%16",
"{d4 bb3 g3 d3 bb2 g2}%16",
"{d5 bb4 g4 d4 bb3 g3 d4 bb3 eb3 d3 bb2 eb2}%16",
]


const pattern = 0
const bass = 0

bassline:
note(pick(basslines, bass))
.sound("supersaw")
.postgain(2)
.room(0.6)
.lpf(700)
.room(0.4)
.postgain(pick(gain_patterns, pattern))
.gain(1)


main_arp: 
note(pick(arpeggiator1, "<0 1 2 3>/2"))
.sound("supersaw")
.lpf(300)
.adsr("0:0:.5:.1")
.room(0.6)
.lpenv(3.3)
.postgain(pick(gain_patterns, pattern))
.gain(1)


drums:
stack(
  s("tech:5")
  .postgain(6)
  .pcurve(2)
  .pdec(1)
  .struct(pick(drum_structure, pattern))
  .gain(1),

  s("sh").struct("[x!3 ~!2 x!10 ~]")
  .postgain(0.5).lpf(7000)
  .bank("RolandTR808")
  .speed(0.8).jux(rev).room(sine.range(0.1,0.4)).gain(0.6),

  s("{~ ~ rim ~ cp ~ rim cp ~!2 rim ~ cp ~ < rim ~ >!2}%8 *2")
  .bank("[KorgDDM110, OberheimDmx]").speed(1.2).gain(1)
  .postgain(.25),
)

drums2: 
stack(
  s("[~ hh]*4").bank("RolandTR808").room(0.3).speed(0.75).gain(1.2),
  s("hh").struct("x*16").bank("RolandTR808")
  .gain(0.6)
  .jux(rev)
  .room(sine.range(0.1,0.4))
  .postgain(0.5)
  .gain(1),
  
  s("[psr:[2|5|6|7|8|9|12|24|25]*16]?0.1")
  .gain(0.1)
  .postgain(pick(gain_patterns, pattern))
  .hpf(1000)
  .speed(0.5)
  .rarely(jux(rev))
  .gain(1),
)
//Remixed and reproduced from Algorave Dave's code found here: https://www.youtube.com/watch?v=ZCcpWzhekEY
all(x => x.gain({$VOLUME}))
// all(x => x.log())

// @version 1.2`;

export const techno_beat = `setcps(130/60/4)

samples('github:algorave-dave/samples')
samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json')
samples('https://raw.githubusercontent.com/Mittans/tidal-drum-machines/main/machines/tidal-drum-machines.json')

stack(
  s("bd*4").bank("RolandTR909").gain(0.8).room(0.2),
  s("~ hh ~ hh").bank("RolandTR909").gain(0.6).lpf(8000),
  s("~ ~ sn ~").bank("RolandTR909").gain(0.7).room(0.3),
  s("oh*8").bank("RolandTR909").gain(0.3).sometimes(rev),
  note("c2 [eb2 f2] g2 [bb2 c3]")
    .sound("sawtooth")
    .lpf(400)
    .resonance(10)
    .gain(0.4)
)
// all(x => x.gain({$VOLUME}))
// all(x => x.log())
// @version 1.0`;

export const ambient_dream = `setcps(90/60/4)

samples('github:algorave-dave/samples')
samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json')

stack(
  note("c3 eb3 g3 bb3")
    .slow(4)
    .sound("pad")
    .room(0.8)
    .size(0.9)
    .gain(0.6)
    .lpf(sine.range(200, 800).slow(8)),
  
  s("~ ~ ~ bd").gain(0.3).room(0.6),
  
  note("c5 d5 eb5 f5 g5")
    .sometimes(rev)
    .sound("sine")
    .gain(0.2)
    .delay(0.3)
    .delayt(0.125)
    .delayfb(0.6)
    .struct("x?0.3")
)

// all(x => x.gain({$VOLUME}))
// all(x => x.log())
// @version 1.0`;

export const jazz_fusion = `setcps(120/60/4)

samples('github:algorave-dave/samples')
samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json')

stack(
  s("bd ~ sn ~").bank("Jazz").gain(0.7),
  s("hh*8").bank("Jazz").gain(0.4).sometimes(jux(rev)),
  note("c3 d3 eb3 f3 g3 a3 bb3")
    .sound("electric")
    .struct("x x ~ x ~ x x ~")
    .lpf(1200)
    .gain(0.5),
  note("c4 eb4 g4")
    .slow(2)
    .sound("rhodes")
    .room(0.4)
    .gain(0.4)
)

// all(x => x.gain({$VOLUME}))
// all(x => x.log())
// @version 1.0`;

export const drum_n_bass = `setcps(174/60/4)

samples('github:algorave-dave/samples')
samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json')

stack(
  s("bd ~ bd ~").speed(1.2).gain(0.8).lpf(120),
  s("~ sn ~ sn").speed(1.1).gain(0.9).room(0.2),
  s("hh*16").gain(0.3).sometimes(jux(rev)),
  note("a1 c2 d2 f2")
    .sound("reese")
    .lpf(300)
    .resonance(15)
    .gain(0.6)
    .struct("x ~ x x ~ x ~ x")
)

// all(x => x.gain({$VOLUME}))
// all(x => x.log())
// @version 1.0`;

// Track definitions with metadata
export const tracks = [
  {
    id: 'stranger',
    name: 'Stranger Things',
    code: stranger_tune,
    genre: 'Synthwave',
    bpm: 140,
  },
  {
    id: 'techno',
    name: 'Techno Beat',
    code: techno_beat,
    genre: 'Techno',
    bpm: 130,
  },
  {
    id: 'ambient',
    name: 'Ambient Dream',
    code: ambient_dream,
    genre: 'Ambient',
    bpm: 90,
  },
  {
    id: 'jazz',
    name: 'Jazz Fusion',
    code: jazz_fusion,
    genre: 'Jazz Fusion',
    bpm: 120,
  },
  {
    id: 'dnb',
    name: 'Drum & Bass',
    code: drum_n_bass,
    genre: 'Drum & Bass',
    bpm: 174,
  },
];

export const getTrackById = (id) => {
  return tracks.find((track) => track.id === id) || tracks[0];
};
