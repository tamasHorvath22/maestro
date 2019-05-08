<template>
    <div class="container">
        <div class="actor">
            <div class="actor-header">Színészek</div>
            <div v-for="(actor) of actorListToPick" :key='actor.name' class="actor-element">
                <span class="actor-name">
                    {{ actor.name }}
                </span>
                <span class="points">
                    {{ actor.points }}
                </span>
            </div>
        </div>
        <div class="random" id="random">
            <md-field class="actor-number-input">
                <label>Színészek száma:</label>
                <md-input v-model="incomingNumber" type="number" v-on:keyup="checkNumber" class="input"></md-input>
            </md-field>
            <div class="input-buttons">
                <md-button v-on:click="onStart" id="start-button" class="md-primary button" :disabled="!startActive">Start</md-button>
                <md-button v-on:click="onStop" class="md-primary button" :disabled="!stopActive">Stop</md-button>
            </div>
            
            <div class="selected-actors" id="selected-actors" :style="{ width: actorsWidth + 'px' }">
              <transition-group name="list" tag="div" class="actors-container">
                  <span v-for="item of actorsInPlay" v-bind:key="item.name" class="list-item">
                    {{ item.name }}
                  </span>
              </transition-group>
            </div>
            <md-button 
                v-if="pointsButtonVisible"
                class="md-primary button points-button"
                v-on:click="onPoints">
                Pontozás
            </md-button>
        </div>
        <div id="Test"></div>
    </div>
</template>

<script>
export default {
  name: 'Game',
  data() {
      return {
          show: false,
          name: '',
          incomingNumber: '',
          numberOfActors: 0,
          actorList: JSON.parse(localStorage.getItem('actorList')),
          actorListToPick: JSON.parse(localStorage.getItem('actorsToPick')),
          actorsInPlay: [],
          tempActorsToPick: [],
          tempActorsInPlay: [],
          randomActorIntervalId: 0,
          startActive: true,
          stopActive: true,
          actorsWidth: 0,
          randomWidth: 0,
          pointsButtonVisible: false,
          selectedActorFontSize: 40,
          addOne: false,

      }
  },
  methods: {
    add() {
        this.actorsInPlay.push(this.tempActorsInPlay.splice(0, 1)[0]);
        this.numberOfActors--;
        if (this.numberOfActors === 0) {
          clearInterval(this.randomActorIntervalId);
          this.pointsButtonVisible = true;
        }
    },
    countNameLength(name, size) {
        const test = document.getElementById("Test");
        test.style.fontSize = size + "pt";
        test.innerHTML = name;
        let result = 0;
        if (this.addOne) {
          this.addOne = !this.addOne;
          return test.clientWidth + 1;
        } else {
          this.addOne = !this.addOne;
          return test.clientWidth;
        }
    },
    checkNumber() {
        const num = parseInt(this.incomingNumber);
        if (num <= 0 || num > this.actorListToPick.length) {
            this.incomingNumber = '';
            this.startActive = false;
        } else {
            this.startActive = true;
        }
    },
    onStop() {
        this.stopActive = false;
        this.random();
        this.setRandomWidth();
        if (this.actorsWidth > this.randomWidth) {
            this.addInlineToSelectedActors();
        }
        console.log(this.actorsInPlay);
        this.randomActorIntervalId = setInterval(() => {
            this.add();
        }, 1000);
    },
    random() {
        this.actorsWidth = 0;
        this.numberOfActors = parseInt(this.incomingNumber);
        this.tempActorsToPick = JSON.parse(JSON.stringify(this.actorListToPick));
        for (let i = 0; i < this.numberOfActors; i++) {
            this.tempActorsInPlay.push(this.tempActorsToPick.splice(Math.round(Math.random() * (this.tempActorsToPick.length - 1)), 1)[0]);
            this.actorsWidth += this.countNameLength(this.tempActorsInPlay[this.tempActorsInPlay.length - 1].name, this.selectedActorFontSize);
        }
        localStorage.setItem('actorsInPlay', JSON.stringify(this.tempActorsInPlay));
    },
    setRandomWidth() {
        const paddingPlusMargin = 40 + 40;
        this.randomWidth = this.countRandomWidth();
        this.actorsWidth += this.tempActorsInPlay.length * paddingPlusMargin;
        localStorage.setItem('actorsWidth', this.actorsWidth);

    },
    countRandomWidth() {
        const randomDiv = document.getElementById("random");
        return randomDiv.clientWidth;
    },
    count16PtNameLengths() {
        for(let i = 0; i < this.actorList.length; i++) {
            let actor = this.actorList[i];
            actor.nameLength = this.countNameLength(actor.name, 16);
        }
        localStorage.setItem('actorList', JSON.stringify(this.actorList));
    },
    addInlineToSelectedActors() {
        const selectedActors = document.getElementById("selected-actors");
        selectedActors.style.display = "inline";
    },
    onStart() {
        this.startActive = false;
        this.count16PtNameLengths();
    },
    onPoints() {
        this.actorListToPick = this.tempActorsToPick;
        localStorage.setItem("actorsToPick", JSON.stringify(this.actorListToPick));
        this.$router.push('/points');
    }
  },
  props: {}
}
</script>


<style scoped>

#Test
{
    position: absolute;
    visibility: hidden;
    height: auto;
    width: auto;
    color: white;
    white-space: nowrap; /* Thanks to Herb Caudill comment */
}

.list-item {
    display: inline-block;
    margin: 15px 20px;
    font-size: 40pt;
    height: 80px;
    padding: 28px 20px 0px 20px;
    background-color: white;
    border-radius: 20px;
    color: black;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.slide-fade-enter-active {
  transition: all .4s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
 
input[type="number"] {
    -moz-appearance: textfield;
}

.container {
    text-align: left;
    display:flex;
}

.actors-container {
  /* text-align: center; */
}

.actor {
    width: 250px;
    font-size: 20pt;
    margin-top: 20px;
    margin-left: 20px;
}

.random {
    width: calc(100vw - 250px);
    padding-top: 100px;
}

.points {
    float: right;
}

.actor-header {
    text-align: center;
    margin-bottom: 20px;
}

.actor-element {
    margin-bottom: 15px;
}

.actor-number-input {
  width: 250px;
  height: 50px;
  border-bottom: 1px solid blue;
  margin: auto;
}

.input-buttons {
  width: 250px;
  margin: auto;
  padding-bottom: 80px;
}

.input {
  color: white;
  text-align: center;
}

.button {
  background-color: #3b3bda;
  color: white;
}

.selected-actors {
  margin: auto;
}

#start-button {
  margin-right: 58px;
}

.points-button {
  float: right;
  margin-right: 50px;
  margin-top: 80px;
}

/* .bounce-enter-active {
  animation: bounce-in 1.5s;
}
.bounce-leave-active {
  animation: bounce-in 1.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
} */

</style>
