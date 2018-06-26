<template lang='pug'>
    tr.skill-row
        td.skill-cell.skill-name {{skill.name}}
        td.skill-cell
            input(type="text" 
             v-model="newSkillPercent" 
             @input="changeSkillPercent(skill._id)"
             :class="{error: validation.hasError('newSkillPercent')}"
             ).input.skill-input
        td.skill-cell %
        td.skill-cell
            div.error-message {{validation.firstError('newSkillPercent')}}
        td.skill-cell.skill-remove
            appButton.red(
                name="Удалить"
                @click.native="removeSkill(skill)")
                          
</template>
<script>
import {Validator} from 'simple-vue-validator';
var debounce = require('debounce');
export default {
    mixins: [require('simple-vue-validator').mixin],
    data(){
        return {
            'newSkillPercent': this.skill.percents,
        }
    },
     validators:{
        'newSkillPercent'(value){
            return Validator.value(value).required('Поле не может быть пустым!').integer('Введите число');
        }
    },
    props: {
        skill: Object
    },
    methods:{
        removeSkill(skill){
            this.$emit('removeSkill', skill);
        },
        changeSkillPercent: debounce(function (_id){
            this.$validate().then(success => {
                if(!success) return;
                let params = {skill_id: _id, percents: parseInt(this.newSkillPercent)};
                this.$emit('changeSkillPercent', params);
            });
        }, 1000) 
    },
    components:{
        appButton: require('../../button'),
    }
}
</script>
<style lang="scss" src='./style.scss' scoped></style>