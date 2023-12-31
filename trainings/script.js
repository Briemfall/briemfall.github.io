"use strict";

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");
const resetbtn = document.querySelector(".resetBtn");

class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);
  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
  _setDiscription() {
    // prettier-ignore
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December",];
    this.discription = `${this.type[0].toUpperCase()}${this.type.slice(1)} ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = "running";
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDiscription();
  }
  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = "cycling";
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this.calcSpeed();
    this._setDiscription();
  }
  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([-4, -35], 5.2, 24, 170);
// const cycling1 = new Cycling([-4, -35], 26, 90, 520);

class App {
  _workouts = [];
  _map;
  _mapEvent;
  constructor() {
    this._getPosition();

    this._getLocalStorage();

    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toogleField);
    containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));
  }
  _getPosition() {
    if (navigator.geolocation)
      // check that browser supports it
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),

        function () {
          alert("You did not provide access to location");
        }
      );
  }
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];

    this._map = L.map("map").setView(coords, 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this._map);

    this._map.on("click", this._showForm.bind(this));

    this._workouts.forEach((work) => {
      this._renderWorkMarker(work);
    });
  }

  _showForm(mapE) {
    this._mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }
  _toogleField() {
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  }
  _newWorkout(e) {
    e.preventDefault();

    const validInputs = (...inputs) =>
      inputs.every((inp) => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every((inp) => inp > 0);

    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this._mapEvent.latlng;
    let workout;

    if (type === "running") {
      const cadence = +inputCadence.value;
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        return alert("The full number is required");
      }
      workout = new Running([lat, lng], distance, duration, cadence);
    }

    if (type === "cycling") {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      ) {
        return alert("The full number is required");
      }
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    this._workouts.push(workout);
    this._renderWorkMarker(workout);
    this._renderWorkout(workout);
    this._hideForm();

    this._setLocalStorage();
  }
  _renderWorkMarker(workout) {
    L.marker(workout.coords)
      .addTo(this._map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: "mark-popup",
        })
      )
      .setPopupContent(
        `${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.discription}`
      )
      .openPopup();

    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        "";
  }
  _hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        "";
    form.classList.add("hidden");
  }
  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
    <h2 class="workout__title">${workout.discription}</h2>
    <div class="workout__details">
      <span class="workout__icon">${
        workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"
      }</span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workout.duration}</span>
      <span class="workout__unit">min</span>
    </div>`;
    if (workout.type === "running") {
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">step</span>
          </div>
        </li>
        
      `;
    }
    if (workout.type === "cycling") {
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/hour</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevation}</span>
          <span class="workout__unit">m</span>
        </div>
      </li> 
      `;
    }
    form.insertAdjacentHTML("afterend", html);
  }
  _moveToPopup(e) {
    const workoutEL = e.target.closest(".workout");
    if (!workoutEL) return;
    const workout = this._workouts.find(
      (work) => work.id === workoutEL.dataset.id
    );
    this._map.setView(workout.coords, 13, {
      animate: true,
      pan: { duration: 1 },
    });
  }
  _setLocalStorage() {
    localStorage.setItem("workouts", JSON.stringify(this._workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("workouts"));

    if (!data) return;

    this._workouts = data;
    this._workouts.forEach((work) => {
      this._renderWorkout(work);
    });
  }
  reset() {
    localStorage.removeItem("workouts");
    location.reload();
    // app.reset() in console in browser
  }
}

const app = new App();

document.getElementById("reset").onclick = function (app) {
  localStorage.removeItem("workouts");
  location.reload();
};
