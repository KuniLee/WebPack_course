import Post from "./Post";
import "./styles/style.css"
import image from "./assets/img.png"
import json from "./assets/json"
const post = new Post("WebPack POst title", image)


console.log("post to strng: ",post.toString() )

console.log("json: ",json )