import $ from 'jquery';

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
		this.ui.setAttribute('class', this.isMobile ? 'mobile' : 'desktop')

	}

    init() {
      this.projectContainer = $('#project-detail');
      this.renderBohemio();
    }

    initEvents(){

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
                        <div class="color" style="background-color: #b53149;"></div>
                        <div class="color" style="background-color: #d79300;"></div>
                        <div class="color" style="background-color: #00111b;"></div>
                    </div>
                    <span>Bohemio's Palette</span>
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
}