function url(s) { return new URL(s, import.meta.url).href }

customElements.define('tv-program', class extends HTMLElement {
    constructor() {
        super()

        let frame = this.getAttribute('frame') || 'frame1'
        let opt = {
            frame1: {
                frame_url: url('frame1.png'),
                snow: {
                    width: 65,
                    x: 13,
                    y: 57,
                },
                program: {
                    width: 63,
                    x: 14,
                    y: 45,
                }
            },
            frame2: {
                frame_url: url('frame2.png'),
                snow: {
                    width: 84,
                    x: 10,
                    y: 18,
                },
                program: {
                    width: 83,
                    x: 10,
                    y: 16,
                }
            }
        }

        let video = this.getAttribute('src') || url('Pooyan.1985.nes.mp4')
        opt = opt[frame]
        opt.program.width = this.getAttribute('width') || opt.program.width
        opt.program.x = this.getAttribute('x') || opt.program.x
        opt.program.y = this.getAttribute('y') || opt.program.y
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
  width: ${opt.snow.width}%;
  position: absolute;
  transform: translate(${opt.snow.x}%, ${opt.snow.y}%);
}

#program {
  width: ${opt.program.width}%;
  position: absolute;
  transform: translate(${opt.program.x}%, ${opt.program.y}%);

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

<video id="snow" loop="true" muted="true" autoplay="true">
  <source src="${url('snow.mp4')}">
</video>
<video id="program" loop="true" muted="true">
  <source src="${video}">
</video>
<img id="frame" src="${opt.frame_url}">`

        this.transition = 5000
        this.tv_snow = sr.querySelector('#snow')
        this.tv_program = sr.querySelector('#program')
        this.tv_frame = sr.querySelector('#frame')
        this.boot = 0

        this.tv_frame.onmouseenter = this.tune_out.bind(this)
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
            this.snow(false)
        }, this.transition)
        this.boot = 1
    }

    snow(on) {
        if (on) {
            clearTimeout(this.program_timer)
            this.tv_program.style.opacity = 0
            this.tv_snow.play()
        } else {
            this.tv_program.style.opacity = 1
            this.tv_snow.pause()
        }
    }

    tune_out() {
        if (this.tv_program.paused) return
        this.log("tv snow")
        this.snow(true)
    }

    toggle() {
        this.snow(false)
        this.tv_program.paused ? this.tv_program.play() : this.tv_program.pause()
    }

    log(msg) { if (this.debug) console.log(msg) }

})
