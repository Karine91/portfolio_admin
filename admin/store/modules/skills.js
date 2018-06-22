function findSkillType(data, type){
    return data.find( elem => elem.type === type);
}

const skills = {
    state: {
        data: []
    },
    getters:{
        skills(state){
            return state.data;
        }
    },
    mutations:{
        addNewSkill(state, skill){
            let skillType = findSkillType(state.data, skill.type);
            skillType && skillType.skills.push(skill);
        },
        removeSavedSkill(state, skill){
            let skillType = findSkillType(state.data, skill.type);
            skillType.skills = skillType.skills.filter(item => item._id != skill._id);
        },
        removeSavedSkillGroup(state, id){
            state.data = state.data.filter(skillGroup => skillGroup._id != id);
        },
        changePercentData(state, data){
            let skillType = findSkillType(state.data, skill.type);
            skillType.skills.forEach((skill) => {
                if(skill._id === data.id){
                    skill.percents = data.percent;
                }
            });
        }   
    },
    actions: {
        fetchSkills({state, rootGetters}) {
            return rootGetters.$http.get('api/skills-types').then(response =>{
                state.data = response.body;
            }, error =>{
                console.error(error);
            });
        },
        addNewSkill({state, commit, rootGetters}, skill) {
            return rootGetters.$http.post('api/skills', skill).then( res => {
                commit('addNewSkill', res.body.item);
            }, error =>{
                console.error(error);
            });
        },
        editSkill({state, commit, rootGetters}, data){
            return rootGetters.$http.post('api/skills', data).then(res => {
                commit('changePercentData', data);
            }, error =>{
                console.error(error);
            });
        },
        removeSavedSkill({state, commit, rootGetters}, skill){
            return rootGetters.$http.delete(`api/skills/${skill._id}`).then(res => {
                commit('removeSavedSkill', skill);
            }, error => {
                console.error(error);
            });
        },
        removeSavedSkillGroup({state, commit, rootGetters}, id){
            return rootGetters.$http.delete(`api/skills-types/${id}`).then(res => {
                commit('removeSavedSkillGroup', id);
            }, error => {
                console.error(error);
            });
        }
    }
}

export default skills;