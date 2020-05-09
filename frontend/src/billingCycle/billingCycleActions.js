import axios from 'axios'
import {
    toastr
} from 'react-redux-toastr'
import {
    reset as resetForm,
    initialize
} from 'redux-form'
import {
    showTabs,
    selectTab
} from '../common/tab/tabActions'
import billingCycle from './billingCycle'

const BASE_URL = 'http://localhost:3003/api'
const INITIAL_VALUES = {}

export function getList() {
    const request = axios.get(`${BASE_URL}/billingCycles`)
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    }

    export function create(values) {
        return submit(values, 'post')
    }

    export function update(values) {
        return submit(values, 'put')
    }

    function submit(values, method) {
        const id = values._id ? values._id : ''
        return dispatch => {
            axios[method](`${BASE_URL}/billingCycles/${id}`, values)
                .then(resp => {
                    toastr.success('Sucesso', 'Operação realizada com sucesso.')
                    dispatch(init())
                })
                .catch(e => {
                    e.response.data.erros.forEach(error => toastr.error('Erro', erro))
                })
        }
    }

    export function showUpdate(values) {
        return [
            showTabs('tabUpdate'),
            selectTab('tabUpdate'),
            initialize('billingCyclesForm', billingCycle)
        ]
    }

    export function init() {
        return [
            showTabs('tabList', 'tabCreate'),
            selectTab('tabList'),
            getList(),
            initialize('billingCycleForm', INITIAL_VALUES)
        ]
    }
}