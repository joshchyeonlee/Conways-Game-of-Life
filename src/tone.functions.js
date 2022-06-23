import * as Tone from 'tone';

const noteArray = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

export function playGrid(grid){
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now();

    synth.volume.value = -12;

    let noteIndex = 0;
    let octaveCounter = 0;
    let notes = [];

    for(let col = grid.length -1 ; col >= 0; col--){
        for(let row = 0; row < grid[col].length; row++){
            let note = noteArray[noteIndex] + `${octaveCounter}`;
            noteIndex++;

            if(noteIndex >= noteArray.length) {
                noteIndex = 0;
                octaveCounter++;
            }

            notes.push(note);
            if(grid[col][row]) synth.triggerAttack(note, now);
        }
    }
    synth.triggerRelease(notes, now + 1);
}