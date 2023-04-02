~~~
<style>
  tv-program { width: 40%; }
</style>
<script type="module" src="./tv-program/tv-program.js"></script>

<tv-program></tv-program>
~~~

creates 2 video tags and a picture on top of each other. 1st video is
a tv "snow" effect; 2nd video is a "tv program"; the picture is a
device frame.

Hovering the "device" invokes snow, clicking--pauses the "tv program"
video.

To specify your own video:

    <tv-program src="file.mp4" width="80" x="10" y="15"></tv-program>

optional `width`, `x`, and `y` params are % relative to the device frame.

Several "device" frames are available:

* `crt tv with antenna` (default)
* `black crt tv`
* `white crt monitor`
* `imac g3`

To select:

    <tv-program device="imac g3" ...></tv-program>

Events:

* `program-canplay`: fires when the "tv program" video starts playing.

  ~~~
  let device = device.querySelector('tv-program')
  device.addEventListener('program-canplay', evt => {
      console.log(evt.target)
  })
  ~~~

## Loicense

MIT
