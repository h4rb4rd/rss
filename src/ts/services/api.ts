import { CarType, CreateCarType, EngineType, WinnerType } from '../shared/types';

class Api {
  baseUrl = 'http://127.0.0.1:3000';

  getCars = async (page = 1, limit = 7): Promise<{ cars: Array<CarType>; count: string } | null> => {
    const res = await fetch(`${this.baseUrl}/garage?_page=${page}&_limit=${limit}`);
    const data: CarType[] = (await res.json()) as Array<CarType>;

    if (res.status === 200) {
      return {
        cars: data,
        count: res.headers.get('X-Total-Count') || '0',
      };
    }

    if (!res.ok) {
      throw new Error(`Could not fetch ${this.baseUrl} , received ${res.status}`);
    }

    return null;
  };

  getWinners = async (
    page = 1,
    limit = 7,
    sort = 'time',
    order = 'ASC'
  ): Promise<{ result: Array<WinnerType>; totalCount: string } | null> => {
    const res = await fetch(`${this.baseUrl}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
    const data: Array<WinnerType> = (await res.json()) as Array<WinnerType>;

    if (res.status === 200) {
      return {
        result: data,
        totalCount: res.headers.get('X-Total-Count') || '0',
      };
    }

    if (!res.ok) {
      throw new Error(`Could not fetch ${this.baseUrl} , received ${res.status}`);
    }

    return null;
  };

  createCar = async (car: CreateCarType) => {
    await fetch(`${this.baseUrl}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  };

  deleteCar = async (carId: number): Promise<void> => {
    await fetch(`${this.baseUrl}/garage/${carId}`, {
      method: 'DELETE',
    });
  };

  updateCar = async (car: CreateCarType, carId: number): Promise<void> => {
    await fetch(`${this.baseUrl}/garage/${carId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  };

  getCar = async (carId: number): Promise<CarType | null> => {
    const res = await fetch(`${this.baseUrl}/garage/${carId}`);
    const data = (await res.json()) as CarType;

    if (res.status === 200) {
      return data;
    }

    return null;
  };

  startEngine = async (carId: number): Promise<EngineType> => {
    const res = await fetch(`${this.baseUrl}/engine?id=${carId}&status=started`, {
      method: 'PATCH',
    });

    return (await res.json()) as Promise<EngineType>;
  };

  stopEngine = async (id: number): Promise<EngineType> => {
    const res = await fetch(`${this.baseUrl}/engine?id=${id}&status=stopped`, {
      method: 'PATCH',
    });

    return (await res.json()) as Promise<EngineType>;
  };

  drivingStatus = async (carId: number): Promise<{ success: boolean }> => {
    const res = await fetch(`${this.baseUrl}/engine?id=${carId}&status=drive`, {
      method: 'PATCH',
    });

    if (res.status !== 200) {
      return { success: false };
    }

    return { ...(await res.json()) } as Promise<{ success: boolean }>;
  };

  createWinner = async (body: WinnerType) => {
    await fetch(`${this.baseUrl}/winners`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  deleteWinner = async (id: number): Promise<void> => {
    await fetch(`${this.baseUrl}/winners/${id}`, { method: 'DELETE' });
  };

  updateWinner = async (id: number, body: WinnerType) => {
    await fetch(`${this.baseUrl}/winners/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  getWinner = async (id: number): Promise<WinnerType> => {
    const res = await fetch(`${this.baseUrl}/winners/${id}`);

    return (await res.json()) as Promise<WinnerType>;
  };

  winnerStatus = async (id: number): Promise<number> => {
    return (await fetch(`${this.baseUrl}/winners/${id}`)).status;
  };

  saveWinner = async ({ id, time }: { id: number; time: number }) => {
    const winnerStatus = await this.winnerStatus(id);

    if (winnerStatus === 404) {
      await this.createWinner({
        id,
        wins: 1,
        time,
      });
    } else {
      const winner = await this.getWinner(id);
      await this.updateWinner(id, {
        id,
        wins: winner.wins + 1,
        time: time < winner.time ? time : winner.time,
      });
    }
  };
}

export default Api;
