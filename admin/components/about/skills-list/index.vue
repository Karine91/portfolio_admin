<template lang="pug">
    div.skill-type-block
        .skills-type-header
            .skills-title {{skillTypeData.name}}
            .skill-remove
                appButton(name="Удалить группу" @click.native="removeSkillGroup")
        table.skill-table
            skill-item(
                v-for="(skill, index) in skills"
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

export default {
    props: {
        skillTypeData: Object,
        skills: Array
    },
    mixins: [require('simple-vue-validator').mixin],
    data() {
        return {
            newSkill: "",
            newSkillPercent: 0
        }
    },
    validators:{
        'newSkill'(value){
            return Validator.value(value).required('Название не может быть пустым!');
        },
        'newSkillPercent'(value){
            return Validator.value(value).required('Поле не может быть пустым!').integer('Введите число');
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
            this.$emit('changeSkillPercent', params);
        },
        addSkill(){
            this.$validate().then(success => {
               if(!success) return; 
           
                this.$emit('addSkill', {
                    name: this.newSkill,
                    percents: this.newSkillPercent,
                    type: this.skillTypeData.type
                });
                this.newSkill = "";
                this.newSkillPercent = 0;
                this.validation.reset();
             });
        }
    },
    components: {
        skillItem: require('../skill-item'),
        appButton: require('../../button')
    }
}
</script>
<style lang="scss" src="./style.scss" scoped></style>
