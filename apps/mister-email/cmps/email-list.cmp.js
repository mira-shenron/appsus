import emailPreview from './email-preview.cmp.js';
import { mailService } from '../services/mail-service.js';
import { eventBus, SORT, FILTER, SEARCH } from '../../../js/services/event-bus-service.js';

export default {
    template: `
        <section  class="emails-list">
            <table class="email-table">
                <div v-for="currEmail in emailsToShow" :key="currEmail.id" >
                    <email-preview :email="currEmail" @click.native="emailSelected(currEmail.id)" />
                </div>
            </table>
        </section>
    `,
    data() {
        return {
            emails: [],
            filter: 'All',
            sort: 'Date',
            search: ''
        }
    },
    components: {
        emailPreview
    },
    created() {
        eventBus.$on(FILTER, filter => {
            this.filter = filter;
        });
        eventBus.$on(SORT, sort => {
            this.sort = sort;
        });
        eventBus.$on(SEARCH, search => {
            this.search = search;
        });

        mailService.getEmails().then(emails => this.emails = emails);
    },
    computed: {
        emailsToShow() {
            var currDir = this.$route.params.dir;
            var emailsByDir = this.getByDir(currDir);

            var filteredEmais;
            if (this.filter === 'All') filteredEmais = this.sortBy(emailsByDir, this.sort);
            else if (this.filter === 'Read') filteredEmais = this.sortBy(emailsByDir.filter(email => (email.isRead)), this.sort);
            else if (this.filter === 'Unread') filteredEmais = this.sortBy(emailsByDir.filter(email => (!email.isRead)), this.sort);

            if (!this.search) return filteredEmais;
            else return this.searchEmails(filteredEmais, this.search.toLowerCase());
        }
    },
    methods: {
        emailSelected(emailId) {
            this.$router.push(`${this.$route.params.dir}/${emailId}`);
        },
        selectEmail(emailId) {
            mailService.getEmailById(emailId).then(email => this.selectedEmail = email);

        },
        getByDir(directory) {
            var filteredEmails = [];
            switch (directory) {
                case "deleted":
                    filteredEmails = this.emails.filter(email => email.isDeleted);
                    break;
                case "sent":
                    filteredEmails = this.emails.filter(email => email.isSent);
                    break;
                case "starred":
                    filteredEmails = this.emails.filter(email => email.isStarred);
                    break;
                case "inbox":
                    filteredEmails = this.emails.filter(email => !email.isDeleted && !email.isSent);
                    break;
            }
            return filteredEmails;
        },
        sortBy(emails, sortBy) {
            if (sortBy === 'By Title') {
                return emails.sort((a, b) => (a.sender).localeCompare(b.sender));
            } else {
                return emails.sort((a, b) => b.sentAt - a.sentAt);
            }
        },
        searchEmails(emails, searchStr) {
            var foundEmails = emails.filter(email => { return email.subject.toLowerCase().includes(searchStr) 
            || email.sender.toLowerCase().includes(searchStr) 
            || email.to.toLowerCase().includes(searchStr) 
            || email.body.toLowerCase().includes(searchStr)});
            
            return foundEmails;
        }
    }
}