import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

const goalData = [
  { name: 'No Poverty', color: '#e5243b' },
  { name: 'Zero Hunger', color: '#dda63a' },
  { name: 'Good Health and Well-being', color: '#4c9f38' },
  { name: 'Quality Education', color: '#c5192d' },
  { name: 'Gender Equality', color: '#ff3a21' },
  { name: 'Clean Water and Sanitation', color: '#26bde2' },
  { name: 'Affordable and Clean Energy', color: '#fcc30b' },
  { name: 'Decent Work and Economic Growth', color: '#a21942' },
  { name: 'Industry, Innovation and Infrastructure', color: '#fd6925' },
  { name: 'Reduced Inequalities', color: '#dd1367' },
  { name: 'Sustainable Cities and Communities', color: '#fd9d24' },
  { name: 'Responsible Consumption and Production', color: '#bf8b2e' },
  { name: 'Climate Action', color: '#3f7e44' },
  { name: 'Life Below Water', color: '#0a97d9' },
  { name: 'Life on Land', color: '#56c02b' },
  { name: 'Peace, Justice and Strong Institutions', color: '#00689d' },
  { name: 'Partnerships for the Goals', color: '#19486a' },
]; // list of the goals with their names and color

export class UNSDG extends DDDSuper(LitElement) {
  static get tag() {
    return "un-sdg";
  }

  constructor() {
    super();
    this.title = "";
    this.goal = "1";  // Default goal to show all
    this._currentSrc = ""; // Holds URL for current image
    this.label = ""; //used for alt text override
    this.colorOnly = false;
    this.fetchPriority = "low"; //resource can be loaded later
    this.loading = "lazy"; // defer loading the resource until it is needed 
    this.height = '254px';
    this.width = '245px';
  }

  static get properties() {
    return {
      goal: { type: String },
      _currentSrc: { type: String },
      label: { type: String },
      colorOnly: { type: Boolean, attribute: 'color-only', reflect: true },
      fetchPriority: { type: String },
      loading: { type: String },
      height: { type: String, attribute: true },  // allows height to be set via an attribute
      width: { type: String, attribute: true },   // allows width to be set via an attribute
    };
  }    //defines and manages reactive properties

  static get styles() {
    return [super.styles,
    css`
        :host {
          display: inline-flex;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
          font-size: var(--UN-SDG-font-size, var(--ddd-font-size-s));
        }

        .color-only {
          height: var(--img-height, 254px);
          width: var(--img-width, 254px); }

        .wrapper {
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
        }
       img {
        height: var(--img-height, 254px);
        width: var(--img-width, 254px);
       }

       .colors-container {
    display: flex;
    flex-wrap: wrap; /* Allows wrapping to the next line if necessary */
    gap: 10px; /* Adds space between color boxes */
} /* adds design elements to the container holding of all the colors */

.color-box {
    height: 254px; /* Set a fixed height for the color boxes */
    width: 254px; /* Set a fixed width for the color boxes */
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold; 
} /* adds design elements to the individual color boxes */
      `];
  }

  updated(changedProperties) {
    if (changedProperties.has('goal')) {
      this.updateGoalImage(); // Trigger image update on goal change
    }
  }


  updateGoalImage() {
    if (this.goal === 'all') {
      this._currentSrc = new URL(
        `../lib/svgs/all.svg`, import.meta.url).href;
      this.label = 'All Sustainable Development Goals' // sets the source for the all goal and updates label
    }
    else if (this.goal === "circle") {
      this._currentSrc = new URL(
        `../lib/svgs/circle.png`, import.meta.url).href;
      this.label = 'Sustainable Deveopement Goals Circle' // sets the source for the circle image and updates label
    }
    else {
      const goalNumber = parseInt(this.goal); // changes the string to a number
      if (goalNumber >= 1 && goalNumber <= 17) { // checks to make sure it is in range
        this._currentSrc = new URL(
          `../lib/svgs/goal-${goalNumber}.svg`,
          import.meta.url
        ).href;
        this.label = `Goal ${goalNumber}: ${goalData[goalNumber - 1].name}`; //assigns label to the goal number and description (found earlier)
      }
    }
  } //updates image based on when the goal changes



  render() {
    if (this.colorOnly) {  //this is to show all of the colors only
      return html`
          <div class="colors-container">
              ${goalData.map((goal) => html`  
                  <div class="color-box" alt="Goal: ${goal.name}"  style="background-color: ${goal.color};">
                  </div>
              `)} 
          </div> 
      `; // the goalData.map function iterates over each goal in the goalData array. it then selects color through ${goal.color}
    } else {
      return html`
          <img src="${this._currentSrc}" 
               alt="${this.label}" 
               fetchpriority="${this.fetchPriority}" 
               style="height: ${this.height}; width: ${this.width};" />
      `;
    } //returns image with label and other attributes can be adjusted
  }



  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(UNSDG.tag, UNSDG);
