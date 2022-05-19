class DrivingAnimation {
  getElemPosition = (elem: HTMLElement) => {
    const { top, left, width, height } = elem.getBoundingClientRect();

    return {
      x: left + width / 2,
      y: top + height / 2,
    };
  };

  getDistanceBtwElements = (firstElem: HTMLElement, secondElem: HTMLElement): number => {
    const firstElemPos = this.getElemPosition(firstElem);
    const secondElemPos = this.getElemPosition(secondElem);

    return Math.hypot(firstElemPos.x - secondElemPos.x, firstElemPos.y - secondElemPos.y);
  };

  animation = (car: HTMLElement, distanceBtwElem: number, animationTime: number): { id: number } => {
    const targetCar = car;
    let start: number | null = null;
    const state: {
      id: number;
    } = { id: 1 };

    const getStep = (timestamp: number) => {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const passed = Math.round(time * (distanceBtwElem / animationTime));
      targetCar.style.transform = `translateX(${Math.min(passed, distanceBtwElem)}px)`;

      if (passed < distanceBtwElem) {
        state.id = window.requestAnimationFrame(getStep);
      }
    };

    state.id = window.requestAnimationFrame(getStep);

    return state;
  };
}

export default DrivingAnimation;
