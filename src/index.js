import * as $ from "jquery"

import Post from "@models/Post";
import "@/styles/style.css"
import image from "@/assets/img"
import json from "@/assets/json"
import xmlData from '@/assets/data.xml'
import csvData from "@/assets/data.csv"
import "@/styles/scss.scss"
import "./bable"

const post = new Post("WebPack Post title", image)

$('pre').addClass('code').html(post.toString())

console.log("xml-data: ", xmlData)
console.log("csv-data: ", csvData)
console.log("json: ", json)