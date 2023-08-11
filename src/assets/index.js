import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon/index'

Vue.component('svg-icon',SvgIcon)
const req = require.context('@/assets',false,/\.svg$/)
const requireAll = requireContext =>{
    // requireContext.keys()数据：['./404.svg', './agency.svg', './det.svg', './user.svg']
    requireContext.keys().map(requireContext)
} 
requireAll(req)
