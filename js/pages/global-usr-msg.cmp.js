import { eventBus, USR_MSG } from '../services/event-bus-service.js';

var timer;

export default {
    template: `
        <transition name="fade">
            <section v-show="msg" class="user-msg">
                <p>{{msg}}</p>
                <button class="user-msg-btn" @click="closeMessege"><i class="fas fa-times-circle"></i></button>
            </section>
        </transition>
    `,
    data() {
        return {
            msg: null
        }
    },
    methods: {
        closeMessege() {
            this.msg = null;
            clearTimeout(timer)
        }
    },
    created() {
        eventBus.$on(USR_MSG, msg => {
            this.msg = msg
            timer = setTimeout(() => {
                this.msg = null;
            }, 3000);
        });
    }
}