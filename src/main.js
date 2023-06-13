import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as three from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PCDLoader } from 'three/addons/loaders/PCDLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';



createApp(App).mount('#app')
 