import { mailService } from '../services/mail-service.js';
import { eventBus, EVENT_MAIL_WAS_READ, USR_MSG } from '../../../js/services/event-bus-service.js';

export default {
    props: ['email'],
    template: `
    <div>
            <tr class="email-row" :class="{read:isRead}">
                <td class="email-td" width=5% @click.stop="checkEmail"><input type="checkbox"></td>
                <td class="email-td" width=5% @click.stop="starEmail"><span class="fa fa-star" :class="{starred: isStarred}"></span></td>
                <td class="email-td sender" width=20%>{{senderDisplay}}</td>
                <td class="email-td" width=45%>{{email.subject}}</td>
                <td class="email-td" width=20%>{{sentAt}}</td>
                <td class="email-td trash" width=50 @click.stop="deleteEmail">
                    <img src="apps/mister-email/assets/trash.png">
                </td>
                <td v-if="isRead" class="email-td read-unread" width=50 @click.stop="toggleReadEmail">
                     <img src="apps/mister-email/assets/read.png">
                </td>
                <td v-if="!isRead" class="email-td read-unread" width=50 @click.stop="toggleReadEmail">
                     <img src="apps/mister-email/assets/unread.png">
                </td>
            </tr>           
    </div>
    `,
    data(){
        return{
        }
    },
    computed:{
        senderDisplay(){
            if(this.email.sender === 'Me') return 'To: ' + this.email.to;
            else return this.email.sender;
        },
        isRead(){
            return this.email.isRead;
        },
        isStarred(){
            return this.email.isStarred;
        },
        sentAt(){
            var emailDate = new Date(this.email.sentAt);
            var currDate = new Date();

            if(currDate.getFullYear() > emailDate.getFullYear()){
                return `${emailDate.getDate()}/${emailDate.getMonth()}/${emailDate.getFullYear()}`;
            }else{
                if(currDate.getMonth() > emailDate.getMonth() || (currDate.getMonth() === emailDate.getMonth() 
                    && currDate.getDate() > emailDate.getDate())){
                    var date = emailDate.toDateString().split(' ');
                    return `${date[1]} ${date[2]}`;
                }else if(currDate.getDate() === emailDate.getDate()){
                    return emailDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                }
            }
        }
    },
    methods: {
        checkEmail(){
            console.log('checked');
            mailService.checkEmail(this.email.id);
        },
        starEmail(){
            mailService.toggleStarEmail(this.email.id); 
        },
        deleteEmail(){
            var isRead = this.email.isRead;
            mailService.deleteEmail(this.email.id).then(() => {
                eventBus.$emit(USR_MSG, 'Email deleted');
                if(!isRead) {
                    eventBus.$emit(EVENT_MAIL_WAS_READ);
                }
            })
        },
        toggleReadEmail(){
            mailService.toggleReadEmail(this.email.id).then(() => {
                eventBus.$emit(EVENT_MAIL_WAS_READ);
            });
        }
    }
}