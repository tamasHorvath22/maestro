<template>
    <div class="container">
        <div v-if="showGivePoints">
            <div class="actors-in-play" :style="{ width: actorsWidth + 'px' }">
                <span v-for="item of actorsInPlay" v-bind:key="item.name" class="list-item">
                    {{ item.name }}
                </span>
            </div>
            <div class="space"></div>
            <div class="point-buttons">
                <span v-for="number in 5" v-bind:key="number" class="button-container">
                    <md-button 
                        class="button"
                        :id="['number-' + number]"
                        v-on:click="onPoints(number)">
                        {{ number }}
                    </md-button>
                </span>
            </div>
        </div>
        <div v-if="!showGivePoints" class="points-animation">
            <div :style="{width : namesDivWidth + 'px'}" class="sumPoints">
                <div>
                    <div class="set-height"></div>
                    <div
                        v-for="actor of this.actorList"
                        v-bind:key="actor.name"
                        :style="{ marginLeft: 50 + actor.nameLength / 2 - pylonWidth + 'px',
                                  marginRight: 50 + actor.nameLength / 2 - pylonWidth - 1 + 'px',
                                  height: actor.pylonHeight + 'px'}"
                        class="pylon">
                    </div>
                </div>
                <div class="points-container">
                    <div
                        v-for="actor of this.actorList"
                        v-bind:key="actor.name"
                        :style="{ marginLeft: (50 + actor.nameLength) / 2 - (actor.points.toString().length === 1 ? numberLength / 2 : numberLength) + 'px',
                                  marginRight: (50 + actor.nameLength) / 2 - (actor.points.toString().length === 1 ? numberLength / 2 : numberLength) + 'px'}"
                        class="actor-points">{{ actor.points }}
                    </div>
                </div>
                <div>
                    <span 
                        v-for="actor of this.actorList"
                        v-bind:key="actor.name"
                        class="actor-animation">
                        {{ actor.name }}
                    </span>
                </div>
            </div>
            <md-button 
                class="md-primary next-scene-button"
                v-if="showNextSceneButton"
                v-on:click="onNextScene">
                Következő jelenet
            </md-button>
        </div>
    </div>
</template>

<script>
import { setInterval, setTimeout } from 'timers';
export default {
  name: 'Points',
  data() {
      return {
          actorList: JSON.parse(localStorage.getItem('actorList')),
          actorsInPlay: JSON.parse(localStorage.getItem('actorsInPlay')),
          actorsWidth: localStorage.getItem('actorsWidth'),
          showGivePoints: true,
          pylonWidth: 50,
          namesDivWidth: 0,
          numberLength: 12,
          trans: false,
          showNextSceneButton: false,
      }
  },
  mounted() {
    this.countNamesWidth();
  },
  methods: {
    onPoints(points) {
        for(let i = 0; i < this.actorsInPlay.length; i++) {
            this.actorsInPlay[i].points += points;
        }
        this.showGivePoints = false;
        this.trans = true;
        setTimeout(() => {
            this.addNewPoints();
        }, 1000)
        setTimeout(() => {
            this.showNextSceneButton = true;
        }, 3500)
    },
    countNamesWidth() {
        for(let i = 0; i < this.actorList.length; i++) {
            this.namesDivWidth += this.actorList[i].nameLength;
        }
        this.namesDivWidth += this.actorList.length * 50 + 1;
    },
    addNewPoints() {
        for(let i = 0; i < this.actorsInPlay.length; i++) {
            for(let j = 0; j < this.actorList.length; j++) {
                let actor = this.actorList[j];
                let actorInPlay = this.actorsInPlay[i];
                if (actor.name === actorInPlay.name && actor.points !== actorInPlay.points) {
                    actor.points = actorInPlay.points;
                    actor.pylonHeight = actorInPlay.points * 10;
                }
            }
        }
        this.actorsInPlay = [];
        localStorage.setItem('actorsInPlay', JSON.stringify(this.actorsInPlay));
        localStorage.setItem('actorList', JSON.stringify(this.actorList));
    },
    onNextScene() {
        this.$router.push('/game');
    }
    
  },
  props: {}
}
</script>


<style scoped>
.sumPoints {
    margin: auto;
}

.points-container {
    margin-top: 20px;
}

.actor-points {
    height: 30px;
    color: wheat;
    display: inline-block;
    font-size: 16pt;
}

.set-height {
    display: inline-block;
    height: 400px;
}

.points-animation {
    height: 300px;
}

.pylon {
    width: 50px;
    background-color: red;
    color: white;
    display: inline-block;
    -webkit-transition: height 3s;
    transition: height 3s;
    
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

.actor-animation {
    display: inline-block;
    margin: 15px 10px;
    font-size: 16pt;
    height: 36px;
    padding: 9px 15px 0px 15px;
    background-color: white;
    border-radius: 20px;
    color: black;
}

.space {
    width: 100vW;
    height: 150px;
}

.actors-in-play {
    margin: auto;
}

.point-buttons {
    width: 1280px;
    margin: auto;
}

.button-container {
    margin: 0px 20px;
    padding-top: 50px;
}

.button {
    color: white;
    width: 200px;
    height: 120px;
    border-radius: 60px;
    font-size: 36pt;
}

.next-scene-button {
    background-color: #3b3bda;
    color: white; 
}

#number-1 {
    background-color: red;
}

#number-2 {
    background-color: orange;
}

#number-3 {
    background-color: #CCCC00
}

#number-4 {
    background-color: yellowgreen;
}

#number-5 {
    background-color: green;
}

</style>
