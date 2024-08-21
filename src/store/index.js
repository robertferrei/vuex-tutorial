import {createStore} from 'vuex'
import { pessoas } from './mutations'

const {ADD_PESSOAS,ADD_FAVORITO,REMOVER_FAVORITO} = pessoas
//state basicamente é passado pra toda a aplicação 
//getters são os dados computados| os getters recebem os state como parametro
//mutations consegue fazer a alteração no state
//actions as actions geralmente é utilizada para modificar as mutations
const store =  createStore({
    state:{
         listaPessoas:[],
        listaFavoritos:[           
        ]
    },
    getters:{
        totalFavoritos (state){
            return state.listaFavoritos.length
        },
        isFavorito: (state) =>(id) =>{
            return state.listaFavoritos.some(x=> x.id === id)
        }   


    },
    mutations:{
      ADD_FAVORITO(state,payLoad){
        const usuarioSelecionado = state.listaPessoas.find((x) => x.id === payLoad);
        state.listaFavoritos= [...state.listaFavoritos, usuarioSelecionado];              
      },
      REMOVER_FAVORITO(state,payLoad){
        state.listaFavoritos = state.listaFavoritos.filter((x) => x.id !== payLoad);
      },
      ADD_PESSOAS(state,payLoad){
        state.listaPessoas = [];
        state.listaPessoas = payLoad.data;
      }
    },
    actions:{
      async adicionaPessoas({commit}, payLoad){
        const req = await fetch(`https://reqres.in/api/${payLoad}`)
        const pessoas = await req.json();        
        commit(ADD_PESSOAS,pessoas);
      },
      adicionaFavorito({commit,payLoad}){
        commit(ADD_FAVORITO,payLoad)
      },
      removeFavorito({commit,payLoad}){
        commit(REMOVER_FAVORITO,payLoad)
      }
    }
})

export default store