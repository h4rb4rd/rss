import { ToyType } from '../../shared/types';

class RenderToys {
  toHTML(cardItem: ToyType): string {
    const { num, name, count, year, shape, color, size, favorite } = cardItem;
    const imageSrc: string = require(`../../../assets/images/${num}.png`);

    // prettier-ignore
    const html = 
    `<div class="toys-cards__card toys-card show ${favorite?'active':''}" data-num="${num}">
      <h3 class="toys-card__title">${name}</h3>
      <img class="toys-card__image" src="${imageSrc}" alt="toy" />
      <div class="toys-card__description card-description">
        <p class="card-description__count">Количество: <span>${count}</span></p>
        <p class="card-description__year">Год покупки: <span>${year}</span></p>
        <p class="card-description__shape">Форма: <span>${shape}</span></p>
        <p class="card-description__color">Цвет: <span>${color}</span></p>
        <p class="card-description__size">Размер: <span>${size}</span></p>
        <p class="card-description__favorite" data-favorite="${num}">Любимая:<span>${favorite?'да':'нет'}</span></p>
      </div>
      <div class="toys-card__ribbon ribbon"></div>
    </div>`;

    return html;
  }

  animate(): void {
    const cards: NodeListOf<Element> = document.querySelectorAll('.toys-card');
    cards.forEach((card) => {
      card.classList.add('hide');
      setTimeout(() => {
        card.classList.remove('hide');
      }, 200);
    });
  }

  render(data: Array<ToyType>): void {
    const cardsContainer = document.querySelector<HTMLElement>('#cardsContainer');

    if (cardsContainer) {
      cardsContainer.innerHTML = data.map((item) => this.toHTML(item)).join('');
    }
  }
}
export default RenderToys;
