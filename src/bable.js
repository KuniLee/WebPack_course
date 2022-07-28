async function start(){
  return await Promise.resolve("async is working")
}

start().then(res=>console.log(res))

class Util{
  static id = Date.now()
}
//let tested = "lolo"

console.log("Util.id ",Util.id)

import('lodash').then(({ default: _ })=>{
    console.log("lodash", _.random(0,42, true))
})