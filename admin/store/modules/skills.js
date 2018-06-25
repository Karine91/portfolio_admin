function findSkillType(data, id){
    return data.find( elem => elem._id === id);
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
        setSkills (state, skills){
            state.data = skills;
        },
        addNewSkill(state, skill){
            let skillType = findSkillType(state.data, skill.type_id);
            delete skill.type_id;
            skillType && skillType.skills.push(skill);
        },
        addNewSkillGroup(state, skilltype) {
            state.data.push(skilltype);
        },
        removeSavedSkill(state, skill){
            let skillType = findSkillType(state.data, skill._id);
            skillType.skills = skillType.skills.filter(item => item._id != skill._id);
        },
        removeSavedSkillGroup(state, id){
            state.data = state.data.filter(skillGroup => skillGroup._id != id);
        },
        changePercentData(state, data){
            let skillType = findSkillType(state.data, data.type_id);
            skillType.skills.forEach((skill) => {
                if(skill._id === data.skill_id){
                    skill.percents = data.percents;
                }
            });
        },
        editSavedSkillGroupName(state, data){
            let skillType = findSkillType(state.data, data.id);
            skillType.name = data.name;
        }   
    },
    actions: {
        fetchSkills({commit, rootGetters}) {
            return rootGetters.$http.get('api/skills-types').then(response =>{
                commit('setSkills', response.body);
            }, error =>{
                console.error(error);
            });
        },
        addNewSkill({commit, rootGetters}, skill) {
            return rootGetters.$http.post('api/skills', skill).then( res => {
                commit('addNewSkill', {...res.body.item, type_id: res.body.parent_id});
            }, error =>{
                console.error(error);
            });
        },
        addNewSkillGroup({commit, rootGetters}, data){
            return rootGetters.$http.post('api/skills-types', data).then( res => {
                commit('addNewSkillGroup', res.body.item);
            }, error =>{
                console.error(error);
            });
        },
        editSkill({commit, rootGetters}, data){
            let sentData = {
                percents: data.percents
            }
            return rootGetters.$http.patch(`api/skills/${data.skill_id}`, sentData).then(res => {
                commit('changePercentData',  data);
            }, error =>{
                console.error(error);
            });
        },
        removeSavedSkill({commit, rootGetters}, skill){
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
        },
        editSavedSkillGroupName({state, commit, rootGetters}, data){
            return rootGetters.$http.patch(`api/skills-types/${data.id}`, {name: data.name}).then(res => {
                commit('editSavedSkillGroupName', data);
            }, error => {
                console.error(error);
            });
        }
    }
}

export default skills;