import Vue from 'vue';
const works = {
    state: {
        data: [],
    },
    getters: {
        works(state){
            return state.data;
        }
    },
    mutations: {
        setWorks(state, data){
            state.data = data; 
        },
        addNewWork(state, work){
            state.data.push(work);
        },
        editWork(state, work){
            let item = state.data.findIndex(el => el._id == work._id);
            Vue.set(state.data, item, work);
        },
        deleteWork(state, id){
            state.data = state.data.filter(elem => elem._id != id);
        }
    },
    actions: {
        getWorks({commit, rootGetters}){
            const $http = rootGetters.$http;
            return $http.get('api/works').then((res)=> {
                commit('setWorks', res.body.works);
            });
        },
        addNewWork({ commit, rootGetters }, fields) {
            const $http = rootGetters.$http;
            return $http.post('api/works', fields).then((res)=> {
                commit('addNewWork', res.body.item);
            });
        },
        editSavedWork({commit, rootGetters}, data) {
            const $http = rootGetters.$http;
            return $http.patch(`api/works/${data._id}`, data.formData).then((res)=> {
                commit('editWork', res.body.item);
            });
        },
        deleteSavedWork({commit, rootGetters}, id) {
            const $http = rootGetters.$http;
            return $http.delete(`api/works/${id}`).then((res)=> {
                commit('deleteWork', id);
            });
        }
    },
};

export default works;