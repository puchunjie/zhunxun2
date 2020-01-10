const user = {
    state: {
        isAdmin: true,
        userinfo: {}
    },
    getters: {
        userinfo: state => state.userinfo,
        isAdmin: state => state.isAdmin
    },
    actions: {
        setUserInfo(context, payload) {
            context.commit('SET_USER_INFO', payload);
        },
        setTeacher(context, payload) {
            context.commit('SET_IS_ADMIN', payload)
        }
    },
    mutations: {
        'SET_USER_INFO': (state, payload) => {
            let user = JSON.parse(JSON.stringify(payload));
            state.userinfo = user;
        },
        'SET_IS_ADMIN': (state, payload) => {
            state.isAdmin = payload;
        }
    }
}


export default user