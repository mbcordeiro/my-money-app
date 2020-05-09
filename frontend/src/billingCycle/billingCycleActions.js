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

export function getList() {
    const request = axios.get(`${BASE_URL}/billingCycles`)
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    }

    export function create(values) {
        return dispatch => {
            axios.post(`${BASE_URL}/billingCycles`, values)
                .then(resp => {
                    toastr.success('Sucesso', 'Operação realizada com sucesso.')
                    dispatch([
                        resetForm('billingCycleForm'),
                        getList(),
                        selectTab('tabList'),
                        showTabs('tabList', 'tabCrete')
                    ])
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
}