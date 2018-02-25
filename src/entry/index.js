import _ from 'loadsh';
import Icon from '../images/icon.png';
import '../style/style.css';

function component(){
    var element=document.createElement('div');

    element.innerHTML=_.join(['Hello','webpack'],'');
    element.classList.add('hello');

    // es6
    let checkName=(firstName,lastName)=>{
        if(firstName !== 'nader' || lastName !== 'dabit') {
            console.log('You are not Nader Dabit');
          } else {
             console.log('You are Nader Dabit');
          }
    }
    checkName('nader','jackson');

    // 加载图片
    var myIcon=new Image();
    myIcon.src=Icon;
    element.appendChild(myIcon);
    
    return element;
    
}

document.body.appendChild(component());