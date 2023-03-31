function url(s) { return new URL(s, import.meta.url).href }

customElements.define('tv-program', class extends HTMLElement {
    constructor() {
        super()

        let video = this.getAttribute('src') || url('Pooyan.1985.nes.mp4')
        let x = this.getAttribute('x') || '16' // %
        let y = this.getAttribute('y') || '45'
        let width = this.getAttribute('width') || '65'
        this.debug = this.getAttribute('debug')

        let sr = this.attachShadow({mode: 'open'})
        sr.innerHTML = `
<style>
:host {
  display: block;
  width: 100%;
  position: relative;
}

#snow {
  width: 65%;
  position: absolute;
  transform: translate(13%, 57%);
}

#program {
  width: ${width}%;
  position: absolute;
  transform: translate(${x}%, ${y}%);
  filter: sepia(50%);

  opacity: 0;
  transition: opacity 5s ease-in-out;
}

#frame {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>

<img id="snow" src="${url('snow.gif')}">
<video id="program" loop="true" muted="true">
  <source src="${video}">
</video>
<img id="frame" src="${url('tv.png')}">`

        this.transition = 5000
        this.tv_frame = sr.querySelector('#frame')
        this.tv_program = sr.querySelector('#program')
        this.boot = 0

        this.tv_frame.onmouseenter = this.snow.bind(this)
        this.tv_frame.onmouseleave = this.on.bind(this)
        this.tv_frame.onclick = this.toggle.bind(this)
        setTimeout(this.on.bind(this), 100)
    }

    on() {
        if (this.boot && this.tv_program.paused) return

        this.log("tv on")
        this.tv_program.style.opacity = 1
        this.program_timer = setTimeout( () => {
            this.tv_program.play()
            this.log("tv play")
        }, this.transition)
        this.boot = 1
    }

    snow() {
        if (this.tv_program.paused) return

        this.log("tv snow")
        clearTimeout(this.program_timer)
        this.tv_program.style.opacity = 0
    }

    toggle() {
        this.tv_program.style.opacity = 1
        this.tv_program.paused ? this.tv_program.play() : this.tv_program.pause()
    }

    log(msg) { if (this.debug) console.log(msg) }

})
