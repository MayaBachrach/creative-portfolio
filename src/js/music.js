// An original lounge loop, synthesized locally after an explicit play gesture.
(() => {
  const settings = window.PORTFOLIO_CONFIG.music;
  const button = document.querySelector('#music-toggle');
  if (!settings.enabled) { button.hidden = true; return; }
  let context, master, bus, noise, timer, nextTime, step = 0, playing = false;
  const eighth = 30 / settings.bpm;
  const chords = [[60,64,67,71],[57,60,64,67],[62,65,69,72],[59,62,65,69],[60,64,67,69],[59,62,67,71],[57,62,65,69],[59,62,65,69]];
  const bass = [36,33,38,31,29,28,38,31];
  const melody = [76,0,79,0,74,0,71,0,72,0,76,0,0,74,0,71,69,0,72,0,77,0,76,0,74,0,71,0,0,69,0,67,69,0,72,0,76,0,74,0,71,0,74,0,0,79,0,76,77,0,76,0,72,0,69,0,71,0,74,0,0,72,71,0];
  const frequency = midi => 440 * 2 ** ((midi - 69) / 12);
  function setup() {
    context = new (window.AudioContext || window.webkitAudioContext)();
    master = context.createGain(); master.gain.value = 0;
    const compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -18; compressor.ratio.value = 3;
    master.connect(compressor).connect(context.destination);
    bus = context.createBiquadFilter(); bus.type = 'lowpass'; bus.frequency.value = 3800; bus.connect(master);
    noise = context.createBuffer(1, context.sampleRate * .15, context.sampleRate);
    const samples = noise.getChannelData(0);
    for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
  }
  function note(midi, time, duration, level, type = 'sine') {
    const oscillator = context.createOscillator(), gain = context.createGain();
    oscillator.type = type; oscillator.frequency.value = frequency(midi);
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(level, time + .012);
    gain.gain.exponentialRampToValueAtTime(.0001, time + duration);
    oscillator.connect(gain).connect(bus);
    oscillator.start(time); oscillator.stop(time + duration + .02);
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
  }
  function percussion(time, level, highpass) {
    const source = context.createBufferSource(), filter = context.createBiquadFilter(), gain = context.createGain();
    source.buffer = noise; filter.type = 'highpass'; filter.frequency.value = highpass;
    gain.gain.setValueAtTime(level, time); gain.gain.exponentialRampToValueAtTime(.0001, time + .09);
    source.connect(filter).connect(gain).connect(master); source.start(time); source.stop(time + .1);
    source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect(); };
  }
  function schedule() {
    while (playing && nextTime < context.currentTime + .25) {
      const bar = Math.floor(step / 8), beat = step % 8;
      const time = nextTime + (beat % 2 ? .025 : 0);
      if (beat === 0) {
        chords[bar].forEach((midi, index) => {
          note(midi, time + index * .018, eighth * 7, .055, 'triangle');
          note(midi + 12, time + index * .018, eighth * 3, .013);
        });
      }
      if (beat === 0 || beat === 4) {
        note(bass[bar], time, eighth * 2.7, .2);
        note(31, time, .1, .16);
      }
      if (beat === 2 || beat === 6) percussion(time, .035, 1300);
      percussion(time, beat % 2 ? .012 : .02, 7000);
      if (melody[step]) note(melody[step], time, eighth * 1.8, .07);
      step = (step + 1) % melody.length;
      nextTime += eighth;
    }
  }
  async function toggle() {
    try {
      if (!context) setup();
      if (playing) {
        playing = false; clearInterval(timer);
        master.gain.setTargetAtTime(0, context.currentTime, .04);
      } else {
        await context.resume(); playing = true;
        nextTime = context.currentTime + .06;
        master.gain.setTargetAtTime(settings.volume, context.currentTime, .08);
        schedule(); timer = setInterval(schedule, 40);
      }
      button.setAttribute('aria-pressed', String(playing));
      button.setAttribute('aria-label', playing ? 'השהיית מוזיקת הרקע' : 'הפעלת מוזיקת הרקע');
      button.querySelector('span').textContent = playing ? 'השהיה' : 'מוזיקה';
    } catch {
      button.querySelector('span').textContent = 'לא ניתן לנגן';
    }
  }
  button.addEventListener('click', toggle);
  document.addEventListener('visibilitychange', () => {
    if (!context) return;
    if (document.hidden) context.suspend();
    else if (playing) context.resume();
  });
  document.addEventListener('play', event => {
    if (event.target.tagName === 'VIDEO' && playing) toggle();
  }, true);
})();
