import request from '../../utils/request';
import { _local } from '../../api/local';

export function getHisMedicineInfo(options) {
  return request(`${_local}/a/basemedicinedetail/getHisMedicineInfo`, {
    method: 'GET',
    type: 'formData',
    body: options
  })
}

export function getUnitInfo(options) {
  return request(`${_local}/a/depot/druginfo/getUnitInfo`, {
    method: 'GET',
    type: 'formData',
    body: options
  })
}

export function batchEditingMedicine(options) {
  return request(`${_local}/a/basemedicinedetail/batchEditingMedicine`, {
    method: 'POST',
    type: 'json',
    body: options
  })
}