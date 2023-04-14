import authApi from '@/api/auth'

const state = {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null,

}

const mutations = {
    registerStart(state) {
        state.isSubmitting = true
        state.validationErrors = null
    },
    registerSuccess(state, payload) {
        state.isSubmitting = false
        state.currentUser = payload
        state.isLoggedIn = true
    },
    registerFailure(state, payload) {
        state.isSubmitting = true
        state.validationErrors = payload
    }
}

const actions = {
    register(context, credentials) {
        return new Promise(resolve => {
            context.commit('registerStart')
            authApi
                .register(credentials)
                .then(resposne => {
                context.commit('registerSuccess', credentials)
                resolve(resposne.data.user)
            })
                .catch(result => {
                    context.commit('registerFailure', result.response.data.errors)
                })
        })
    }
}

export default {
    state,
    mutations,
    actions
}