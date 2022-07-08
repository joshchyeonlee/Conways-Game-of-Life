import * as Tone from 'tone';

const noteArray = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

export const scaleArray = [{
    name: "Chromatic Scale",
    notes: [0,1,2,3,4,5,6,7,8,9,10,11],
}, {
    name: "Major Scale",
    notes: [0,2,4,5,7,9,11],
}, {
    name: "Natural Minor Scale",
    notes: [0,2,3,5,7,8,10],
}, {
    name: "Harmonic Minor Scale",
    notes: [0,2,3,5,7,8,11],
}, {
    name: "Melodic Minor Scale",
    notes: [0,2,3,5,7,9,11],
}, {
    name: "Major Pentatonic Scale",
    notes: [0,2,4,7,9],
}, {
    name: "Minor Pentatonic Scale",
    notes: [0,3,5,7,10],
}];

export function playGrid(grid, scale){
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    synth.volume.value = -12;

    let noteIndex = 0;
    let octaveCounter = 0;
    let notes = [];

    for(let col = grid.length -1 ; col >= 0; col--){
        for(let row = 0; row < grid[col].length; row++){
            let note = noteArray[scale[noteIndex]] + `${octaveCounter}`;
            noteIndex++;

            if(noteIndex >= scale.length) {
                noteIndex = 0;
                octaveCounter++;
            }

            if(grid[col][row]) notes.push(note);
        }
    }

    synth.triggerAttackRelease(notes, "4n");
}