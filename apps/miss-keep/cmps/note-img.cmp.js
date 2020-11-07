export default{
    props: ['note'],
    name: 'note-img',
    template: `<img :src="note.info.url" alt="note image" />`
}