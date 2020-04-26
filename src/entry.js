import css from './css/index.css'
import less from './css/black.less'
import { print } from './utils'
const json = require("../config.json");


const JSPANG = 'jspang'

document.getElementById('title').innerHTML=`Hello ${JSPANG}`;
// console.log(aaa);
const NUM_0 = 0

print(1/NUM_0)
print('aaaaaaaaaaaaaaaaaaaaaaaa')
print($('#gogo').css({color: '#fff'}).text('1112342'))
$('#json').text('name: ' + json.name + ' ,website: ' + json.website);