<template lang='pug'>
    .works-form 
        h1.title {{headTitle}}
        .form
            .form-title {{formTitle}}
            form(name="works" id="worksForm")
                input(type="text" placeholder="Название проекта" v-model="fields.name").input
                input(type="text" placeholder="Технологии" v-model="fields.tech").input
                input(type="text" placeholder="Ссылка на сайт" v-model="fields.link").input
                label.upload
                    input(type="file" @change="getFile($event)").input-file
                    .upload-icon
                    .upload__text Загрузить картинку
                div.preview-image
                    img(:src="imgPrewPath" alt="")    
                div.error-message {{validation.firstError('fields.file')}}
        .btn-group        
            appButton(:name="btnText" type="submit" forName="worksForm"
            :disabled="(!fields.file && !imgPrewPath) || validation.hasError('fields.file')"
            @click.native="submitHandler").button-bottom
            slot(name="buttons")
</template>
<script>
import { Validator } from 'simple-vue-validator'
import { mapActions, mapGetters } from 'vuex'
export default {
    props: {
        headTitle: String,
        formTitle: String,
        btnText: String,
        work: Object,
    },
    mixins: [require('simple-vue-validator').mixin],
    validators: {
        'fields.file': (value) => {
            return Validator.custom(() => {
                if (Validator.isEmpty(value) && !this.imgPrewPath) return
                const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg',]
                if (!allowedTypes.includes(value.type)) {
                    return 'Недопустимый формат файла, разрешены только .jpg, .jpeg и .png'
                }
            })
        }
    },
    watch: {
        work:{
            handler(value){
                if(value){
                    this.fields.name = value.name;
                    this.fields.tech = value.technology;
                    this.fields.link = value.link;
                    this.imgPrewPath = this.$http.options.root + value.picture;
                }
            },
            immediate: true
        } 
    },
    data: function() {
        return {
            imgPrewPath: '',
            fields: {
                name: '',
                tech: '',
                link: '',
                file: null
            }
        }
    },
    methods: {
        getFile(event) {
            if (event.target.files && event.target.files[0]) {
                var reader = new FileReader();
                const file = event.target.files[0];
                reader.onload = (e) => {
                    this.imgPrewPath = e.target.result;
                }
                reader.readAsDataURL(file);
                this.fields.file = file;
            } 
        },
        submitHandler(){
            this.$validate().then(success => {
                if (!success) return;
                this.$emit('saved', this.fields);
            });
        },
        clearForm(){
            this.fields.name = '';
            this.fields.tech = '';
            this.fields.link = '';
            this.fields.file = null;
            this.imgPrewPath = '';
        }
    },
    destroyed(){
        console.log('destroyed');
    },
    components:{
        appButton: require('../button')
    }
}
</script>
<style lang='scss' scoped>
.works-form {
    display: flex;
    height: 100%;
    flex-direction: column;
    flex-grow: 1;
}
.upload-icon{
    width: 30px;
    height: 30px;
    background: svg('~img/img-icon.svg', $green);
    background-size: 100%;
}
.upload {
    display: inline-flex;
    align-items: center;  
    cursor: pointer;
}
  
.upload__text {
    color: rgba($green, 0.7);
    margin-top: -8px;
    margin-left: 12px;
}
form{
    display: flex;
    flex-direction: column;  
}
.button{
    align-self: flex-start;
    margin-right: 10px;
}
.input{
    margin-bottom: 20px;
    max-width: 300px;
}
.input-file{
    position: absolute;
    visibility: hidden;
    height: 0;
}
.error-message{
    margin-top: 10px;
}

.preview-image{
    max-width: 200px;
    margin-top: 10px;
    img{
        width: 100%;
    }
}
</style>