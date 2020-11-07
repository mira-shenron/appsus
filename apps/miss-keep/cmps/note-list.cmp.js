import notePreview from './note-preview.cmp.js';
export default {
    props: ['notes'],
    template: `
        <div class="notes">
            <h2 class="notes-title">Pinned Notes</h2>
            <div class="pinned-notes-list">
                <note-preview  v-for="currNote in pinnedNotesToShow" :key="currNote.id" :note="currNote"></note-preview> 
            </div>
            <h2 class="notes-title">Other Notes</h2>
            <div class="notes-list">
                <note-preview v-for="currNote in notPinnedNotesToShow" :key="currNote.id" :note="currNote"></note-preview>
            </div>
        </div>
    `,
    data(){
        return {
            pinnedNotes: []
        }
    },
    computed:{
        pinnedNotesToShow() {
            return this.pinnedNotes = this.notes.filter((note) => note.isPinned);
        },
        notPinnedNotesToShow() {
            return this.pinnedNotes = this.notes.filter((note) => !note.isPinned);
        }
    },
    components: {
        notePreview
    }
}