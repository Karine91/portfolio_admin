import moment from 'moment';
const posts = {
    state: {
        data: [],
    },
    getters: {
        posts: ({ data }) => (data),
    },
    mutations: {
        addBlogPost(state, post) {
            state.data.push(post);
        },
        editBlogPost(state, post) {
            let postEdit = state.data.find(elem => elem._id == post._id);
            if (postEdit) {
                postEdit = post;
            } 
        },
        deleteBlogPost(state, id) {
            state.data = state.data.filter(elem => elem._id != id);
        }, 
        setPosts(state, posts){
            state.data = posts;
        },
    },
    actions: {
        getBlogPosts({state, commit, rootGetters}){
            const $http  = rootGetters.$http;
            return $http.get('api/blog').then((res)=>{
                let postsData = res.body.articles.map(item => {
                    item.date = moment(item.date).format('YYYY-MM-DD');
                    return item;
                });
                commit('setPosts', postsData);
            });
        },
        addBlogPost({commit, rootGetters}, data){
            const $http  = rootGetters.$http;
            $http.post('api/blog', data, {emulateJSON: true}).then(()=> {
                commit('addBlogPost', data);
            });
        },
        editBlogPost({commit, rootGetters}, data){
            const $http  = rootGetters.$http;
            $http.patch(`api/blog/${data._id}`, data, {emulateJSON: true}).then(()=> {
                commit('editBlogPost', data);
            });
        },
        deleteBlogPost({commit, rootGetters}, id){
            const $http  = rootGetters.$http;
            $http.delete(`api/blog/${id}`, {emulateJSON: true}).then(()=> {
                commit('deleteBlogPost', id);
            });
        },
    },
};

export default posts;