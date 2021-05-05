import $ from 'jquery';
import { isWindows } from '../utils/utils';

export default class ProjectManager {
	constructor() {
		this.sectionIndex = 0
        this.projects = ['landing','loading-screen','scan','email-caption','win-screen','lose-screen','already-try','outro'];
        // this.activeSection = null

		//this.mobileUI = document.getElementById('mobile_main')
		window.addEventListener('resize', () => this.resize())

		//this.resize()
		this.init()
	}

    resize() {
		this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
		// this.ui.setAttribute('class', this.isMobile ? 'mobile' : 'desktop')

	}

    init() {
      this.projectContainer = $('#project-detail');
      this.renderBohemio();
    //   this.renderChangeOfLight();
      this.handleProjectLinkHover();
      this.handleProjectLinkClick();
    }

    initEvents(){

    }
    renderDetailPage(projectHash){
        console.log(projectHash);
        switch(projectHash){
            case 'el-bohemio':
                this.renderBohemio();
                break;
            case 'change-of-light':
                this.renderChangeOfLight();
                break;
            case 'in-no-memory':
                break;
            case 'caleidoscope':
                this.renderCaleidoscope();
                break;
        }
    }

    setActiveSection(index) {
        index = typeof index === 'number'?index: this.getIndexByName(index);
        this.sectionIndex = index;
        this.activeSection = this.projects[this.sectionIndex];
        this.updateSection();
    }

    getIndexByName(index){
        return this.sectionClasses.indexOf(index);
    }

    nextSection(){
        setTimeout(()=>{
            this.setActiveSection(this.sectionIndex + 1);
        },1000)
    }

    previousSection(){
        this.setActiveSection(this.sectionIndex - 1);
    }

    handleProjectLinkClick(){
        // data-link
        $( '.project-link' ).click(function(){
            const LINK = $(this).attr('data-link');
            
            // console.log(LINK.replace(/\-/g,' '));
            
            window.location =  `/#project-detail?${LINK}`;
            if (document.title != `work | ${LINK.replace(/\-/g,' ')}`) {
                document.title = `work | ${LINK.replace(/\-/g,' ')}`;
            }
            // window.history.pushState(LINK, `work | ${LINK.replace(/\-/g,' ')}`,)

        })
    }

    handleProjectLinkHover(){
        // $('.project-link').on('hover',(e)=>{
        //     $(e.currentTarget).find('.info').removeClass('hidden')
        // })
        $( '.project-link' ).hover(function(){
            $('.project-link .info').addClass('hidden')
            $('.project-link').removeClass('selected')

            $('.project-link .info').removeClass('hidden')
            $(this).addClass('selected')
            const bg_sel = $(this).attr('data-bg');
            $('.carousel-bg').removeClass('show')
            $(`#${bg_sel}`).addClass('show')
        } , function(){
            // $('.project-link .info').addClass('hidden')
            // $(this).removeClass('selected')
        } );

        $('.projects-list').mouseleave(function(){
            $('.project-link .info').addClass('hidden')
            $('.project-link').removeClass('selected')
            $('.carousel-bg').removeClass('show')
            $(`#p_0`).addClass('show')
        })
    }
  

    hideprojects() {
		// var projects = document.getElementsByClassName('projects')

        this.projects.forEach((el)=>{
            if(el !== this.activeSection){
                el.classList.add('hidden');
            }
        })

	}

    updateSection() {
		this.hideprojects()
		console.log(this.activeSection)
		if (this.activeSection !== null) {
			this.activeSection.classList.remove('hidden');
            this.activeSection.focus();
			console.log('set section to ' + this.sectionClasses[this.sectionIndex]);
		}
	}

    renderBohemio(){
        this.projectContainer.html('');
        let htmlContent = 
        $(`<div id="elbohemio" class="project">
            <h1 class="title">El Bohemio</h1>
            <span class="tag">Branding</span>
            <article class="project-header">
                <div class="copy" style="width: 40%;">
                    <p>A restaurant frozen in time in Bogotá, founded in the middle of downtown, costumers of every age and class come there to taste their iconic products and remember old times. When the city was smaller and the tradition of bullfights where popular; for its history in the city and familiar tradition this place is well known between Bogotá citizens .</p>
                    <div class="color-pallet">
                        <div class="color-wrapper">
                            <div class="color" style="background-color: #b53149;"></div>
                            <div class="color" style="background-color: #d79300;"></div>
                            <div class="color" style="background-color: #00111b;"></div>
                        </div>
                        <span>Bohemio's Palette</span>
                    </div>
                </div>
                <figure style="width: 60%;"><img src="/assets/images/elbohemio_1.jpg" alt=""></figure>
            </article>
            <article>
                <figure><img src="/assets/images/elbohemio_2.jpg" alt=""></figure>
            </article>
            <article>
                <figure style="width: 30%;"><img src="/assets/images/elbohemio_3.jpg" alt=""></figure>
                <figure  style="width: 67.4%;"><img src="/assets/images/elbohemio_4.jpg" alt=""></figure>
            </article>
            <article>
                <figure><img src="/assets/images/elbohemio_5.jpg" alt=""></figure>
                <figure><img src="/assets/images/elbohemio_6.jpg" alt=""></figure>
                <figure><img src="/assets/images/elbohemio_7.jpg" alt=""></figure>
            </article>
            <article>
                <figure style="width: 60%;"><img src="/assets/images/elbohemio_8.jpg" alt=""></figure>
                <p style="width: 40%;">With this in particular we decided to refresh the iconic image of El Bohemio, keeping the warming atmosphere that already has. Showing a modern but warm image to the public, but always taking in account the remembrance of taste, hand-made and home that the restaurant always give to their customers.</p>
            </article>
            <article>
                <figure style="width: 30%;"><img src="/assets/images/elbohemio_9.jpg" alt=""></figure>
                <figure style="width: 67.4%;"><img src="/assets/images/elbohemio_10.jpg" alt=""></figure>
            </article>
            <article>
                <figure style="width: 58.7%;"><img src="/assets/images/elbohemio_11.jpg" alt=""></figure>
                <figure style="width: 26.1%;"><img src="/assets/images/elbohemio_12.jpg" alt=""></figure>
            </article>
            <article>
                <figure><img src="/assets/images/elbohemio_13.jpg" alt=""></figure>
            </article>
        </div>`);
        this.projectContainer.html(htmlContent);
    }

    renderChangeOfLight(){
        this.projectContainer.html('');
        let htmlContent = 
        $(`<div id="changeOfLight" class="project">
            <article>
                <div class="copy">
                    <h1 class="title">A&nbsp;change of light</h1>
                    <span class="tag">Art direction</span>

                    <p class="black"> Art direction of props and photography inspired by the short story “A change of light” written by the poet Julio Cortázar, where the historical, social and aestethic research where the main thing for it. At the same time, the construction of the characters of the story, with their thougths, behaviour and own aesthetic.</p>

                    <p><b>”I</b> preferred to keep it that way, the fullness was so great that I did not want to think of its vague silence, of a distraction that I had not known before, in a way of looking at me at times as if was looking for something, a flicker of gaze quickly returned to the immediate, to the cat or to a book. That also entered my way of preferring her, it was the melancholic atmosphere of the covered gallery, of the lilac envelopes.</p>
                    
                    <p>I know that in some late night awakening, watching her sleep against me, I felt that the time had come to tell her, to make her definitely mine by a total acceptance of my slow web of love. I did not do it because Luciana was sleeping, because Luciana was awake, because that Tuesday we were going to the movies, because we were looking for a car for the holidays because life came in big screens before and after the sunsets in which the ashen light seemed to condense its perfection into the pause of the wicker chair.</p>
                    
                    <p>That she spoke so little to me now, that sometimes she looked at me again as if looking for something lost, delayed in me the dark need to entrust him with the truth to finally explain the brown hair, the light from the gallery I had no time, a random schedule changed she took me to the center one end of the morning, I saw her leave a hotel, I did not recognize her when I recognized her, I did not understand when I understood that she was leaving holding the arm of a man taller than me.”</p>
                    
                    <span>Choosen scene</span>

                    <div class="color-pallet">
                        <div class="color-wrapper">
                            <div class="color" style="background-color: #ea739f;"></div>
                            <div class="color" style="background-color: #521429;"></div>
                            <div class="color" style="background-color: #a76cae;"></div>
                            <div class="color" style="background-color: #bec1a2;"></div>
                            <div class="color" style="background-color: #ece072;"></div>
                        </div>
                        <span class="pallet-label">Luciana’s Palette</span>
                    </div>
                </div>

                <div class="images-wrapper">
                    <figure><img src="/assets/images/changeoflights_1.jpg" alt=""></figure>
                    <figure><img src="/assets/images/changeoflights_2.jpg" alt=""></figure>
                    <figure><img src="/assets/images/changeoflights_3.jpg" alt=""></figure>
                </div>
            
            </article>
            
            <article>
                <figure class="gif"><img src="/assets/images/changeoflight_4.gif" alt=""></figure>
                <span>Construction process</span>
                <p class="learn-more">Want to know more about the process? <br><a href="https://issuu.com/carolina.ramirezr/docs/doc_cambio_de_luces_compressed" target="_blank">Click here</a></p>
            </article>
        </div>`);
        this.projectContainer.html(htmlContent);
    }

    renderCaleidoscope(){
        this.projectContainer.html('');
        let htmlContent = 
        $(`<div id="caleidoscope" class="project">
            <article>
                <div class="copy">
                    <h1 class="title">Caleidoscope</h1>
                    <span class="tag">Illustration</span>
                    <p>These are another image studies that I’ve made through the years, using analog and digital resources for it. Adjusting the style to a different idea.</p>
                </div>
        
                <div class="images-wrapper">
                    <figure><img src="/assets/images/caledoscopio_1.jpg" alt=""></figure>
                    <figure><img src="/assets/images/caledoscopio_2.jpg" alt=""></figure>
                    <figure><img src="/assets/images/caledoscopio_3.jpg" alt=""></figure>
                    <figure><img src="/assets/images/caledoscopio_5.jpg" alt=""></figure>
                    <figure><img src="/assets/images/caledoscopio_4.jpg" alt=""></figure>
                </div>
            </article>
        </div>`);

        this.projectContainer.html(htmlContent);
    }
}