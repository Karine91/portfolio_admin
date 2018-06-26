<template lang="pug">
    div.skill-type-block
        .skills-type-header
            .skills-title 
                input(
                        type="text" 
                        v-model="skillGroupName"
                        @input="editSkillGroupName" 
                        :class="{error: validation.hasError('skillGroupName')}"
                    ).input.input-skill-name
            .skill-remove
                appButton.red(name="Удалить группу" @click.native="removeSkillGroup")
        div.error-message {{validation.firstError('skillGroupName')}}        
        table.skill-table(v-if="skillTypeData.skills.length")
            skill-item(
                v-for="(skill, index) in skillTypeData.skills"
                :key="index"
                :skill="skill"
                @removeSkill= "removeSkill"
                @changeSkillPercent="changeSkillPercent")
        table.buttons
            tr
                td.add-name-title Название
                td 
                    input(
                        type="text" 
                        v-model="newSkill" 
                        :class="{error: validation.hasError('newSkill')}"
                    ).input.input-skill-name
            tr
                td(colspan="2")
                    div.error-message {{validation.firstError('newSkill')}}
            tr
                td.add-name-title Проценты
                td 
                    input(
                        type="text" 
                        v-model="newSkillPercent" 
                        :class="{error: validation.hasError('newSkillPercent')}"
                    ).input.skill-input
                
            tr
                td(colspan="2")
                    div.error-message {{validation.firstError('newSkillPercent')}}        
            tr
                td
                    appButton(name="Добавить" @click.native="addSkill" :disabled="validation.hasError()")
</template>
<script>

import {Validator} from 'simple-vue-validator';
var debounce = require('debounce');
export default {
    props: {
        skillTypeData: Object,
    },
    mixins: [require('simple-vue-validator').mixin],
    data() {
        return {
            newSkill: "",
            newSkillPercent: 0,
            skillGroupName: this.skillTypeData.name
        }
    },
    validators:{
        'newSkill'(value){
            return Validator.value(value).required('Название не может быть пустым!');
        },
        'newSkillPercent'(value){
            return Validator.value(value).required('Поле не может быть пустым!').integer('Введите число');
        },
        'skillGroupName'(value){
            return Validator.value(value).required('Название не может быть пустым!');
        }
    },
    methods: {
        removeSkill(skill){
            this.$emit('removeSkill', skill);
        },
        removeSkillGroup(){
            this.$emit('removeSkillGroup', this.skillTypeData._id);
        },
        changeSkillPercent(params){
            params.type_id = this.skillTypeData._id;
            this.$emit('changeSkillPercent', params);
        },
        addSkill(){
            this.$validate().then(success => {
               if(!success) return; 
           
                this.$emit('addSkill', {
                    name: this.newSkill,
                    percents: this.newSkillPercent,
                    type_id:  this.skillTypeData._id
                });
                this.newSkill = "";
                this.newSkillPercent = 0;
                this.validation.reset();
             });
        },
        editSkillGroupName: debounce(function () {
            this.$emit('editSkillGroupName', {name: this.skillGroupName, id: this.skillTypeData._id});
        }, 200)
    },
    components: {
        skillItem: require('../skill-item'),
        appButton: require('../../button')
    }
}
</script>
<style lang="scss" src="./style.scss" scoped></style>
