export default{
    props: ['note'],
    name: 'note-text',
    template: `<p>{{note.info.txt}}</p>`,
}