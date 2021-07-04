// let obj1 = {
//     key1 : {
//         key2: {
//             key3 :'data'
//         }
//     }
// }

// let obj2 = {key4: 1}

// let obj3 = {...obj1, ...obj2}

// obj1.key1.key2.key3 = 'updated'

// console.log(obj1)
// console.log(obj3)

// let data = [1, 2, 3]

// let [a,, c] = data
// // let [a, c] = data
// console.log(a, c)

let a = {
  x: {
    z: {
        z1:undefined,
    }
  },
  y: "beta",
}

let {x : {z : {z1:alias ="default"}}} = a

console.log(a)
console.log(alias)
