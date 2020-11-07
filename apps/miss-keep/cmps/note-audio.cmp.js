export default{
    props: ['note'],
    name: 'note-audio',
    template: `<audio :src="note.info.url" controls></audio>`,
}