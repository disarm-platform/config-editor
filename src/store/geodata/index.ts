import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { GeodataState } from './types';
import { RootState } from '../types';

export const state: GeodataState = {
    layer_list: [],
    geodata_layer: null,
    error: false
};

const namespaced: boolean = true;

export const geodata: Module<GeodataState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations
};