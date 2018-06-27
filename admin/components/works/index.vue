<template lang='pug'>
    .works
        work-form(
            v-if="!editMode"
            key="add"
            ref="addForm"
            headTitle = 'Страница "Мои работы"',
            formTitle = 'Добавить работу',
            btnText = 'Добавить'
            @saved="addWork"
        )
        work-form(
            v-else
            key="edit"
            ref="editForm"
            :work="editData"
            headTitle = 'Страница "Мои работы" - Редактирование',
            formTitle = 'Редактировать работу',
            btnText = 'Редактировать'
            @saved="editWork"
        )
            appButton.red(@click.native="editMode = false" name="Отмена" slot="buttons")          
        table.table-works
            thead
                th Название проекта
                th Технологии
                th Ссылка на сайт
                th Картинка
                th
                th
            tbody
                tr(v-for="(work, index) in works" :key="index")
                    td {{ work.name }}
                    td {{ work.technology }}
                    td 
                        a(href="work.link" target="_blank") {{ work.link }}
                    td( width="100" height="100" align="center") 
                        img(:src="$http.options.root + work.picture" alt="" height="100%")
                    td(width="50") 
                        appButton(@click.native="editMode = true; editData = work" name="Редактировать") 
                    td(width="50") 
                        appButton.red(@click.native="deleteWork(work._id)" name="Удалить")        

        
</template>
<script>
import { Validator } from 'simple-vue-validator'
import { mapActions, mapGetters } from 'vuex'

export default {
    mixins: [require('simple-vue-validator').mixin],
    validators: {
        'fields.file': (value) => {
            return Validator.custom(() => {
                if (Validator.isEmpty(value)) return
                const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg',]
                if (!allowedTypes.includes(value.type)) {
                    return 'Недопустимый формат файла, разрешены только .jpg, .jpeg и .png'
                }
            })
        }
    },
    data: function() {
        return {
            editMode: false,
            editData: {}
        }
    },
    created(){
        this.getWorks();
    },
    computed: {
        ...mapGetters(['works'])
    },
    methods: {
        ...mapActions(['addNewWork', 'editSavedWork', 'getWorks', 'deleteSavedWork']),
        addWork(fields){
            let formData = new FormData();
            formData.append('file', fields.file, fields.file.name);
            formData.append('tech', fields.tech);
            formData.append('name', fields.name);
            formData.append('link', fields.link);
            this.addNewWork(formData).then(()=> {
                this.$refs.addForm.clearForm();
            });
        },
        editWork(fields){
            let formData = new FormData();
            if(fields.file){
                formData.append('file', fields.file, fields.file.name);
            }
            formData.append('tech', fields.tech);
            formData.append('name', fields.name);
            formData.append('link', fields.link);
            this.editSavedWork({_id: this.editData._id, formData}).then(()=> {
                this.editData = {};
                this.editMode = false;
                this.$refs.editForm.clearForm();
            });
        },
        deleteWork(id){
            this.deleteSavedWork(id);
        },
        
    },
    components:{
        appButton: require('../button'),
        workForm: require('./form')
    }
}
</script>
<style lang='scss' src='./style.scss' scoped></style>