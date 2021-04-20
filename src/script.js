import $ from 'jquery';
import { TweenMax } from 'gsap';
import './scss/index.scss';
import './utils/utils';

window.jQuery = $;
window.$ = $;

let hash = window.location.hash;
let indexLanding = 0;
let indexAbout = 0;

// let $aboutChildrenText;
// let aboutImages = ['/assets/images/about']
console.log(hash);

window.addEventListener('popstate', ()=>{
  hash = window.location.hash;
  changeSection();
 // console.log(hash);
});
window.onload = () =>{
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
      indexAbout = indexAbout<4?indexAbout+=1:1;
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
  animateSection(hash);
  // console.log(hash)
}

const animateSection = (sec)=>{
  if(sec == '' || sec==' ' || sec == '#'){
    sec= '#landing';
  }
  
  switch(sec){
    case '#landing':
      TweenMax.to('nav', 0.3,{opacity:0, onComplete:()=>{
        $('nav').addClass('hidden')
      }})
      break;

    case '#about':
      $('nav').removeClass('hidden')
      TweenMax.to('nav', 0.3,{opacity:1, delay:1.2})
    break;
  }

  TweenMax.fromTo('section',0.4,{opacity: 1},{opacity: 0, delay: 0.3, onComplete:function(){
    $(this._targets).addClass('hidden');
    $(sec).removeClass('hidden');
    TweenMax.to(sec, 0.4,{opacity:1, delay:0.1})
  }})
}