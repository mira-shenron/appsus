'use strict';
import { utilService } from '../../../js/services/util-service.js';
import { storageService } from '../../../js/services/storage-service.js';

const MAIL_DB_KEY = 'mail_db';
var gEmails = storageService.loadFromStorage(MAIL_DB_KEY) || _createEmails();
var isReply = false;
var emailIdToReply = '';

export const mailService = {
    getEmails,
    getEmailById,
    getMailTemplate,
    sendMail,
    getUnreadNum,
    emailWasRead, 
    toggleStarEmail,
    checkEmail,
    deleteEmail,
    toggleReadEmail,
    replyToMail
  }

function getEmails(){
    return Promise.resolve(gEmails);
}

function replyToMail(emailId){
    isReply = true;
    emailIdToReply = emailId;
    return Promise.resolve('ok');
}

function getEmailById(emailId){
    var email = gEmails.find(email => email.id === emailId);
    return Promise.resolve(email);
}

function getMailTemplate(){
    var template;

    if(isReply && emailIdToReply){
        var email = gEmails.find(email => email.id === emailIdToReply);
        template = {
            id: emailIdToReply,
            to: email.sender,
            sender: 'mymail@gmail.com',
            subject: 'Re : ' + email.subject,
            body: '\n\n\n'+'Re ' + ':-----------------------------\n' + email.body,
        }
        isReply = false;
        emailIdToReply = '';
    }else{
        template = {
            to: '', subject: '', body: ''
        }
    }
    return template;
}

function sendMail(mailTemplate){
    console.log(mailTemplate);
    var newMail = {
        id: utilService.makeId(), 
        sender:'Me', 
        to: mailTemplate.to,
        subject: mailTemplate.subject, 
        body: mailTemplate.body, 
        isRead: true, 
        isStarred: false, 
        isDeleted: false, 
        isSent: true, 
        sentAt : Date.now()
    }
    console.log(newMail);
    gEmails.push(newMail);
    storageService.storeToStorage(MAIL_DB_KEY, gEmails);
}

function getUnreadNum(){
    var countUnread = 0;
    for(let i=0; i<gEmails.length; i++){
        if(!gEmails[i].isRead && gEmails[i].isInbox){
            countUnread++;
        }
    }

    return countUnread;
}

function emailWasRead(emailId){
    var mail = gEmails.find(mail => mail.id === emailId);
    mail.isRead = true;

    storageService.storeToStorage(MAIL_DB_KEY, gEmails);
}

function  toggleStarEmail(emailId){
    var mail = gEmails.find(mail => mail.id === emailId);
    mail.isStarred = !mail.isStarred;

    storageService.storeToStorage(MAIL_DB_KEY, gEmails);
}

function  checkEmail(emailId){
    var mail = gEmails.find(mail => mail.id === emailId);
    mail.isChecked = true;

    storageService.storeToStorage(MAIL_DB_KEY, gEmails);
}

function deleteEmail(emailId){
    var mail = gEmails.find(mail => mail.id === emailId);

    mail.isDeleted = true;
    mail.isSent = false;
    mail.isStarred = false;
    mail.isInbox = false;

    storageService.storeToStorage(MAIL_DB_KEY, gEmails);
    return Promise.resolve(`${emailId} deleted`);
    
}

function toggleReadEmail(emailId){
    var mail = gEmails.find(mail => mail.id === emailId);
    mail.isRead = !mail.isRead;

    storageService.storeToStorage(MAIL_DB_KEY, gEmails);
    return Promise.resolve(`${emailId} isRead toggled`);
}

function _createEmails(){
    var emails = [
        {id: utilService.makeId(), sender:'Puki', to:'mymail@gmail.com', subject: 'Important', body: 'Call Muki!', isRead: true, isInbox: false, isChecked: false, isStarred: false, isDeleted: true, isSent: false, sentAt : 1603573200000},
        
        
        
       //sent
       {id: utilService.makeId(), sender:'Me', to:'wolt@mail.com', subject: 'Where is my food??', body: 'Order didn`t arrived', isRead: true, isInbox: false, isChecked: false, isStarred: false, isDeleted: false, isSent: true, sentAt : 1600808400000},
       {id: utilService.makeId(), sender:'Me', to:'dropbox@gmail.com', subject: 'My account', body: 'I want to upgrade to get more space', isRead: true, isInbox: false, isChecked: false, isStarred: false, isDeleted: false, isSent: true, sentAt : 1603486800000},
       {id: utilService.makeId(), sender:'Me', to:'muki@gmail.com', subject: 'Wassap?', body: 'Pick up!', isRead: true, isInbox: true, isChecked: false, isStarred: false, isDeleted: false, isSent: true, sentAt : 1603486800000},
       
        //inbox
        {id: utilService.makeId(), sender:'AllJobs', to:'mymail@gmail.com', subject: 'Looking for a job?', body: 'Pick up!', isRead: false, isInbox: true, isChecked: false, isStarred: false, isDeleted: false, isSent: false, sentAt : 1603573200000},
        {id: utilService.makeId(), sender:'Dropbox', to:'mymail@gmail.com', subject: 'Changes in your folder', body: 'Someone deleted all your work', isRead: true, isInbox: true, isChecked: false, isStarred: false, isDeleted: false, isSent: false, sentAt : 1603400400000},
        {id: utilService.makeId(), sender:'LinkedIn', to:'mymail@gmail.com', subject: 'Share your thoughts on LinkedIn', body: 'Check out our new features!', isRead: false, isInbox: true, isChecked: false, isStarred: false, isDeleted: false, isSent: false, sentAt : 1603400400000},
        {id: utilService.makeId(), sender:'Wolt', to:'mymail@gmail.com', subject: 'Purchase receipt: Halahmaniya 05.11.2020', body: 'Receipt / Tax invoice (Original) #7958913', isRead: true, isInbox: true, isChecked: false, isStarred: true, isDeleted: false, isSent: false, sentAt : 1600808400000},
        {id: utilService.makeId(), sender:'Slack', to:'mymail@gmail.com', subject: '[Slack] Notifications from the Coding Academy', body: 'You have a new direct message in Coding Academy', isRead: false, isInbox: true, isChecked: false, isStarred: false, isDeleted: false, isSent: false, sentAt : 1603486800000},
        {id: utilService.makeId(), sender:'Slack', to:'mymail@gmail.com', subject: '[Slack] Notifications from the Coding Academy', body: 'You have a new direct message in Coding Academy', isRead: false, isInbox: true, isChecked: false, isStarred: false, isDeleted: false, isSent: false, sentAt : 1603486800000},
        {id: utilService.makeId(), sender:'Slack', to:'mymail@gmail.com', subject: '[Slack] Notifications from the Coding Academy', body: 'You have a new direct message in Coding Academy', isRead: false, isInbox: true, isChecked: false, isStarred: false, isDeleted: false, isSent: false, sentAt : 1603486800000}
    ];

    storageService.storeToStorage(MAIL_DB_KEY, emails);
    return emails;
}