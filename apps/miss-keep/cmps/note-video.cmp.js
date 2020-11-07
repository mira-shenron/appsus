export default {
    props: ['note'],
    name: 'note-video',
    template: `<iframe :src=setType()></iframe>`,
    methods: {
        setType() {
            const youtubeRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            let videoId = this.note.info.url.match(youtubeRegex)[2];
            let youtubeEmbbededLink =
                'https://www.youtube.com/embed/' + videoId;
            return youtubeEmbbededLink;
        },
    },
};
