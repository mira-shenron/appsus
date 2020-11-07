export default {
    template: `
        <section class="note-filter">
            <input type="text" v-model="filterBy.byTxt" placeholder="Search"
            @input="emitFilter" />
            <select @change="emitFilter" v-model="filterBy.byType">
                <option value="">All</option>
                <option value="noteTxt">Text</option>
                <option value="noteImg">Images</option>
                <option value="noteTodo">To Do's</option>
                <option value="noteVideo">Video</option>
                <option value="noteAudio">Audio</option>
            </select>
        </section>
    `,
    data() {
        return {
            filterBy: {byTxt: '', byType: ''}
        }
    },
    methods: {
        emitFilter(){
            this.$emit("filtered", JSON.parse(JSON.stringify(this.filterBy)));
        }
    },
}
