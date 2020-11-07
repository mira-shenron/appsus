import { eventBus, UPDATE_NOTE_TODOS } from '../../../js/services/event-bus-service.js';

export default{
    props: ['note'],
    name: 'note-todo',
    template: `<ul class="note-todo-list">
                    <li class="note-todo-list-item" :class="getClass(idx)" @click.prevent="emitTodoStatus(idx)" v-for="(todo,idx) in note.info.todos">
                        {{todo.txt}}
                    </li>
                </ul>`,
      
    methods:{
        getClass(todoId){
            if (this.note.info.todos[todoId].isDone){
                return "todo-done"
            }
        },
        emitTodoStatus(todoId){
            eventBus.$emit(UPDATE_NOTE_TODOS, this.note.id, todoId)
        },
    }
}