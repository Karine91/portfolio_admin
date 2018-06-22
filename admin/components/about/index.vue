<template lang="pug">
  .about
    h1.title Страница "Обо мне"
    .about-content
        .skills-list(v-for="(skillType, index) in skills")
            skills-list(
                :skills="skillType.skills" 
                :skillTypeData="skillType"
                :key="index",
                @addSkill ="addSkill", 
                @removeSkill ="removeSkill",
                @removeSkillGroup="removeSkillGroup"
                @changeSkillPercent="changeSkillPercent", 
            ) 
    appButton(name="Добавить группу" @click.native="addSkill(skillType)")        


</template>
<script>

import {mapActions, mapGetters, mapMutations} from 'vuex';

export default {
    data(){
        return{
            
        }
    },
    computed:{
        ...mapGetters(['skills'])
    },
    created(){
        this.fetchSkills();
    },
    methods: {
        ...mapActions(['fetchSkills', 'addNewSkill', 'removeSavedSkill', 'removeSavedSkillGroup']),
        ...mapMutations(['changePercentData']),
        addSkill(skill){
           this.addNewSkill(skill);
        },
        removeSkill(skill){
            this.removeSavedSkill(skill);
        },
        removeSkillGroup(id){
            this.removeSavedSkillGroup(id);
        },
        changeSkillPercent(params){
            params.percent = parseInt(params.percent)
            this.changePercentData(params);
        }
    },
    components: {
        skillsList: require('./skills-list'),
        appButton: require('../button')
    }
}
</script>
<style lang="scss" src="./style.scss" scoped></style>
