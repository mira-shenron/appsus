import { mailService } from "../services/mail-service.js";
import { eventBus, USR_MSG } from '../../../js/services/event-bus-service.js';

export default {
    template: `
        <form class="new-email" @submit.prevent="sendMail">
            <div class="message-header newMessage flex space-between">
                <span>Message</span>
                <span class="cancel clickable" @click="cancelMail">x</span>
            </div>
            <input class="newMessage" type="text" placeholder="To" v-model="newMail.to" />
            <input class="newMessage" type="text" placeholder="Subject" v-model="newMail.subject" />
            <textarea class="message-text" v-model="newMail.body" rows="10" cols="50"></textarea>
            <div><button class="btn send-btn clickable">
                <img src="apps/mister-email/assets/sent.png" width=40></img>
            </button></div>
        </form>
    `,

    data() {
        return {
            newMail: null
        }
    },
    created() {
        this.newMail = mailService.getMailTemplate();
    },
    methods: {
        sendMail() {
            mailService.sendMail(this.newMail);
            eventBus.$emit(USR_MSG, 'Email sent');
            this.$router.push('inbox');
        },
        cancelMail() {
            eventBus.$emit(USR_MSG, 'Email cancelled');
            this.$router.push('inbox');
        }
    }
}