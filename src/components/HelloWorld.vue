<template>
<v-container fluid>

    <template>

        <v-form ref="form">
            <v-row no-gutters>
                <v-col cols="5">

                    <v-card class="pa-2" outlined tile>
                        <v-text-field v-for="(item,index) in items" v-bind:key="index" v-model="item.name" :counter="10" label="Enter Text" required></v-text-field>
                    </v-card>

                </v-col>

                <v-col cols="2">
                    <div class="pa-2">
                        <v-btn fab dark color="blue" :disabled="!valid" @click="validate">
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                    </div>
                </v-col>

                <v-col cols="5">
                    <v-combobox v-model="select" :items="colors" item-text="name" label="Select a favorite activity or create a new one"></v-combobox>

                    <v-combobox v-model="select" :items="items" name="name" item-text=name label="Select a favorite activity or create a new one"></v-combobox>
                </v-col>
            </v-row>
        </v-form>

        <div class="my-2">
            <v-btn v-bind="ColorPick">Normal</v-btn>
        </div>

        <v-row no-gutters>

            <div class="col-md-7" style="border:2px dotted gray; margin-top:50px; padding:10px 5px;">

                <draggable element="span" v-model="list2" group="people">
                    <transition-group name="no" class="list-group">
                        <span v-for="(element,index) in list2" :key="element.order">
                            <button @click="remove(index)" type="button" class="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <v-btn @click="updateSelected(element.type,index)" v-if="element.order=='1'" v-bind="ColorPick">{{element.name}}</v-btn>
                            <v-select @click="updateSelected(element.type,index)" v-else-if="element.order=='2'" :items="items" label="Standard"></v-select>
                            <v-text-field @click="updateSelected(element.type,index)" v-else-if="element.order=='3'" label="Regular"></v-text-field>
                            <p v-else>hata</p>
                        </span>
                    </transition-group>
                </draggable>

            </div>

            <div class="col-md-5" v-bind="Heightvalue">
                <v-tabs centered color="cyan">
                    <v-tabs-slider color="yellow"></v-tabs-slider>

                    <v-tab href="#tab-1">

                        <v-icon>fas fa-box-open</v-icon>
                    </v-tab>

                    <v-tab href="#tab-2">

                        <v-icon>fas fa-cogs</v-icon>
                    </v-tab>

                    <v-tab href="#tab-3">

                        <v-icon>fas fa-box-open</v-icon>
                    </v-tab>

                    <v-tab-item :value="'tab-1'">
                        <draggable element="span" v-model="list" :group="{ name: 'people', pull: 'clone', put: false }" :move="onMove">
                            <transition-group name="no" class="list-group" tag="ul2">
                                <li class="list-group-item" v-for="element in list" :key="element.order">
                                    <i :class="element.fixed? 'fa fas fa-box-open' : 'fas fa-box-open'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
                                    {{element.name}}
                                    <span class="badge">{{element.order}}</span>
                                </li>
                            </transition-group>
                        </draggable>
                    </v-tab-item>

                    <v-tab-item :value="'tab-2'">
                        <span v-if="selectedVariant.type=='button'">
                            <v-checkbox v-model="stdark" label="Dark"></v-checkbox>
                        </span>
                    </v-tab-item>

                </v-tabs>
            </div>
        </v-row>
        <br><br><br><br>

        <h1>{{selectedVariant}}</h1>
        <h1>{{propsettings}}</h1>

        <div class="list-group col-md-3">
            <pre>{{listString}}</pre>
        </div>
        <div class="list-group col-md-3">
            <pre>{{list2String}}</pre>
        </div>

        <br><br><br><br>

    </template>

</v-container>
</template>

<script>
import draggable from "vuedraggable";
const message = [
    "button",
    "select",
    "text-field"
];
export default {
    name: 'HelloWorld',
    components: {
        draggable
    },

    data: () => ({
        stdark: false,
        selectedVariant: {
            type: null
        },
        propsettings: [],
        valid: true,
        Heightvalue: {
            height: 1000,
        },
        list: message.map((name, index, type) => {
            return {
                name,
                order: index + 1,
                type: type[index],
                fixed: false
            };
        }),
        list2: [],
        editable: true,
        isDragging: false,
        delayedDragging: false,
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        dizi2: [],
        items: [{
            name: null
        }],
        select: null,
        colors: [
            'primary',
            'secondary',
            'warning',
            'error',
            'success'
        ]

    }),

    methods: {
        remove: function (index) {
            this.list2.splice(index, 1);
        },
        validate() {
            this.items.push({
                name: null
            });
        },
        updateSelected: function (variantType, index) {
            this.selectedVariant.type = variantType;
            let name3 = variantType + index;

            
            if ('name' in this.propsettings === false) {

                let name = {
                    name: name3,
                    dark: false
                };
                this.propsettings.push(name);
            }

        },
        onMove({
            relatedContext,
            draggedContext
        }) {
            const relatedElement = relatedContext.element;
            const draggedElement = draggedContext.element;
            return (
                (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
            );
        }
    },
    computed: {
        dragOptions() {
            return {
                animation: 0,
                group: "description",
                disabled: !this.editable,
                ghostClass: "ghost2"
            };
        },
        listString() {
            return JSON.stringify(this.list, null, 2);
        },
        list2String() {
            return JSON.stringify(this.list2, null, 2);
        },
        statedeneme() {
            return this.$store.getters.countreturn
        },
        stringProperties() {
            let Dizi = this.dizi
            Dizi = {
                color: 'error',
                height: "100",
                disabled: false
            };
            return Dizi
        },
        ColorPick() {
            let type = typeof this.select;
            let Dizi = this.dizi2
            if (type === 'string') {
                Dizi = {
                    color: this.select
                };
            } else {
                if (this.select != null) {

                    if (this.select.name != null) {
                        Dizi = {
                            color: this.select.name
                        };
                    }
                }
            }
            return Dizi
        },
        deneme() {
            let dizi = {
                "name": "2"
            };
            return dizi.name

        }
    },
    watch: {
        isDragging(newValue) {
            if (newValue) {
                this.delayedDragging = true;
                return;
            }
            this.$nextTick(() => {
                this.delayedDragging = false;
            });
        }
    }

}
</script>

<style>
.flip-list-move {
    transition: transform 0.5s;
}

.no-move {
    transition: transform 0s;
}

.ghost2 {
    opacity: 0.5;
    background: red;
}

.list-group {
    min-height: 20px;
}

.list-group-item {
    cursor: move;
}

.list-group-item i {
    cursor: pointer;
}

.close2 {
    float: right;
    font-size: 13px;
    margin: 0px;
    padding: 0px;
    margin-bottom: 15px;
    font-weight: bold;

}
</style>
