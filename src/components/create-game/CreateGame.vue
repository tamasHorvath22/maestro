<template>
    <div class="container">
        <img alt="logo" src="../../static/img/trans.png" id="logo">
        <md-field class="input">
            <label>Add a nevet!</label>
            <md-input v-model="name" v-on:keyup.enter="addActor"></md-input>
        </md-field>
        <div v-for="(actor, index) of actorList" :key='actor.name'
             class="actor-container">
            <span class="actor-name">
                {{ actor.name }}
            </span>
            <span v-on:click="removeActor(index)" class="remove-actor" title="törlés">-</span>
        </div>
        <md-button 
            class="md-raised md-primary start-button"
            v-on:click="onStart()"
            v-if="actorList.length > 0">
            Start
        </md-button>    
    </div>
</template>

<script>
export default {
  name: 'CreateGame',
  data() {
      return {
          name: '',
          actorList: [
              {name: 'Aladár', points: 1, nameLength: 0, pylonHeight: 1},
              {name: 'Béla', points: 2, nameLength: 0, pylonHeight: 1},
              {name: 'Cecil', points: 3, nameLength: 0, pylonHeight: 1},
              {name: 'Dénes', points: 4, nameLength: 0, pylonHeight: 1},
              {name: 'Elemér', points: 8, nameLength: 0, pylonHeight: 1},
              {name: 'Ferenc', points: 12, nameLength: 0, pylonHeight: 1},
          ]
      }
  },
  methods: {
    addActor() {
        if (this.name.length > 0) {
            const object = {}
            object['name'] = this.name;
            object['points'] = 0;
            object['nameLength'] = 0;
            object['pylonHeight'] = 1;
            this.actorList.push(object);
            this.name = '';
        }
    },

    removeActor(index) {
        this.actorList.splice(index, 1);
    },

    onStart() {
        localStorage.setItem('actorList', JSON.stringify(this.actorList))
        this.$router.push('/game');
    }
  },
  props: {}
}
</script>


<style scoped>
.container {
    background-color: lightgrey;
    width: 300px;
    margin: auto;
}

.remove-actor {
    float: right;
    background-color: #e64a4a;
    width: 20px;
    height: 20px;
    cursor: pointer;
    border-radius: 50%;
    text-align: center;
    color: white;
}

.actor-name {
    font-size: 16pt;
}

.actor-container {
    width: 300px;
    margin: auto;
    margin-top: 5px;
}

.input {
    margin: auto;
    width: 300px;
    border-bottom: 1px blue solid;
}

.start-button {
    margin-top: 10px;
    float: right;
    background-color: #3b3bda;
    color: lightgray;
    margin-right: 0px;
}
</style>
