<template>
    <div class="container">
        <div class="sub-container">
            <div class="actor-store">
                <p class="label">Színész raktár</p>
                <md-field class="input">
                    <label>Add a nevet!</label>
                    <md-input v-model="actorToStore" v-on:keyup.enter="addActorToStore" class="input-field"></md-input>
                </md-field>
                <div v-for="(actor, index) of actorStore" :key="actor" class="actor-container">
                    <span class="actor-name">{{ actor }}</span>
                    <span v-on:click="removeActorFromStore(index)" class="remove-actor" title="törlés">
                        <font-awesome-icon icon="minus" class="remove-icon"/>
                    </span>
                    <span v-on:click="addActorToGame(index)" class="add-actor-to-game" title="játékhoz az">
                        <font-awesome-icon icon="user-plus" class="add-actor-icon"/>
                    </span>
                </div>
            </div>

            <div class="create-game">
                <p class="label">Új játék</p>
                <md-field class="input">
                    <label>Add a nevet!</label>
                    <md-input v-model="name" v-on:keyup.enter="addActor(name)" class="input-field"></md-input>
                </md-field>
                <div v-for="(actor, index) of actorList" :key="actor.name" class="actor-container">
                    <span class="actor-name">{{ actor.name }}</span>
                    <span v-on:click="removeActor(index)" class="remove-actor" title="törlés">
                        <font-awesome-icon icon="minus" class="remove-icon"/>
                    </span>
                </div>
                <md-button
                    class="md-raised md-primary start-button"
                    v-on:click="onStart()"
                    v-if="actorList.length > 0">
                    Start
                </md-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "CreateGame",
  data() {
    return {
      name: "",
      actorToStore: "",
      actorStore: [],
      actorList: [
        { name: "Aladár2", points: 1, nameLength: 0, pylonHeight: 10 },
        { name: "Béla", points: 2, nameLength: 0, pylonHeight: 20 },
        { name: "Cecil", points: 3, nameLength: 0, pylonHeight: 30 },
        { name: "Dénes", points: 4, nameLength: 0, pylonHeight: 40 },
        { name: "Elemér", points: 8, nameLength: 0, pylonHeight: 80 },
        { name: "Ferenc", points: 12, nameLength: 0, pylonHeight: 120 }
      ]
    };
  },
  mounted() {
    this.checkActorStore();
  },
  methods: {
    checkActorStore() {
        const storedActors = localStorage.getItem('actorStore');
        if (storedActors) {
            this.actorStore = JSON.parse(storedActors);
        }
    },

    addActor(name) {
        if (name.length > 0) {
            for (let i = 0; i < this.actorList.length; i++) {
                if (this.actorList[i].name === name) {
                    return;
                }
            }
            const object = {};
            object["name"] = name;
            object["points"] = 0;
            object["nameLength"] = 0;
            object["pylonHeight"] = 1;
            this.actorList.push(object);
            this.name = "";
        }
    },

    addActorToStore() {
        if (this.actorToStore.length > 0) {
            if (!this.actorStore.includes(this.actorToStore)) {
                this.actorStore.push(this.actorToStore);
                this.actorToStore = "";
                localStorage.setItem("actorStore", JSON.stringify(this.actorStore));
            }  
        }
    },

    removeActorFromStore(index) {
        this.actorStore.splice(index, 1);
        localStorage.setItem("actorStore", JSON.stringify(this.actorStore));
    },

    addActorToGame(index) {
        this.addActor(this.actorStore[index]);
    },

    removeActor(index) {
      this.actorList.splice(index, 1);
    },

    onStart() {
      localStorage.setItem("actorList", JSON.stringify(this.actorList));
      localStorage.setItem("actorsToPick", JSON.stringify(this.actorList));
      this.$router.push("/game");
    }
  },
  props: {}
};
</script>


<style scoped>

.remove-icon {
  font-size: 14pt;
  color: white;
  padding-top: 2px;
  padding-left: 1px;

}

.add-actor-icon {
  font-size: 13pt;
  color: white;
  padding-top: 2px;
  padding-left: 1px;
}

.sub-container {
    display: flex;
    margin-left: 20vw;
}

.create-game {
    width: 25vw;
}

.actor-store {
    margin-right: 10vw;
    width: 25vw;
}

.label {
    font-size: 20pt;
    margin-bottom: 3vh;
    text-align: center;
}

.remove-actor {
  float: right;
  background-color: #de4b4b;
  width: 22px;
  height: 22px;
  cursor: pointer;
  border-radius: 50%;
  text-align: center;
  color: white;
  cursor: pointer;
}

.add-actor-to-game {
  margin-right: 10px;
  float: right;
  background-color: #36c336;
  width: 22px;
  height: 22px;
  cursor: pointer;
  text-align: center;
  color: white;
  border-radius: 2px;
  cursor: pointer;
}

.actor-name {
  font-size: 16pt;
}

.actor-container {
  width: 25vw;
  margin: auto;
  margin-top: 5px;
}

.input {
  margin: auto;
  width: 25vw;
  border-bottom: 1px blue solid;
}

.input-field {
  color: white;
}

.start-button {
  margin-top: 10px;
  float: right;
  background-color: #3b3bda;
  color: lightgray;
  margin-right: 0px;
}
</style>
