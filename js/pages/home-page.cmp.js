
export default {
    template: `
    <section>
        <h1 class="main-page-msg">Better than Google</h1>
        <div class="apps-pic flex justify-center align-center">
            <img @click="routeToMail" class="welcome-pic clickable" src="js/assets/img/apps.jpg" width=200 alt=""> 
            <img @click="routeToKeep" class="welcome-pic clickable" src="js/assets/img/notes.jpg" width=200 alt=""> 
            <img class="welcome-pic" src="js/assets/img/books.jpg" width=200 alt=""> 
        </div>
    </section>
    `,
    methods: {
        routeToMail(){
            this.$router.push('/mail/inbox');
        },
        routeToKeep(){
            this.$router.push('/keep');
        }
    }
}