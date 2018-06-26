<template lang='pug'>
    .blog
        h1.title Страница "Блог"
        .form
            .form-title Добавить запись
            form(name="blog")
                input(type="text" placeholder="Название" v-model="fields.name").input
                dateInput(v-model="fields.date").input
                textarea(type="text" placeholder="Содержание" v-model="fields.body").input.textarea
        appButton(name="Добавить" @click.native="addPost").button-bottom
                
        .table(v-if="posts")
            table.posts
                thead
                    th Название
                    th Дата
                    th Описание
                    th
                    th
                tbody
                    table-post-row(
                        v-for="(post, index) in posts"
                        :key="index"
                        :data="post"
                        )
                         
</template>
<script>

import { mapGetters, mapMutations, mapActions } from 'vuex'
const moment = require('moment');
export default {
    data(){
        return {
            fields:{
                name: "",
                date: moment().format(),
                body: "",
            }
        }
    },
    created(){
        this.getBlogPosts();
    },
    methods: {
        ...mapActions(['addBlogPost', 'getBlogPosts']),
        timeFormated: function (value){
            return moment(value).format('YYYY-MM-DD');        
        },
        addPost(){
           let fieldsData = Object.assign({}, this.fields);
           this.addBlogPost(fieldsData);
           this.fields = {name: '', date: moment().format('YYYY-MM-DD'), body: ''};
        },
        
    },
    computed: {
    ...mapGetters(['posts'])
    },
    components:{
        appButton: require('../button'),
        dateInput: require('./dateInput'),
        tablePostRow: require('./postRow')
    }
}
</script>
<style lang='scss' src='./style.scss' scoped></style>