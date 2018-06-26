<template lang='pug'>
    tr(:class="{edit: editMode}")
        td 
            input(type="text" v-model="post.name" :readonly="!editMode" )
        td 
            dateInput(v-model="post.date" v-if="post.date" :readonly="!editMode")
        td 
            input(type="text" v-model="post.body" :readonly="!editMode")
        td(width="50")
            appButton(@click.native="editPost" :name="editMode ? 'Сохранить' : 'Редактировать'")  
        td(width="50")
            appButton.red(@click.native="deletePost" name="Удалить") 
</template>
<script>
import {mapActions} from 'vuex';
export default {
    props: {
        data: Object
    },
    data(){
        return {
            post: {},
            editMode: false
        }
    },
    mounted(){
        this.post = this.data;
        this.$root.$on('editPost', () => {
            this.editMode = false;
        });
    },
    methods: {
        ...mapActions(['editBlogPost', 'deleteBlogPost']),
        editPost(){
            if(this.editMode) {
                this.savePost();
            }else{
                this.$root.$emit('editPost');
                this.editMode = true; 
            }
        },
        savePost(){
            this.editBlogPost(this.post).then(()=> {
                this.editMode = false;
            });
        },
        deletePost(){
            this.deleteBlogPost(this.post._id);
        }
    },
    components: {
        dateInput: require('./dateInput'),
        appButton: require('../button')
    }
}
</script>
<style lang='scss' scoped>
    td {
        background: #fff;
        border: 1px solid #ccc;
        padding: 5px;
    
    }
    td input {
        width: 100%;
        border: none;
    }
    .edit {
        td input {
            border: 1px solid #ccc;
        }
    }
    button{
        width: 100%;
    }
</style>