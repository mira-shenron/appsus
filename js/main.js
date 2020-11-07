import { myRouter } from './routes.js';
import userMsg from './pages/global-usr-msg.cmp.js';


const options = {
    el: '#app',
    router: myRouter,
    template: `
    <section class="wrapper">
        <header class="header flex align-center">
            <h1 class="clickable" @click="goToHomePage">Appsus</h1>
            <nav class="nav">
                <router-link to="/" >Home</router-link>
                <router-link to="/mail/inbox" >Mail</router-link>
                <router-link to="/keep" >Keep</router-link>
            </nav> 
        </header>
        <main class="main">
            <user-msg/>
            <router-view></router-view>
        </main>
        <footer class="footer">
            Coffee Rights Mira & Yulia 2020
        </footer>
    </section>`,
    components:{
        userMsg,
    },
    methods:{
        goToHomePage(){
            this.$router.push('/');
        }
    }
};

const app = new Vue(options);

