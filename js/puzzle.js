const canvasBg = document.querySelector('#canvasBg');
const isVolume = localStorage.getItem('isVolume') !== 'false';
const audio = new Audio();
audio.src = 'assets/sounds/win.mp3';
audio.volume = +localStorage.getItem('volume-level');

const uniqueRandoms = [];

const randomUniqueNum = () => {
  if (!uniqueRandoms.length) {
    for (let i = 1; i <= 10; i += 1) {
      uniqueRandoms.push(i);
    }
  }
  const index = Math.floor(Math.random() * uniqueRandoms.length);
  const num = uniqueRandoms[index];

  uniqueRandoms.splice(index, 1);

  return num;
};

const rndIdx = randomUniqueNum();
const imgSrc = `assets/puzzle/${rndIdx}.jpg`;

const setRandomImage = () => {
  img.src = imgSrc;
  canvasBg.style.backgroundImage = `url(${imgSrc})`;
};

const img = new Image();

const constants = (() => ({
  unit: 125,
  position: [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
  ],
  dimension: [125, 125, 0, 0, 125, 125],
  image: (() => {
    canvasBg.style.backgroundImage = `url(${imgSrc})`;
    img.src = `assets/puzzle/${rndIdx}.jpg`;
    return img;
  })(),
}))();

const functions = (() => ({
  createCanvas: () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = 125;
    canvas.height = 125;
    const mycanvas = document.querySelector('#mycanvas');
    mycanvas.appendChild(canvas);
  },
  creatImageDimension: function (sx, sy) {
    this.position = 0;
    this.status = 'filled';
    this.data = {};
    this.data.sx = sx;
    this.data.sy = sy;
  },
  createCanvasImage: (selector, sx, sy) => {
    const ctx = selector.getContext('2d');
    ctx.drawImage(constants.image, sx, sy, ...constants.dimension);
  },
  randomArr: (arr) => {
    const arrCopy = [...arr];
    const newArr = [...arr].map(() => arrCopy.splice(Math.floor(Math.random() * arrCopy.length), 1)).flat();
    newArr.forEach((element, index) => {
      element.position = index;
    });
    return newArr;
  },
  clearCanvas: (position) => {
    const context = data.AllCanvas[position].getContext('2d');
    context.clearRect(0, 0, 125, 125);
  },
  upDateMove: (move) => {
    document.querySelector('#moves').innerHTML = move;
  },
  upDateSoloved: () => {
    if (isVolume) {
      audio.play();
    }
    document.querySelector('#solved').innerHTML = 'Yes';
  },
  findPuzzelIndex: (ArrSource, prop, value) =>
    prop === 'status'
      ? ArrSource.findIndex((element) => element.status === value)
      : ArrSource.findIndex((element) => element.position === value),
}))();

const controlers = (() => ({
  draw: (obj) => {
    if (obj.status === 'filled') {
      const ctx = data.AllCanvas[obj.position].getContext('2d');
      ctx.drawImage(constants.image, obj.data.sx * constants.unit, obj.data.sy * constants.unit, ...constants.dimension);
    } else if (obj.status === 'empty') {
      functions.clearCanvas(obj.position);
    }
  },
  swap: (arrData, posEmpty, posClicked) => {
    if (arrData[posClicked].status === 'filled') {
      arrData[posEmpty].status = 'filled';
      arrData[posEmpty].data = arrData[posClicked].data;
      arrData[posClicked].status = 'empty';
      arrData[posClicked].data = {};

      data.move += 1;
      functions.upDateMove(data.move);
    }
  },
  soloved: () =>
    data.imageDimension.every((element) => {
      if (element.status === 'filled') {
        return element.position === element.data.sy * 4 + element.data.sx;
      }
      return true;
    }),
  validSwap: (positionClicked, positionEmpty) => {
    const add = positionClicked + positionEmpty;
    const sub = Math.abs(positionClicked - positionEmpty);
    return (sub === 1 && add !== 7 && add !== 15 && add !== 23) || sub === 4;
  },
}))();

const data = {
  imageDimension: [],
  AllCanvas: [],
  move: 0,
  check: true,
};

const setupPuzzel = () => {
  constants.position.flat().forEach(() => {
    functions.createCanvas();
  });
  data.AllCanvas = document.querySelectorAll('canvas');
  data.imageDimension = [...data.AllCanvas].map((element, index) => new functions.creatImageDimension(index % 4, Math.floor(index / 4)));

  data.imageDimension[data.imageDimension.length - 1].status = 'empty';
  data.imageDimension[data.imageDimension.length - 1].data = {};
  const randomImage = () => {
    functions.randomArr(data.imageDimension).forEach((element) => {
      if (element.status === 'filled') {
        functions.createCanvasImage(data.AllCanvas[element.position], element.data.sx * constants.unit, element.data.sy * constants.unit);
      }
    });
  };
  if (data.check) {
    constants.image.onload = () => {
      randomImage();
    };
  } else randomImage();
};
setupPuzzel();

document.querySelector('#mycanvas').addEventListener('click', (e) => {
  if (!controlers.soloved()) {
    const positionClicked = [...data.AllCanvas].findIndex((ele) => ele === e.target);

    const PositionEmptyIndex = functions.findPuzzelIndex(data.imageDimension, 'status', 'empty');
    const positionEmpty = data.imageDimension[PositionEmptyIndex].position;
    const positionIndex = functions.findPuzzelIndex(data.imageDimension, 'position', positionClicked);

    if (controlers.validSwap(positionClicked, positionEmpty)) {
      controlers.swap(data.imageDimension, PositionEmptyIndex, positionIndex);
      controlers.draw(data.imageDimension[PositionEmptyIndex]);
      controlers.draw(data.imageDimension[positionIndex]);
    }
    if (controlers.soloved()) functions.upDateSoloved();
  }
});

document.querySelector('#new-game').addEventListener('click', () => {
  constants.position.flat().forEach(() => {
    const element = document.getElementById('canvas');
    element.parentNode.removeChild(element);
  });

  data.imageDimension = [];
  data.move = 0;
  data.check = false;

  functions.upDateMove(data.move);
  setRandomImage();
  setupPuzzel();
});

const hint = document.querySelector('#hint');
let isShowed = false;

hint.addEventListener('click', () => {
  if (!isShowed) {
    canvasBg.style.display = 'block';
    hint.innerText = 'Hide hint';
    isShowed = true;
  } else {
    canvasBg.style.display = 'none';
    hint.innerText = 'Show hint';
    isShowed = false;
  }
});
