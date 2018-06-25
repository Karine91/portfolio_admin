<template lang="pug">
  .about
    h1.title Страница "Обо мне"
    .about-content
        .skills-list(v-for="(skillType, index) in skills")
            skills-list(
                :skillTypeData="skillType"
                :key="index",
                @addSkill ="addSkill", 
                @removeSkill ="removeSkill",
                @removeSkillGroup="removeSkillGroup",
                @editSkillGroupName="editSkillGroupName"
                @changeSkillPercent="changeSkillPercent", 
            )
    table.buttons-add-group
        tr
            td.add-name-title Название
            td.add-name-input 
                input(
                    type="text" 
                    v-model="newSkillGroup" 
                    :class="{error: validation.hasError('newSkillGroup')}"
                ).input.input-skill-type-name
        tr
            td(colspan="2")
                div.error-message {{validation.firstError('newSkillGroup')}}      
        tr
            td(colspan="2")         
                appButton.add-group-btn(name="Добавить группу" @click.native="addSkillGroup")        


</template>
<script>

import {mapActions, mapGetters, mapMutations} from 'vuex';
import {Validator} from 'simple-vue-validator';
export default {
    mixins: [require('simple-vue-validator').mixin],
    data(){
        return{
            newSkillGroup: ''
        }
    },
    validators:{
        'newSkillGroup'(value){
            return Validator.value(value).required('Название не может быть пустым!');
        }
    },
    computed:{
        ...mapGetters(['skills'])
    },
    created(){
        this.fetchSkills();
    },
    methods: {
        ...mapActions(['fetchSkills', 'addNewSkill', 'addNewSkillGroup', 'removeSavedSkill', 'removeSavedSkillGroup', 'editSavedSkillGroupName', 'editSkill']),
        addSkill(skill){
           this.addNewSkill(skill);
        },
        removeSkill(skill){
            this.removeSavedSkill(skill);
        },
        addSkillGroup(){          
            this.$validate().then(success => {
                if(!success) return;
                let data = {
                    name: this.newSkillGroup
                } 
                this.addNewSkillGroup(data);
                this.newSkillGroup = "";
                this.validation.reset();
            });
        },
        editSkillGroupName(data){
            this.editSavedSkillGroupName(data);
        },
        removeSkillGroup(id){
            this.removeSavedSkillGroup(id);
        },
        changeSkillPercent(params){
            this.editSkill(params);
        }
    },
    components: {
        skillsList: require('./skills-list'),
        appButton: require('../button')
    }
}
</script>
<style lang="scss" src="./style.scss" scoped></style>
