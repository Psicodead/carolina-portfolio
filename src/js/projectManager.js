import $ from 'jquery';
import { isWindows, isMobile } from '../utils/utils';
import { TweenMax } from 'gsap';


export default class ProjectManager {
	constructor() {
		this.sectionIndex = 0
        this.projects = ['landing','loading-screen','scan','email-caption','win-screen','lose-screen','already-try','outro'];
        // this.activeSection = null

		//this.mobileUI = document.getElementById('mobile_main')
		window.addEventListener('resize', () => this.resize())

		//this.resize()
		this.init()
        this.fadeOnScroll()
	}

    resize() {
		// this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
		// this.ui.setAttribute('class', this.isMobile ? 'mobile' : 'desktop')
	}

    fadeOnScroll(){
        $('#project-detail').scroll( function(){
            $('.fade-in').each( function(i){
                
                var bottom_of_element = $(this).offset().top + $(this).outerHeight()/3;
                var bottom_of_window = $(window).scrollTop() + $(window).height();
                
                if( bottom_of_window > bottom_of_element ){
                    $(this).animate({'opacity':'1'},600);
                }
                
            }); 
        });
        
    }

    init() {
      this.projectContainer = $('#project-detail');
      this.renderDetailPage('el-bohemio');
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
                this.renderInNoMemory();
                break;
            case 'caleidoscope':
                this.renderCaleidoscope();
                break;
        }
        console.log($('.project').children())
        TweenMax.from('.project', 0.6, {opacity: 0, y: 50, delay: 1})
        TweenMax.from('.project-nav', 0.6, {opacity: 0, y: 50, delay: 1})
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
            if(isMobile())
                return
            $('.project-link .info').addClass('hidden')
            $('.project-link').removeClass('selected')

            $('.project-link .info').removeClass('hidden')
            $(this).addClass('selected')
            const bg_sel = $(this).attr('data-bg');
            $('.carousel-bg').removeClass('show')
            $(`#${bg_sel}`).addClass('show')
            
            TweenMax.to('.project-link .title',0.3, {x: -120});
            TweenMax.to('.project-link .info',0.3, {x: 120});
        } , function(){
            // $('.project-link .info').addClass('hidden')
            // $(this).removeClass('selected')
        } );

        $('.projects-list').mouseleave(function(){
            if(isMobile())
                return
            // $('.project-link .info').addClass('hidden')
            $('.project-link').removeClass('selected')
            $('.carousel-bg').removeClass('show')
            $(`#p_0`).addClass('show')
            TweenMax.to('.project-link .title',0.3, {x: 0});
            TweenMax.to('.project-link .info',0.3, {x: 0, onComplete:function(){
                $('.project-link .info').addClass('hidden')
            }});
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
            <article class="project-header">
                <div class="copy" style="width: 45%;">
                    <h1 class="title">El Bohemio</h1>
                    <span class="tag">Branding</span>
                    <p>A restaurant frozen in time in Bogotá, founded in the middle of downtown, costumers of every age and class come there to taste their iconic products and remember old times. When the city was smaller and the tradition of bullfights where popular; for its history in the city and familiar tradition this place is well known between Bogotá citizens .</p>
                    <div class="color-pallet">
                        <div class="color-wrapper">
                            <div class="color" style="background-color: #b53149;"></div>
                            <div class="color" style="background-color: #d79300;"></div>
                            <div class="color" style="background-color: #00111b;"></div>
                        </div>
                        <span class="pallet-label">Bohemio's Palette</span>
                    </div>
                </div>
                <figure style="width: 60%;"><img src="/assets/images/elbohemio_1.jpg" alt=""></figure>
            </article>
            <article class="fade-in">
                <figure><img src="/assets/images/elbohemio_2.jpg" alt=""></figure>
            </article>
            <article class="fade-in">
                <figure style="width: 30%;"><img src="/assets/images/elbohemio_3.jpg" alt=""></figure>
                <figure  style="width: 67.4%;"><img src="/assets/images/elbohemio_4.jpg" alt=""></figure>
            </article>
            <article class="fade-in">
                <figure><img src="/assets/images/elbohemio_5.jpg" alt=""></figure>
                <figure><img src="/assets/images/elbohemio_6.jpg" alt=""></figure>
                <figure><img src="/assets/images/elbohemio_7.jpg" alt=""></figure>
            </article>
            <article class="fade-in block-with-copy">
                <figure style="width: 60%;"><img src="/assets/images/elbohemio_8.jpg" alt=""></figure>
                <p style="width: 40%;">With this in particular we decided to refresh the iconic image of El Bohemio, keeping the warming atmosphere that already has. Showing a modern but warm image to the public, but always taking in account the remembrance of taste, hand-made and home that the restaurant always give to their customers.</p>
            </article>
            <article class="fade-in">
                <figure style="width: 30%;"><img src="/assets/images/elbohemio_9.jpg" alt=""></figure>
                <figure style="width: 67.4%;"><img src="/assets/images/elbohemio_10.jpg" alt=""></figure>
            </article>
            <article class="fade-in">
                <figure style="width: 58.7%;"><img src="/assets/images/elbohemio_11.jpg" alt=""></figure>
                <figure style="width: 26.1%;"><img src="/assets/images/elbohemio_12.jpg" alt=""></figure>
            </article>
            <article class="fade-in">
                <figure><img src="/assets/images/elbohemio_13.jpg" alt=""></figure>
            </article>
            <span class="topics">#Branding  #DesignStrategy #DesignResearching #Brieffing #ProductPhotography</span>
        </div>`);
        this.projectContainer.html(htmlContent);
        this.projectContainer.append(`<div class="project-nav"><a href="#project-detail?caleidoscope">Previous</a>/<a href="#project-detail?change-of-light">Next</a></div>`)

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
                    <figure class="fade-in"><img src="/assets/images/changeoflights_2.jpg" alt=""></figure>
                    <figure class="fade-in"><img src="/assets/images/changeoflights_3.jpg" alt=""></figure>
                </div>
            
            </article>
            
            <article class="fade-in">
                <figure class="gif"><img src="/assets/images/changeoflight_4.gif" alt=""></figure>
                <span>Construction process</span>
                <p class="learn-more">Want to know more about the process? <br><a href="https://issuu.com/carolina.ramirezr/docs/doc_cambio_de_luces_compressed" target="_blank">Click here</a></p>
            </article>
            <span class="topics">#ArtDirection #PropMaking #EditorialPhotography #DesignResearching #HandmadeBackground</span>
        </div>`);
        this.projectContainer.html(htmlContent);
        this.projectContainer.append(`<div class="project-nav"><a href="#project-detail?el-bohemio">Previous</a>/<a href="#project-detail?in-no-memory">Next</a></div>`)

    }

    renderInNoMemory(){
        this.projectContainer.html('');
        let htmlContent = 
        $(`<div id="in-no-memory" class="project">
            <article>
                <div class="copy">
                    <h1 class="title">In no memory</h1>
                    <span class="tag">Fine Art photography</span>
                    <p>The mentality of each person about family, traditions, people and stories are connected to a specific time of childhood, that invokes some sounds, colors and concrete lightings. Bodies that came to life again in this photo graphs by the use of the light that made a trip through the fading color in the walls cause of the sun, the moon, wind and water as their main amplifiers; cracks had been made by the use of the place when was inhabited, some of them are hidden and they're just noticed by the projections.</p>
                </div>

                <div class="sub-copy mobile">
                    <p class="black">Chapter 1:</p>
                    <p class="sub-title">"In no Memory"</p>
                    <p>Was born by 2 stories about Rico Family, La Concordia and Coacha, buildings that shared as people as photographic files that were saved by the family, that’s why a parallel can be created about what is now and what was there, the differences and similarities between people and traditions of the past there.</p>
                    <div class="color-pallet">
                        <div class="color-wrapper">
                            <div class="color" style="background-color: #021a26;"></div>
                            <div class="color" style="background-color: #2b606e;"></div>
                            <div class="color" style="background-color: #ff6549;"></div>
                            <div class="color" style="background-color: #ff9138;"></div>
                            <div class="color" style="background-color: #ffeb2a;"></div>
                        </div>
                        <span class="pallet-label">Project’s Palette</span>
                    </div>
                </div>

                <div class="images-wrapper">
                    <figure><img src="/assets/images/in_no_memory_1.jpg" alt=""></figure>
                    <figure><img src="/assets/images/in_no_memory_2.jpg" alt=""></figure>
                </div>
            </article>
            <article id="chapter-1">
                <div class="left fade-in">
                    <div class="color-pallet">
                        <div class="color-wrapper">
                            <div class="color" style="background-color: #021a26;"></div>
                            <div class="color" style="background-color: #2b606e;"></div>
                            <div class="color" style="background-color: #ff6549;"></div>
                            <div class="color" style="background-color: #ff9138;"></div>
                            <div class="color" style="background-color: #ffeb2a;"></div>
                        </div>
                        <span class="pallet-label">Project’s Palette</span>
                    </div>
                    <figure><img src="/assets/images/in_no_memory_3.jpg" alt=""></figure>
                </div>
                <div class="right fade-in">
                    <figure><img src="/assets/images/in_no_memory_4.jpg" alt=""></figure>
                    <div class="sub-copy">
                        <p class="black">Chapter 1:</p>
                        <p class="sub-title">"In no Memory"</p>
                        <p>Was born by 2 stories about Rico Family, La Concordia and Coacha, buildings that shared as people as photographic files that were saved by the family, that’s why a parallel can be created about what is now and what was there, the differences and similarities between people and traditions of the past there.</p>
                    </div>
                </div>
                <figure class="fade-in full-bleed"><img src="/assets/images/in_no_memory_5.jpg" alt=""></figure>
            </article>
            <article id="chapter-2">
                <div class="sub-copy fade-in">
                    <p class="black">Chapter 2:</p>
                    <p class="sub-title">"Remembrance"</p>
                    <p>It’s a retrospective view about the family memories in the traditional Colombia that was grown in the farms, the way they celebrate, how they shared different moments and the places of this family, being really different from now so the purpose of this is bring into the mind of the viewer their own background, no matter if they grew up in the territory of the images or not, it’s more taking in account the way that the old families shared and the atmosphere of them.</p>
                    <p>This idea about farms and nature it started by the collective mentality of the common past of the Latin American people even having this background most of people had been forgot their past because they’re rushing in their life or they don’t have a certain idea of the past of their families and that traditions are already disappearing in the actuality</p>
                </div>
                <figure class="fade-in"><img src="/assets/images/remembrance.png" alt=""></figure>
                <p class="footer-text" class="fade-in">Someone who doesn’t know their history, <br>is tend to repeat it.</p>
            </article>
            <span class="topics">#FineArt #AstroPhotography #Research #CuratorialWork #Writting</span>
        </div>`);
        
        this.projectContainer.html(htmlContent);
        this.projectContainer.append(`<div class="project-nav"><a href="#project-detail?change-of-light">Previous</a>/<a href="#project-detail?caleidoscope">Next</a></div>`)
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
            <span class="topics">#Illustration #AnalogueIllustration #DigitalIllustration</span>
        </div>`);

        this.projectContainer.html(htmlContent);
        this.projectContainer.append(`<div class="project-nav"><a href="#project-detail?in-no-memory">Previous</a>/<a href="#project-detail?el-bohemio">Next</a></div>`)

    }
}