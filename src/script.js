import $ from 'jquery';
import { TweenMax } from 'gsap';
import './scss/index.scss';
import './utils/utils';

import ProjectManager from './js/projectManager';
window.jQuery = $;
window.$ = $;

let hash = window.location.hash;
let urlData = '';
let indexLanding = 0;
let indexAbout = 0;
const PM = new ProjectManager();
// let $aboutChildrenText;
// let aboutImages = ['/assets/images/about']
console.log(hash);

window.addEventListener('popstate', ()=>{
  hash = window.location.hash;
  const temp = hash.split('?');
  hash = temp[0];
  urlData = temp[1];
  // console.log(hash);
  changeSection();
});
window.onload = () =>{
 
  const temp = hash.split('?');
  hash = temp[0];
  urlData = temp[1];

  handleBgAnimation();
  changeSection();
  // $aboutChildrenText = $('#about .copy')
}

const handleBgAnimation = ()=>{
  changeBg();
  setInterval(() => {
    changeBg();
  }, 5000);
}
const changeBg = ()=>{
  switch(hash){
    case '':
    case '#':
      indexLanding = indexLanding<3?indexLanding+=1:1;
      console.log('landing',indexLanding)
      
      $('#landing .new').css('backgroundImage',`url(./assets/images/home_${indexLanding}.jpg)`)
      TweenMax.fromTo('#landing .old', 1,{opacity:1},{opacity:0, onComplete:()=>{
        $('#landing .old').css('backgroundImage',`url(./assets/images/home_${indexLanding}.jpg)`)
        TweenMax.set('#landing .old',{clearProps: 'opacity'});
      }});
      break;
    case '#about':
      indexAbout = indexAbout<5?indexAbout+=1:1;
      console.log('about',indexAbout)
      

      $('#about .new').css('backgroundImage',`url(./assets/images/about_${indexAbout}.jpg)`)
      TweenMax.fromTo('#about .old', 1,{opacity:1},{opacity:0, onComplete:()=>{
        $('#about .old').css('backgroundImage',`url(./assets/images/about_${indexAbout}.jpg)`)
        TweenMax.set('#about .old',{clearProps: 'opacity'});
      }});

      TweenMax.to(`#about .c_${indexAbout}`,1,{y:'-=20px', opacity: 1, onStart:()=>{
        TweenMax.set('#about .copy', {clearProps:'all'})
      }})
      // TweenMax.fromTo('#about .new', 0.4,{opacity:0},{opacity:1});
     
      break;
  }
}

const changeSection = () =>{
 

  // console.log(temp)
  animateSection(hash);
  // console.log(hash)
}

const animateSection = (sec,data)=>{
  
  if(sec == '' || sec==' ' || sec == '#'){
    sec= '#landing';
  }

  $('#copy-right').removeClass('dark-theme');
  $('#social-links').removeClass('dark-theme');
  $('nav').removeClass('dark-theme');
  
  switch(sec){
    case '#landing':
      TweenMax.to('nav', 0.3,{opacity:0, onComplete:()=>{
        $('nav').addClass('hidden')
      }})
      break;
    
    case '#project-detail':
      PM.renderDetailPage(urlData);
     
      $('nav').removeClass('hidden') 
      TweenMax.to('nav', 0.3,{opacity:1, delay:1.2, onStart:()=>{
        $('#copy-right').addClass('dark-theme');
        $('nav').addClass('dark-theme');
        $('#social-links').addClass('dark-theme');
      }})
      
      break;
    default:
      $('nav').removeClass('hidden')
      TweenMax.to('nav', 0.3,{opacity:1, delay:1.2})
    break;
  }

  TweenMax.fromTo('section',0.4,{opacity: 1},{opacity: 0, delay: 0.3, onComplete:function(){
    $('section').scrollTop(0); 
    $(this._targets).addClass('hidden');
    $(sec).removeClass('hidden');
    TweenMax.to(sec, 0.4,{opacity:1, delay:0.1})
  }})
}