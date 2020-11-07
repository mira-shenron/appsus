import mailApp from './pages/mail-app.cmp.js';
import keepApp from './pages/keep-app.cmp.js';
import homePage from './pages/home-page.cmp.js';
import openMail from '../apps/mister-email/cmps/open-mail.cmp.js';
import emailList from '../apps/mister-email/cmps/email-list.cmp.js';
import newEmail from '../apps/mister-email/cmps/new-email.cmp.js';

const myRoutes = [
    {
        path: '/',
        component: homePage,
    },
    {
        path: '/keep',
        component: keepApp,
    },
    {
        path: '/mail',
        component: mailApp,
        children: [
            {
                path: '/mail/new',
                component: newEmail
            },
            {
                path: '/mail/:dir',
                component: emailList
            },
            {
                path: '/mail/:dir/:mailId',
                component: openMail
            },

        ]
    },
];

export const myRouter = new VueRouter({ routes: myRoutes });