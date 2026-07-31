// Birthday Card

// ==========================
// 1. Basic Settings
// ==========================

// Today's date: July 31, 2026
let countDown = new Date('Jul 31, 2026 00:00:00').getTime();

// Change the birthday person's name here
const birthdayPersonName = "Aastha";

const content = document.getElementById('content');
const footer = document.getElementsByTagName('footer')[0];
const timer = document.getElementById('timer');
const nameElement = document.getElementById('name');

if (nameElement) {
  nameElement.innerText = birthdayPersonName;
}

const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24;


// ==========================
// 2. Music Control
// ==========================

function playMusic() {
  const music = document.getElementById('background-music');

  if (!music) {
    console.log("Music element not found. Check the audio id in HTML.");
    return;
  }

  music.volume = 0.6;

  music.play().catch(function () {
    console.log("Music will play after the user clicks or taps the page.");
  });
}

// Do not autoplay on page load because browsers block it.
// Music starts after first click/tap.
document.addEventListener('click', playMusic, { once: true });
document.addEventListener('touchstart', playMusic, { once: true });


// ==========================
// 3. Countdown Timer
// ==========================

let x = setInterval(function () {
  let now = new Date().getTime();
  let distance = countDown - now;

  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');

  if (distance > 0) {
    if (hoursElement) {
      hoursElement.innerText = Math.floor(distance / hour);
    }

    if (minutesElement) {
      minutesElement.innerText = Math.floor((distance % hour) / minute);
    }

    if (secondsElement) {
      secondsElement.innerText = Math.floor((distance % minute) / second);
    }
  }

  if (distance <= 0) {
    if (timer) {
      timer.classList.add('d-none');
    }

    confetti();
    clearInterval(x);
    _slideSatu();
  }

}, second);


// ==========================
// 4. Slide One
// ==========================

const _slideSatu = function () {
  const tap = document.getElementById('tap');
  const slideSatu = document.getElementById('slideSatu');

  slideSatu.classList.remove('d-none');

  // Show tap instruction quickly
  setTimeout(function () {
    tap.classList.remove('d-none');

    document.body.addEventListener('click', function () {
      _slideDua();
    }, { once: true });

  }, 1500);
};


const _slideDua = function () {
  const slideSatu = document.getElementById('slideSatu');
  const tap = document.getElementById('tap');
  const slideDua = document.getElementById('slideDua');

  // Hide first slide
  slideSatu.classList.replace('animate__slideInDown', 'animate__backOutDown');
  tap.classList.add('d-none');

  setTimeout(function () {
    slideSatu.classList.add('d-none');
  }, 800);

  // Show second slide
  slideDua.classList.remove('d-none');

  // Allow next click much faster
  setTimeout(function () {
    tap.classList.remove('d-none');

    document.body.addEventListener('click', function () {
      slideDua.classList.replace('animate__zoomInDown', 'animate__fadeOutLeft');
      slideDua.classList.remove('animate__delay-2s', 'animate__slow');
      tap.classList.add('d-none');

      setTimeout(function () {
        slideDua.remove();
        _slideTiga();
      }, 800);

    }, { once: true });

  }, 2500);
};


const _slideTiga = function () {
  const tap = document.getElementById('tap');
  const slideTiga = document.getElementById('slideTiga');

  slideTiga.classList.remove('d-none');

  // Allow next click much faster
  setTimeout(function () {
    tap.classList.remove('d-none');

    document.body.addEventListener('click', function () {
      slideTiga.classList.remove('animate__delay-2s', 'animate__slow');
      slideTiga.classList.replace('animate__fadeInRight', 'animate__fadeOut');
      tap.remove();

      setTimeout(function () {
        slideTiga.remove();
        _slideEmpat();
      }, 800);

    }, { once: true });

  }, 2500);
};


// ==========================
// 6. Slide Three
// ==========================

const _slideTiga = function () {
  const tap = document.getElementById('tap');
  const slideTiga = document.getElementById('slideTiga');

  if (!slideTiga) return;

  slideTiga.classList.remove('d-none');

  setTimeout(function () {
    if (tap) {
      tap.classList.remove('d-none');
    }

    document.body.addEventListener('click', function () {
      slideTiga.classList.remove('animate__delay-2s', 'animate__slow');
      slideTiga.classList.replace('animate__fadeInRight', 'animate__fadeOut');

      if (tap) {
        tap.remove();
      }

      setTimeout(function () {
        slideTiga.remove();
        _slideEmpat();
      }, 1000);

    }, { once: true });

  }, 43000);
};


// ==========================
// 7. Slide Four - Question Buttons
// ==========================

function getRandomPosition(element) {
  const maxTop = window.innerHeight - element.clientHeight - 40;
  const randomTop = Math.floor(Math.random() * Math.max(maxTop, 100));
  return randomTop;
}

const _slideEmpat = function () {
  const slideEmpat = document.getElementById('slideEmpat');

  if (!slideEmpat) return;

  const gakButton = document.getElementById('gak');
  const sukaButton = document.getElementById('suka');

  slideEmpat.classList.remove('d-none');

  if (gakButton) {
    gakButton.addEventListener('click', function () {
      const randomTop = getRandomPosition(slideEmpat);
      slideEmpat.style.top = randomTop + 'px';
    });
  }

  if (sukaButton) {
    sukaButton.addEventListener('click', function () {
      slideEmpat.classList.replace('animate__fadeInDown', 'animate__bounceOut');
      slideEmpat.classList.remove('animate__delay-2s');

      setTimeout(function () {
        slideEmpat.remove();

        setTimeout(function () {
          _slideLima();
        }, 500);

      }, 1000);
    });
  }
};


// ==========================
// 8. Slide Five - Heart
// ==========================

const _slideLima = function () {
  const slideLima = document.getElementById('slideLima');
  const trims = document.getElementById('trims');

  if (!slideLima) return;

  slideLima.classList.remove('d-none');

  setTimeout(function () {
    if (trims) {
      trims.classList.remove('d-none');
    }
  }, 1000);

  slideLima.addEventListener('animationend', function () {
    slideLima.classList.add('animate__delay-3s');
    slideLima.classList.replace('animate__bounceIn', 'animate__fadeOut');

    if (trims) {
      trims.classList.add('animate__animated', 'animate__fadeOut', 'animate__delay-3s');
    }

    setTimeout(function () {
      if (trims) {
        trims.remove();
      }

      setTimeout(function () {
        slideLima.remove();
        _slideEnam();
      }, 1000);

    }, 6000);
  }, { once: true });
};


// ==========================
// 9. Slide Six
// ==========================

const _slideEnam = function () {
  const slideEnam = document.getElementById('slideEnam');

  if (slideEnam) {
    slideEnam.classList.remove('d-none');
  }
};


// ==========================
// 10. Typing Animation
// ==========================

if (document.getElementById("teks1")) {
  new TypeIt("#teks1", {
    strings: [
      "On this special day, may you be gifted with life's biggest joys and never-ending bliss. Remember, you are capable of achieving anything you put your mind to. May every moment be filled with joy, laughter, and love on your special day. Happy Birthday!"
    ],
    startDelay: 4000,
    speed: 50,
    waitUntilVisible: true
  }).go();
}

if (document.getElementById("teks2")) {
  new TypeIt("#teks2", {
    strings: [
      "May your birthday be as amazing as you are. On your special day, remember you are loved, appreciated, and cherished. Happy Birthday again!"
    ],
    startDelay: 2000,
    speed: 50,
    waitUntilVisible: true
  }).go();
}

if (document.getElementById("trims")) {
  new TypeIt("#trims", {
    strings: ["Thank you."],
    startDelay: 2000,
    speed: 150,
    loop: false,
    waitUntilVisible: true
  }).go();
}


// ==========================
// 11. Confetti Animation
// ==========================

'use strict';

var onlyOnKonami = false;

function confetti() {
  var $window = $(window),
    random = Math.random,
    cos = Math.cos,
    sin = Math.sin,
    PI = Math.PI,
    PI2 = PI * 2,
    timer = undefined,
    frame = undefined,
    confetti = [];

  var runFor = 2000;
  var isRunning = true;

  setTimeout(function () {
    isRunning = false;
  }, runFor);

  var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
    pointer = 0;

  var particles = 150,
    spread = 20,
    sizeMin = 5,
    sizeMax = 12 - sizeMin,
    eccentricity = 10,
    deviation = 100,
    dxThetaMin = -0.1,
    dxThetaMax = -dxThetaMin - dxThetaMin,
    dyMin = 0.13,
    dyMax = 0.18,
    dThetaMin = 0.4,
    dThetaMax = 0.7 - dThetaMin;

  var colorThemes = [
    function () {
      return color(200 * random() | 0, 200 * random() | 0, 200 * random() | 0);
    },
    function () {
      var black = 200 * random() | 0;
      return color(200, black, black);
    },
    function () {
      var black = 200 * random() | 0;
      return color(black, 200, black);
    },
    function () {
      var black = 200 * random() | 0;
      return color(black, black, 200);
    },
    function () {
      return color(200, 100, 200 * random() | 0);
    },
    function () {
      return color(200 * random() | 0, 200, 200);
    },
    function () {
      var black = 256 * random() | 0;
      return color(black, black, black);
    },
    function () {
      return colorThemes[random() < 0.5 ? 1 : 2]();
    },
    function () {
      return colorThemes[random() < 0.5 ? 3 : 5]();
    },
    function () {
      return colorThemes[random() < 0.5 ? 2 : 4]();
    }
  ];

  function color(r, g, b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  function interpolation(a, b, t) {
    return (1 - cos(PI * t)) / 2 * (b - a) + a;
  }

  var radius = 1 / eccentricity,
    radius2 = radius + radius;

  function createPoisson() {
    var domain = [radius, 1 - radius],
      measure = 1 - radius2,
      spline = [0, 1];

    while (measure) {
      var dart = measure * random(),
        i,
        l,
        interval,
        a,
        b,
        c,
        d;

      for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
        a = domain[i];
        b = domain[i + 1];
        interval = b - a;

        if (dart < measure + interval) {
          spline.push(dart += a - measure);
          break;
        }

        measure += interval;
      }

      c = dart - radius;
      d = dart + radius;

      for (i = domain.length - 1; i > 0; i -= 2) {
        l = i - 1;
        a = domain[l];
        b = domain[i];

        if (a >= c && a < d) {
          if (b > d) {
            domain[l] = d;
          } else {
            domain.splice(l, 2);
          }
        } else if (a < c && b > c) {
          if (b <= d) {
            domain[i] = c;
          } else {
            domain.splice(i, 0, c, d);
          }
        }
      }

      for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
        measure += domain[i + 1] - domain[i];
      }
    }

    return spline.sort();
  }

  var container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '0';
  container.style.overflow = 'visible';
  container.style.zIndex = '9999';

  function Confetto(theme) {
    this.frame = 0;
    this.outer = document.createElement('div');
    this.inner = document.createElement('div');
    this.outer.appendChild(this.inner);

    var outerStyle = this.outer.style,
      innerStyle = this.inner.style;

    outerStyle.position = 'absolute';
    outerStyle.width = (sizeMin + sizeMax * random()) + 'px';
    outerStyle.height = (sizeMin + sizeMax * random()) + 'px';

    innerStyle.width = '100%';
    innerStyle.height = '100%';
    innerStyle.backgroundColor = theme();

    outerStyle.perspective = '50px';
    outerStyle.transform = 'rotate(' + (360 * random()) + 'deg)';

    this.axis = 'rotate3D(' +
      cos(360 * random()) + ',' +
      cos(360 * random()) + ',0,';

    this.theta = 360 * random();
    this.dTheta = dThetaMin + dThetaMax * random();

    innerStyle.transform = this.axis + this.theta + 'deg)';

    this.x = $window.width() * random();
    this.y = -deviation;
    this.dx = sin(dxThetaMin + dxThetaMax * random());
    this.dy = dyMin + dyMax * random();

    outerStyle.left = this.x + 'px';
    outerStyle.top = this.y + 'px';

    this.splineX = createPoisson();
    this.splineY = [];

    for (var i = 1, l = this.splineX.length - 1; i < l; ++i) {
      this.splineY[i] = deviation * random();
    }

    this.splineY[0] = this.splineY[l] = deviation * random();

    this.update = function (height, delta) {
      this.frame += delta;
      this.x += this.dx * delta;
      this.y += this.dy * delta;
      this.theta += this.dTheta * delta;

      var phi = this.frame % 7777 / 7777,
        i = 0,
        j = 1;

      while (phi >= this.splineX[j]) {
        i = j++;
      }

      var rho = interpolation(
        this.splineY[i],
        this.splineY[j],
        (phi - this.splineX[i]) / (this.splineX[j] - this.splineX[i])
      );

      phi *= PI2;

      outerStyle.left = this.x + rho * cos(phi) + 'px';
      outerStyle.top = this.y + rho * sin(phi) + 'px';
      innerStyle.transform = this.axis + this.theta + 'deg)';

      return this.y > height + deviation;
    };
  }

  function poof() {
    if (!frame) {
      document.body.appendChild(container);

      var theme = colorThemes[onlyOnKonami ? colorThemes.length * random() | 0 : 0],
        count = 0;

      (function addConfetto() {
        if (onlyOnKonami && ++count > particles) {
          return timer = undefined;
        }

        if (isRunning) {
          var confetto = new Confetto(theme);
          confetti.push(confetto);

          container.appendChild(confetto.outer);
          timer = setTimeout(addConfetto, spread * random());
        }
      })();

      var prev = undefined;

      requestAnimationFrame(function loop(timestamp) {
        var delta = prev ? timestamp - prev : 0;
        prev = timestamp;

        var height = $window.height();

        for (var i = confetti.length - 1; i >= 0; --i) {
          if (confetti[i].update(height, delta)) {
            container.removeChild(confetti[i].outer);
            confetti.splice(i, 1);
          }
        }

        if (timer || confetti.length) {
          frame = requestAnimationFrame(loop);
          return;
        }

        document.body.removeChild(container);
        frame = undefined;
      });
    }
  }

  $window.keydown(function (event) {
    pointer = konami[pointer] === event.which
      ? pointer + 1
      : +(event.which === konami[0]);

    if (pointer === konami.length) {
      pointer = 0;
      poof();
    }
  });

  if (!onlyOnKonami) {
    poof();
  }
}
