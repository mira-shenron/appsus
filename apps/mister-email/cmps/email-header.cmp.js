import { eventBus, SORT, FILTER, SEARCH, OPEN_MENU } from '../../../js/services/event-bus-service.js';

export default {
    template: `
        <div class="mail-header flex justify-center align-center">
            <button class="hamburger" @click="toggleMenu">☰</button>
            <label for="searchIt" class=search-it>
                <img width=50 heigth=50 src="apps/mister-email/assets/search.jpg"></img>
            </label>
            <input id="searchIt" @input="searchMail" class="input-search" type="text" placeholder="Search mail" v-model="search"/>

            <select class="sort clickable"" v-model="sort" @change="sortBy">
                    <option width=50 heigth=50>By Date</option>
                    <option width=50 heigth=50>By Title</option> 
            </select>

            <select class="filter-by-read clickable" v-model="filter" @change="filterBy">
                    <option width=50 heigth=50>All</option>
                    <option width=50 heigth=50>Read</option>
                    <option width=50 heigth=50>Unread</option>
            </select>
        </div>
    `,
    data() {
        return {
            search: '',
            selected: '',
            filter: 'All',
            sort: 'By Date'
        }
    },
    computed: {

    },
    methods: {
        filterBy() {
            eventBus.$emit(FILTER, this.filter);
        },
        sortBy(){
            eventBus.$emit(SORT, this.sort);
        },
        searchMail(){
            eventBus.$emit(SEARCH, this.search);
        },
        toggleMenu(){
            eventBus.$emit(OPEN_MENU);
        }
    }
}